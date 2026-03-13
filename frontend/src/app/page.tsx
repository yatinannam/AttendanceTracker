import { redirect } from 'next/navigation'
import { createClient } from '@backend/infrastructure/supabase/server'

export default async function Index() {
  const supabase = await createClient()

  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    return redirect('/login')
  }

  const { data: profile } = await supabase
    .from('users')
    .select('role')
    .eq('id', user.id)
    .single()

  if (profile?.role === 'admin') {
    return redirect('/admin')
  }

  return redirect('/member')
}
