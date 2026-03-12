import { createClient } from '@/lib/supabase/server'
import { MeetingCreator } from '@/components/admin/MeetingCreator'
import { Calendar, QrCode, Activity, MapPin, Clock, ChevronRight, Settings } from 'lucide-react'
import Link from 'next/link'

export const metadata = {
    title: 'Meetings | Admin Suite',
}

export default async function MeetingsPage() {
    const supabase = await createClient()

    const { data: meetings } = await supabase
        .from('meetings')
        .select('*')
        .order('start_time', { ascending: false })

    return (
        <div className="max-w-7xl mx-auto space-y-12 pb-20 animate-in fade-in duration-700">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 pt-6">
                <div className="space-y-4">
                    <div className="flex items-center gap-2">
                        <div className="h-px w-8 bg-gold" />
                        <span className="text-[10px] font-black text-gold uppercase tracking-[0.3em]">Session Management</span>
                    </div>
                    <h1 className="text-5xl font-black tracking-tighter text-foreground">
                        Meetings <br />
                        <span className="text-gradient-gold">Control Panel</span>
                    </h1>
                </div>
                <div className="flex items-center gap-4">
                    <MeetingCreator />
                </div>
            </div>

            {/* Premium Grid View */}
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
                {meetings?.map((meeting) => (
                    <div key={meeting.id} className="premium-card group bg-white border-l-4 border-l-slate-900 hover:border-l-gold transition-all duration-500">
                        <div className="flex flex-col">
                            <div className="p-8 space-y-6">
                                <div className="flex items-start justify-between">
                                    <div className="space-y-3">
                                        <div className="flex items-center gap-2">
                                            <span className={`px-2.5 py-1 rounded-[0.5rem] text-[10px] font-black uppercase tracking-widest ${meeting.type === 'Club'
                                                    ? 'bg-slate-900 text-white'
                                                    : 'bg-gold/10 text-gold border border-gold/20'
                                                }`}>
                                                {meeting.type} Session
                                            </span>
                                            {meeting.domain && (
                                                <span className="px-2.5 py-1 bg-slate-50 text-[10px] font-black text-slate-400 uppercase tracking-widest border border-slate-100 italic">
                                                    {meeting.domain}
                                                </span>
                                            )}
                                        </div>
                                        <h3 className="text-3xl font-black text-foreground group-hover:text-gold transition-colors italic">
                                            {meeting.title}
                                        </h3>
                                    </div>
                                    <div className="flex flex-col items-end">
                                        <div className="text-right">
                                            <p className="text-[10px] font-black text-muted-foreground uppercase tracking-widest">Planned Date</p>
                                            <p className="text-sm font-bold text-foreground">{new Date(meeting.start_time).toLocaleDateString('en-GB')}</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-6 pt-2">
                                    <div className="flex items-center gap-3 text-muted-foreground bg-slate-50/50 p-3 rounded-xl border border-slate-100">
                                        <Clock className="size-4 text-gold" />
                                        <span className="text-xs font-bold uppercase">{new Date(meeting.start_time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                                    </div>
                                    <div className="flex items-center gap-3 text-muted-foreground bg-slate-50/50 p-3 rounded-xl border border-slate-100">
                                        <MapPin className="size-4 text-gold" />
                                        <span className="text-xs font-bold uppercase truncate">{meeting.venue || "Global Hall"}</span>
                                    </div>
                                </div>
                            </div>

                            <div className="px-8 py-5 bg-slate-50/80 border-t border-slate-100 flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <Link
                                        href={`/admin/monitor/${meeting.id}`}
                                        className="p-3 bg-white border border-slate-200 rounded-xl text-slate-400 hover:text-accent hover:border-accent hover:shadow-lg transition-all"
                                        title="Live Monitor"
                                    >
                                        <Activity className="size-5" />
                                    </Link>
                                    <Link
                                        href={`/admin/qr/${meeting.id}`}
                                        className="p-3 bg-white border border-slate-200 rounded-xl text-slate-400 hover:text-gold hover:border-gold hover:shadow-lg transition-all"
                                        title="QR Console"
                                    >
                                        <QrCode className="size-5" />
                                    </Link>
                                </div>
                                <Link
                                    href={`/admin/meetings/${meeting.id}`}
                                    className="px-6 py-3 bg-slate-900 text-white rounded-xl text-[10px] font-black uppercase tracking-[0.1em] hover:bg-black transition-all flex items-center gap-2"
                                >
                                    MANAGE INSIGHTS <ChevronRight className="size-3 text-gold" />
                                </Link>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {(!meetings || meetings.length === 0) && (
                <div className="premium-card p-20 text-center bg-white border-dashed">
                    <Calendar className="size-16 text-slate-100 mx-auto mb-6" />
                    <h3 className="text-2xl font-black text-slate-400">No sessions orchestrated yet</h3>
                </div>
            )}
        </div>
    )
}
