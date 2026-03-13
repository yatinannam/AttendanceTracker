import { createClient } from '@backend/infrastructure/supabase/server'
import { Calendar, CheckCircle2, XCircle, MapPin, Clock, BookOpen, ChevronRight } from 'lucide-react'
import Link from 'next/link'

export const metadata = {
    title: 'Attendance History | Member Portal',
}

export default async function HistoryPage() {
    const supabase = await createClient()

    const { data: { user } } = await supabase.auth.getUser()

    // Fetch History
    const { data: attendanceRecords } = await supabase
        .from('attendance')
        .select(`
            *,
            meetings (*)
        `)
        .eq('user_id', user?.id)
        .order('scanned_at', { ascending: false })

    // Build unified list
    const { data: profile } = await supabase.from('users').select('domain').eq('id', user?.id).single()
    const { data: allMeetings } = await supabase.from('meetings').select('*').order('start_time', { ascending: false })

    const displayHistory = allMeetings?.filter(m => m.type === 'Club' || m.domain === profile?.domain).map(meeting => {
        const record = attendanceRecords?.find(a => a.meeting_id === meeting.id)
        return {
            id: meeting.id,
            meeting: meeting,
            status: record?.status || 'Absent',
            scanned_at: record?.scanned_at || meeting.end_time
        }
    })

    return (
        <div className="max-w-5xl mx-auto space-y-12 pb-20 animate-in fade-in duration-700">
            <header className="space-y-4">
                <div className="flex items-center gap-2">
                    <div className="h-px w-8 bg-gold" />
                    <span className="text-[10px] font-black text-gold uppercase tracking-[0.3em]">Historical Archive</span>
                </div>
                <h1 className="text-5xl font-black tracking-tighter text-foreground">
                    Attendance <br />
                    <span className="text-gradient-gold">Timeline</span>
                </h1>
                <p className="text-muted-foreground font-medium max-w-lg">
                    A comprehensive log of your presence and contributions to club sessions.
                </p>
            </header>

            <div className="space-y-6">
                {displayHistory?.map((record) => (
                    <div key={record.id} className="premium-card group bg-white hover:border-gold/20 transition-all duration-500">
                        <div className="flex flex-col md:flex-row divide-y md:divide-y-0 md:divide-x divide-slate-50">
                            {/* Date Column */}
                            <div className="md:w-48 p-8 flex flex-col items-center justify-center bg-slate-50/50 group-hover:bg-white transition-colors">
                                <span className="text-[10px] font-black uppercase tracking-widest text-muted-foreground mb-1">
                                    {new Date(record.meeting.start_time).toLocaleString('default', { month: 'short' })}
                                </span>
                                <span className="text-4xl font-black text-foreground tabular-nums">
                                    {new Date(record.meeting.start_time).getDate()}
                                </span>
                                <span className="text-[10px] font-bold text-slate-400 mt-1 uppercase tracking-tighter">
                                    {new Date(record.meeting.start_time).getFullYear()}
                                </span>
                            </div>

                            {/* Content Column */}
                            <div className="flex-1 p-8 space-y-6">
                                <div className="flex flex-wrap items-center justify-between gap-4">
                                    <div className="flex items-center gap-3">
                                        <span className={`px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-widest ${record.status === 'Present'
                                                ? 'bg-green-50 text-green-700 border border-green-100'
                                                : 'bg-red-50 text-red-700 border border-red-100'
                                            }`}>
                                            {record.status}
                                        </span>
                                        <span className="px-3 py-1 bg-slate-900 text-white rounded-lg text-[10px] font-black uppercase tracking-widest">
                                            {record.meeting.type}
                                        </span>
                                    </div>
                                    <div className="flex items-center gap-1.5 text-slate-300 group-hover:text-gold transition-colors">
                                        <Clock className="size-4" />
                                        <span className="text-[10px] font-black uppercase tracking-widest">
                                            {new Date(record.meeting.start_time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                        </span>
                                    </div>
                                </div>

                                <div>
                                    <h3 className="text-2xl font-black text-foreground group-hover:text-gold transition-colors mb-2">
                                        {record.meeting.title}
                                    </h3>
                                    <div className="flex items-center gap-2 text-muted-foreground">
                                        <MapPin className="size-3.5" />
                                        <span className="text-xs font-bold uppercase tracking-tight">{record.meeting.venue || "Campus Hall"}</span>
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
                                    <div className="p-5 bg-slate-50 rounded-2xl border border-slate-100 space-y-3">
                                        <div className="flex items-center gap-2 text-[10px] font-black text-muted-foreground uppercase tracking-widest">
                                            <BookOpen className="size-3" /> Agenda
                                        </div>
                                        <p className="text-xs font-medium text-slate-600 line-clamp-2 leading-relaxed italic">
                                            {record.meeting.agenda || "No agenda details archived for this session."}
                                        </p>
                                    </div>
                                    <div className="p-5 border border-slate-100 rounded-2xl space-y-3 relative overflow-hidden group/mom">
                                        <div className="flex items-center gap-2 text-[10px] font-black text-muted-foreground uppercase tracking-widest">
                                            <CheckCircle2 className="size-3" /> Outcomes (MOM)
                                        </div>
                                        <p className="text-xs font-medium text-slate-600 line-clamp-2 leading-relaxed">
                                            {record.meeting.mom || "The session minutes are currently being processed."}
                                        </p>
                                        <div className="absolute top-4 right-4 text-slate-200 group-hover/mom:text-gold transition-colors">
                                            <ChevronRight className="size-4" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {(!displayHistory || displayHistory.length === 0) && (
                <div className="premium-card p-20 text-center bg-white">
                    <History className="size-16 text-slate-200 mx-auto mb-6" />
                    <h3 className="text-2xl font-black text-slate-400 italic">No past sessions found in archive</h3>
                    <p className="text-slate-300 font-bold uppercase text-[10px] tracking-widest mt-2">Attend sessions to start building your timeline</p>
                </div>
            )}
        </div>
    )
}

function History({ className }: { className?: string }) {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
            <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
            <path d="M3 3v5h5" />
            <path d="M12 7v5l4 2" />
        </svg>
    )
}
