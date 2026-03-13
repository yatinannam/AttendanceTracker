'use server'

import { revalidatePath } from 'next/cache'
import { markAttendance } from '@backend/use-cases/attendance-service'
import { createClient } from '@backend/infrastructure/supabase/server'

export async function markAttendanceAction(meetingId: string) {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()
    
    if (!user) return { error: "Unauthorized" }

    const { success, error } = await markAttendance({
        meetingId,
        userId: user.id
    })

    if (error) {
        return { error }
    }

    revalidatePath('/member')
    revalidatePath('/member/history')

    return { success: true }
}
