'use server'

import { revalidatePath } from 'next/cache'
import { createMeeting, updateMeetingMom } from '@backend/use-cases/meeting-service'
import { createClient } from '@backend/infrastructure/supabase/server'

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

    const { data, error } = await createMeeting({
        title,
        type,
        startTime,
        endTime,
        venue,
        agenda,
        domain,
        userId: user.id
    })

    if (error) {
        console.error("Error creating meeting", error)
        return { error }
    }

    revalidatePath('/admin/meetings')
    return { success: true, meetingId: data.id }
}

export async function updateMeetingMomAction(meetingId: string, momText: string) {
    const { error } = await updateMeetingMom(meetingId, momText)

    if (error) {
        console.error("Error updating MOM", error)
        return { error }
    }

    revalidatePath(`/admin/meetings/${meetingId}`)
    return { success: true }
}
