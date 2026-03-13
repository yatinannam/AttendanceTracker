'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { loginUser, signupUser, logoutUser } from '@backend/use-cases/auth-service'

export async function login(formData: FormData) {
    const email = formData.get('email') as string
    const password = formData.get('password') as string

    const { error } = await loginUser(email, password)

    if (error) {
        console.error("Login Error:", error.message)
        return redirect(`/login?message=${encodeURIComponent(error.message)}`)
    }

    revalidatePath('/', 'layout')
    redirect('/')
}

export async function signup(formData: FormData) {
    const email = formData.get('email') as string
    const password = formData.get('password') as string
    const fullName = email // Using email as full name initially for minimal setup

    const { error } = await signupUser(email, password, fullName)

    if (error) {
        console.error("Signup Error:", error.message)
        return redirect(`/login?message=${encodeURIComponent(error.message)}`)
    }

    revalidatePath('/', 'layout')
    redirect('/login?message=Check email to continue sign in process')
}

export async function logout() {
    await logoutUser()
    redirect('/login')
}
