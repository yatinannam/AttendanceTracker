'use server'

import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'

export async function createMeetingAction(formData: FormData) {
    const supabase = await createClient()

    const { data: { user } } = await supabase.auth.getUser()
    if (!user) throw new Error("Unauthorized")

    const title = formData.get('title') as string
    const type = formData.get('type') as 'Club' | 'Domain' | 'Event'
    const startTime = formData.get('start_time') as string
    const endTime = formData.get('end_time') as string

    // New V2 Fields
    const venue = formData.get('venue') as string
    const agenda = formData.get('agenda') as string
    const domain = formData.get('domain') as string | null

    const { data, error } = await supabase.from('meetings').insert([
        {
            title,
            type,
            start_time: new Date(startTime).toISOString(),
            end_time: new Date(endTime).toISOString(),
            venue,
            agenda,
            domain: type === 'Domain' ? domain : null,
            created_by: user.id
        }
    ]).select().single()

    if (error) {
        console.error("Error creating meeting", error)
        return { error: error.message }
    }

    revalidatePath('/admin/meetings')
    return { success: true, meetingId: data.id }
}

export async function updateMeetingMomAction(meetingId: string, momText: string) {
    const supabase = await createClient()

    const { error } = await supabase.from('meetings').update({ mom: momText }).eq('id', meetingId)

    if (error) {
        console.error("Error updating MOM", error)
        return { error: error.message }
    }

    revalidatePath(`/admin/meetings/${meetingId}`)
    return { success: true }
}
