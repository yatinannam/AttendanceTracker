import { createClient } from '../infrastructure/supabase/server'

export async function loginUser(email: string, password: string) {
    const supabase = await createClient()
    const { error } = await supabase.auth.signInWithPassword({ email, password })
    return { error }
}

export async function signupUser(email: string, password: string, fullName: string) {
    const supabase = await createClient()
    const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
            data: {
                full_name: fullName,
            }
        }
    })
    return { error }
}

export async function logoutUser() {
    const supabase = await createClient()
    await supabase.auth.signOut()
}
