import { createClient } from '../infrastructure/supabase/server'

export async function markAttendance({ meetingId, userId }: { meetingId: string, userId: string }) {
    const supabase = await createClient()

    // 1. Fetch meeting to validate time bounds
    const { data: meeting, error: meetingError } = await supabase
        .from('meetings')
        .select('start_time, end_time, type, domain')
        .eq('id', meetingId)
        .single()

    if (meetingError || !meeting) {
        return { error: "Invalid meeting code." }
    }

    const now = new Date().getTime()
    const start = new Date(meeting.start_time).getTime()
    const end = new Date(meeting.end_time).getTime()

    // Strict Window Check
    if (now < start || now > end) {
        return { error: "Attendance closed for this meeting." }
    }

    // 2. Fetch User to validate Domain constraints (if applicable)
    if (meeting.type === 'Domain') {
        const { data: userData } = await supabase.from('users').select('domain').eq('id', userId).single()
        if (userData?.domain !== meeting.domain) {
            return { error: `This meeting is restricted to the ${meeting.domain} domain.` }
        }
    }

    // 3. Mark Present
    const { error: insertError } = await supabase.from('attendance').insert([
        {
            meeting_id: meetingId,
            user_id: userId,
            status: 'Present',
        }
    ])

    if (insertError) {
        // If uniqueness constraint fails, they already scanned
        if (insertError.code === '23505') {
            return { error: "You have already marked your attendance for this meeting!" }
        }
        return { error: "Failed to record attendance." }
    }

    return { success: true }
}
