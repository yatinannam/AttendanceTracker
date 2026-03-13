import { createClient } from '../infrastructure/supabase/server'

export async function createMeeting({ title, type, startTime, endTime, venue, agenda, domain, userId }: {
    title: string,
    type: 'Club' | 'Domain' | 'Event',
    startTime: string,
    endTime: string,
    venue: string,
    agenda: string,
    domain: string | null,
    userId: string
}) {
    const supabase = await createClient()

    const { data, error } = await supabase.from('meetings').insert([
        {
            title,
            type,
            start_time: new Date(startTime).toISOString(),
            end_time: new Date(endTime).toISOString(),
            venue,
            agenda,
            domain: type === 'Domain' ? domain : null,
            created_by: userId
        }
    ]).select().single()

    return { data, error: error?.message }
}

export async function updateMeetingMom(meetingId: string, momText: string) {
    const supabase = await createClient()
    const { error } = await supabase.from('meetings').update({ mom: momText }).eq('id', meetingId)
    return { error: error?.message }
}
