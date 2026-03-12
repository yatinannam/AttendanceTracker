import { createServerClient } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

export async function updateSession(request: NextRequest) {
    let supabaseResponse = NextResponse.next({
        request,
    })

    const supabase = createServerClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
        {
            cookies: {
                getAll() {
                    return request.cookies.getAll()
                },
                setAll(cookiesToSet) {
                    cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value))
                    supabaseResponse = NextResponse.next({
                        request,
                    })
                    cookiesToSet.forEach(({ name, value, options }) =>
                        supabaseResponse.cookies.set(name, value, options)
                    )
                },
            },
        }
    )

    const {
        data: { user },
    } = await supabase.auth.getUser()

    const isAuthPage = request.nextUrl.pathname.startsWith('/login')
    const isAdminPage = request.nextUrl.pathname.startsWith('/admin')

    // Not logged in and not on login page
    if (!user && !isAuthPage) {
        const url = request.nextUrl.clone()
        url.pathname = '/login'
        return NextResponse.redirect(url)
    }

    // Handle routing for authenticated users
    if (user) {
        // Fetch the user's actual role from the public.users table
        const { data: userData } = await supabase
            .from('users')
            .select('role')
            .eq('id', user.id)
            .single()

        const role = userData?.role || 'member'

        if (isAuthPage || request.nextUrl.pathname === '/') {
            const url = request.nextUrl.clone()
            url.pathname = role === 'admin' ? '/admin' : '/member'
            return NextResponse.redirect(url)
        }

        if (isAdminPage && role !== 'admin') {
            const url = request.nextUrl.clone()
            url.pathname = '/member'
            return NextResponse.redirect(url)
        }
    }

    return supabaseResponse
}
