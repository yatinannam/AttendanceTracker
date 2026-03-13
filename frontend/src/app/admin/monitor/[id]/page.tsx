import { LiveMonitorTable } from '@/components/admin/LiveMonitorTable'
import { createClient } from '@/lib/supabase/server'
import { Download, Users } from 'lucide-react'

export default async function MonitorPage({ params }: { params: Promise<{ id: string }> }) {
    const resolvedParams = await params;

    // Real implementation:
    // const supabase = await createClient()
    // const { data: meeting } = await supabase.from('meetings').select('*').eq('id', resolvedParams.id).single()
    // const { data: initialAttendance } = await supabase.from('attendance').select('*, users(full_name, email, domain)').eq('meeting_id', resolvedParams.id)

    const mockMeeting = { title: 'Tech Domain Weekly Sync', type: 'Domain' }

    return (
        <div className="space-y-8">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight text-foreground mb-2">Live Monitor</h1>
                    <p className="text-muted-foreground flex items-center gap-2">
                        <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold bg-accent/20 text-accent border border-accent/30">
                            {mockMeeting.type}
                        </span>
                        {mockMeeting.title}
                    </p>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="glass-panel p-6 flex items-start gap-4">
                    <div className="p-3 bg-muted rounded-lg text-accent">
                        <Users className="size-5" />
                    </div>
                    <div>
                        <p className="text-sm font-medium text-muted-foreground">Scanned In</p>
                        <h2 className="text-3xl font-bold text-foreground">24</h2>
                    </div>
                </div>
            </div>

            <LiveMonitorTable meetingId={resolvedParams.id} />
        </div>
    )
}
