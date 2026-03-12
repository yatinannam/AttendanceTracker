import { createClient } from '@/lib/supabase/server'
import { notFound } from 'next/navigation'
import { Calendar, Clock, MapPin, Users, FileText, CheckCircle, XCircle, ArrowLeft, Save } from 'lucide-react'
import Link from 'next/link'

export default async function MeetingDetailsPage({ params }: { params: Promise<{ id: string }> }) {
    const { id: meetingId } = await params
    const supabase = await createClient()

    // Fetch Meeting Details
    const { data: meeting, error: meetingError } = await supabase
        .from('meetings')
        .select('*')
        .eq('id', meetingId)
        .single()

    if (meetingError || !meeting) {
        return notFound()
    }

    // Fetch Analytics
    const { count: presentCount } = await supabase
        .from('attendance')
        .select('*', { count: 'exact', head: true })
        .eq('meeting_id', meetingId)
        .eq('status', 'Present')

    const { count: absentCount } = await supabase
        .from('attendance')
        .select('*', { count: 'exact', head: true })
        .eq('meeting_id', meetingId)
        .eq('status', 'Absent')

    const { count: totalEligibleCount } = await supabase
        .from('users')
        .select('*', { count: 'exact', head: true })
        .eq('role', 'member')
        .eq(meeting.type === 'Domain' ? 'domain' : 'role', meeting.type === 'Domain' ? meeting.domain : 'member')

    const attendanceRate = totalEligibleCount && totalEligibleCount > 0
        ? Math.round(((presentCount || 0) / (totalEligibleCount || 1)) * 100)
        : 0

    return (
        <div className="max-w-7xl mx-auto space-y-12 pb-20 animate-in fade-in duration-700">
            {/* Header / Breadcrumb */}
            <div className="space-y-6 pt-6">
                <Link
                    href="/admin/meetings"
                    className="flex items-center gap-2 text-xs font-black text-muted-foreground hover:text-gold transition-colors tracking-widest"
                >
                    <ArrowLeft className="size-3" /> BACK TO CONSOLE
                </Link>

                <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
                    <div className="space-y-4">
                        <div className="flex items-center gap-3">
                            <span className="px-3 py-1 bg-slate-900 text-white rounded-lg text-[10px] font-black uppercase tracking-widest">
                                {meeting.type}
                            </span>
                            {meeting.domain && (
                                <span className="px-3 py-1 bg-gold/10 text-gold border border-gold/20 rounded-lg text-[10px] font-black uppercase tracking-widest">
                                    {meeting.domain}
                                </span>
                            )}
                        </div>
                        <h1 className="text-5xl font-black tracking-tighter text-foreground leading-tight">
                            {meeting.title.split(' ').slice(0, -1).join(' ')} <br />
                            <span className="text-gradient-gold">{meeting.title.split(' ').slice(-1)}</span>
                        </h1>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Logistics Column */}
                <div className="space-y-8">
                    <div className="premium-card bg-white p-10 space-y-8">
                        <div className="flex items-center justify-between">
                            <h3 className="text-xl font-black text-foreground tracking-tight">Logistics</h3>
                            <div className="p-3 bg-slate-50 rounded-2xl">
                                <MapPin className="size-5 text-gold" />
                            </div>
                        </div>

                        <div className="space-y-6">
                            <div className="flex items-start gap-4 p-4 bg-slate-50/50 rounded-2xl border border-slate-100">
                                <Clock className="size-4 text-slate-400 mt-1" />
                                <div>
                                    <p className="text-[10px] font-black text-muted-foreground uppercase tracking-widest mb-1">Timing Window</p>
                                    <p className="text-sm font-bold text-foreground">
                                        {new Date(meeting.start_time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} — {new Date(meeting.end_time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-start gap-4 p-4 bg-slate-50/50 rounded-2xl border border-slate-100">
                                <MapPin className="size-4 text-slate-400 mt-1" />
                                <div>
                                    <p className="text-[10px] font-black text-muted-foreground uppercase tracking-widest mb-1">Designated Venue</p>
                                    <p className="text-sm font-bold text-foreground">{meeting.venue || "Global Distribution Hall"}</p>
                                </div>
                            </div>
                        </div>

                        <div className="pt-8 border-t border-slate-50">
                            <h4 className="text-xs font-black text-muted-foreground uppercase tracking-[0.2em] mb-4 flex items-center gap-2">
                                <FileText className="size-3" /> Session Agenda
                            </h4>
                            <p className="text-sm font-medium text-slate-600 leading-relaxed italic border-l-2 border-gold/30 pl-4 py-1">
                                {meeting.agenda || "No agenda details archived for this session."}
                            </p>
                        </div>
                    </div>
                </div>

                {/* Main Analytics Column */}
                <div className="lg:col-span-2 space-y-8">
                    <div className="premium-card bg-white p-10 space-y-10">
                        <div className="flex items-center justify-between">
                            <h3 className="text-2xl font-black text-foreground tracking-tight">Performance Analytics</h3>
                            <div className="flex items-center gap-2 px-4 py-2 bg-green-50 text-green-700 rounded-xl text-[10px] font-black uppercase tracking-widest border border-green-100">
                                <div className="size-1.5 rounded-full bg-green-500 animate-pulse" />
                                Finalized Data
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div className="p-8 bg-slate-900 rounded-[2rem] text-white flex flex-col justify-between group overflow-hidden relative">
                                <div className="absolute -bottom-4 -right-4 opacity-10 group-hover:scale-125 transition-transform duration-700">
                                    <Users className="size-24" strokeWidth={1} />
                                </div>
                                <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-6">Eligible</p>
                                <h2 className="text-5xl font-black tabular-nums">{totalEligibleCount || 0}</h2>
                            </div>

                            <div className="p-8 bg-white border border-slate-100 rounded-[2rem] flex flex-col justify-between group hover:border-gold/30 transition-all">
                                <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground mb-6">Confirmed</p>
                                <div className="space-y-1">
                                    <h2 className="text-5xl font-black text-foreground tabular-nums">{presentCount || 0}</h2>
                                    <p className="text-[10px] font-black text-green-600 uppercase tracking-tighter">Present Scans</p>
                                </div>
                            </div>

                            <div className="p-8 bg-red-50/30 border border-red-100 rounded-[2rem] flex flex-col justify-between group hover:bg-red-50 transition-all">
                                <p className="text-[10px] font-black uppercase tracking-widest text-red-400 mb-6">Attrition</p>
                                <div className="space-y-1">
                                    <h2 className="text-5xl font-black text-red-600 tabular-nums">{absentCount || 0}</h2>
                                    <p className="text-[10px] font-black text-red-400 uppercase tracking-tighter">Absent Logic</p>
                                </div>
                            </div>
                        </div>

                        <div className="space-y-4 pt-4">
                            <div className="flex items-center justify-between text-[10px] font-black uppercase tracking-widest text-muted-foreground px-1">
                                <span>Session Engagement</span>
                                <span>{attendanceRate}% SUCCESS RATE</span>
                            </div>
                            <div className="w-full h-4 bg-slate-100 rounded-full overflow-hidden p-1">
                                <div
                                    className="gold-gradient-bg h-full rounded-full transition-all duration-1000 shadow-sm"
                                    style={{ width: `${attendanceRate}%` }}
                                />
                            </div>
                        </div>
                    </div>

                    {/* MOM Editor Card */}
                    <div className="premium-card bg-white p-10 space-y-8">
                        <div className="flex items-center justify-between">
                            <div className="space-y-1">
                                <h3 className="text-2xl font-black text-foreground tracking-tight italic">Minutes of Meeting</h3>
                                <p className="text-[10px] font-black text-muted-foreground uppercase tracking-widest">Formal session archival & distribution</p>
                            </div>
                            <div className="p-4 bg-gold/10 rounded-2xl">
                                <FileText className="size-6 text-gold" />
                            </div>
                        </div>

                        <form action={`/api/admin/meetings/${meetingId}/mom`} method="POST" className="space-y-6">
                            <div className="relative group">
                                <textarea
                                    name="mom"
                                    defaultValue={meeting.mom || ""}
                                    placeholder="Synthesize the key outcomes, decisions, and action items..."
                                    className="w-full h-64 bg-slate-50 border border-slate-100 rounded-[2rem] p-8 text-foreground text-sm font-medium leading-relaxed focus:bg-white focus:outline-none focus:ring-4 focus:ring-gold/5 focus:border-gold/30 transition-all resize-none shadow-inner"
                                />
                                <div className="absolute bottom-6 right-8 text-[10px] font-black text-slate-300 uppercase tracking-widest group-focus-within:text-gold transition-colors">
                                    Auto-save Disabled
                                </div>
                            </div>

                            <div className="flex justify-end">
                                <button
                                    type="submit"
                                    className="px-8 py-4 gold-gradient-bg text-white rounded-2xl font-black text-xs shadow-xl shadow-gold/20 hover:scale-[1.03] active:scale-95 transition-all flex items-center gap-3 uppercase tracking-widest"
                                >
                                    <Save className="size-4" />
                                    Publish Minutes
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}
