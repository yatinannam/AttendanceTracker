import { createClient } from '@backend/infrastructure/supabase/server'
import { TrendingUp, Calendar, XCircle, Clock, MapPin, ChevronRight, LayoutDashboard, History } from 'lucide-react'
import Link from 'next/link'

export const metadata = {
    title: 'Member Activity | Activity Hub',
}

export default async function MemberDashboard() {
    const supabase = await createClient()

    const { data: { user } } = await supabase.auth.getUser()

    // Get user profile
    const { data: profile } = await supabase
        .from('users')
        .select('*')
        .eq('id', user?.id)
        .single()

    // Fetch eligibility and stats
    const { data: allMeetings } = await supabase.from('meetings').select('*').order('start_time', { ascending: false })
    const { data: attendance } = await supabase.from('attendance').select('*').eq('user_id', user?.id)

    const eligibleMeetings = allMeetings?.filter(m =>
        m.type === 'Club' || (m.type === 'Domain' && m.domain === profile?.domain)
    ) || []

    const attendedCount = attendance?.filter(a => a.status === 'Present').length || 0
    const absentCount = attendance?.filter(a => a.status === 'Absent').length || 0
    const attendanceRate = eligibleMeetings.length > 0 ? Math.round((attendedCount / eligibleMeetings.length) * 100) : 0

    // Get upcoming meetings (future start_time)
    const upcomingMeetings = eligibleMeetings
        .filter(m => new Date(m.start_time) > new Date())
        .sort((a, b) => new Date(a.start_time).getTime() - new Date(b.start_time).getTime())
        .slice(0, 3)

    return (
        <div className="max-w-7xl mx-auto space-y-12 pb-20 animate-in fade-in slide-in-from-bottom-6 duration-1000">
            {/* Header Hero */}
            <header className="flex flex-col md:flex-row md:items-center justify-between gap-8 pt-6">
                <div className="space-y-3">
                    <div className="flex items-center gap-2">
                        <div className="h-px w-8 bg-gold" />
                        <span className="text-[10px] font-black text-gold uppercase tracking-[0.3em]">Personal Command Center</span>
                    </div>
                    <h1 className="text-5xl md:text-6xl font-black tracking-tighter text-foreground leading-[0.9]">
                        Welcome back, <br />
                        <span className="text-gradient-gold">{profile?.full_name?.split(' ')[0]}</span>
                    </h1>
                </div>

                <div className="flex flex-col items-end gap-4">
                    <div className="flex items-center gap-6 bg-white/40 backdrop-blur-sm border border-white/60 px-6 py-4 rounded-[2rem] shadow-sm">
                        <div className="text-right">
                            <p className="text-[10px] font-black text-muted-foreground uppercase tracking-widest">Current Domain</p>
                            <p className="text-sm font-bold text-accent">{profile?.domain || "General Member"}</p>
                        </div>
                        <div className="size-12 rounded-2xl bg-slate-900 flex items-center justify-center text-white shadow-lg">
                            <LayoutDashboard className="size-6" />
                        </div>
                    </div>
                </div>
            </header>

            {/* Premium Stats Bento Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="premium-card group bg-white">
                    <div className="p-10 space-y-8">
                        <div className="flex items-center justify-between">
                            <div className="p-3 bg-slate-50 rounded-2xl group-hover:bg-gold/10 transition-colors">
                                <TrendingUp className="size-6 text-gold" />
                            </div>
                            <span className="text-[10px] font-black text-green-600 bg-green-50 px-3 py-1 rounded-full uppercase tracking-widest">Active Status</span>
                        </div>
                        <div>
                            <p className="text-sm font-bold text-muted-foreground mb-2">Attendance Rate</p>
                            <div className="flex items-baseline gap-2">
                                <h2 className="text-6xl font-black text-foreground tabular-nums">{attendanceRate}%</h2>
                            </div>
                        </div>
                        <div className="pt-4">
                            <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                                <div className="gold-gradient-bg h-full rounded-full transition-all duration-1000" style={{ width: `${attendanceRate}%` }} />
                            </div>
                        </div>
                    </div>
                </div>

                <div className="premium-card group bg-white">
                    <div className="p-10 space-y-8">
                        <div className="flex items-center justify-between">
                            <div className="p-3 bg-slate-50 rounded-2xl group-hover:bg-accent/10 transition-colors">
                                <Calendar className="size-6 text-accent" />
                            </div>
                            <span className="text-[10px] font-black text-muted-foreground uppercase tracking-widest">Activity log</span>
                        </div>
                        <div>
                            <p className="text-sm font-bold text-muted-foreground mb-2">Events Attended</p>
                            <h2 className="text-6xl font-black text-foreground tabular-nums">{attendedCount}</h2>
                        </div>
                        <div className="pt-4">
                            <p className="text-xs font-bold text-muted-foreground">Out of {eligibleMeetings.length} total eligible sessions</p>
                        </div>
                    </div>
                </div>

                <div className="premium-card group bg-white border-b-4 border-b-red-500/10">
                    <div className="p-10 space-y-8">
                        <div className="flex items-center justify-between">
                            <div className="p-3 bg-red-50 rounded-2xl group-hover:bg-red-500 group-hover:text-white transition-all">
                                <XCircle className="size-6" />
                            </div>
                            <span className="text-[10px] font-black text-red-500 uppercase tracking-widest">Warning Zone</span>
                        </div>
                        <div>
                            <p className="text-sm font-bold text-muted-foreground mb-2">Recorded Absences</p>
                            <h2 className="text-6xl font-black text-foreground tabular-nums">{absentCount}</h2>
                        </div>
                        <div className="pt-4 flex items-center gap-2">
                            <div className="flex gap-1">
                                {[1, 2, 3].map(i => (
                                    <div key={i} className={`size-3 rounded-full ${i <= absentCount ? 'bg-red-500' : 'bg-slate-200'}`} />
                                ))}
                            </div>
                            <span className="text-[10px] font-black text-muted-foreground uppercase tracking-tighter ml-2">Limit: 3 Sessions</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Upcoming Sessions Section */}
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-12 pt-8">
                <div className="lg:col-span-3 space-y-8">
                    <div className="flex items-center justify-between px-2">
                        <h3 className="text-3xl font-black text-foreground tracking-tighter">Your Next Sessions</h3>
                        <Link href="/member/history" className="flex items-center gap-2 text-xs font-black text-muted-foreground hover:text-gold transition-colors">
                            <History className="size-4" />
                            FULL TIMELINE
                        </Link>
                    </div>

                    <div className="space-y-6">
                        {upcomingMeetings.length > 0 ? upcomingMeetings.map((meeting) => (
                            <div key={meeting.id} className="premium-card group bg-white flex flex-col md:flex-row hover:-translate-y-1 transition-transform">
                                <div className="md:w-48 bg-slate-50 p-10 flex flex-col items-center justify-center border-r border-slate-100 group-hover:bg-slate-900 group-hover:text-white transition-colors duration-500">
                                    <p className="text-xs font-black uppercase tracking-widest text-gold/80 mb-2">
                                        {new Date(meeting.start_time).toLocaleString('default', { month: 'short' })}
                                    </p>
                                    <p className="text-5xl font-black leading-none italic">
                                        {new Date(meeting.start_time).getDate()}
                                    </p>
                                </div>
                                <div className="flex-1 p-10 flex flex-col justify-between space-y-6">
                                    <div className="space-y-4">
                                        <div className="flex items-center gap-3">
                                            <span className="px-3 py-1 bg-accent text-white rounded-lg text-[10px] font-black uppercase tracking-widest">
                                                {meeting.type}
                                            </span>
                                            {meeting.domain && (
                                                <span className="px-3 py-1 bg-gold/10 text-gold border border-gold/20 rounded-lg text-[10px] font-black uppercase tracking-widest">
                                                    {meeting.domain}
                                                </span>
                                            )}
                                        </div>
                                        <h4 className="text-3xl font-black text-foreground group-hover:text-gold transition-colors">
                                            {meeting.title}
                                        </h4>
                                        <div className="flex gap-8">
                                            <div className="flex items-center gap-2 text-muted-foreground">
                                                <Clock className="size-4" />
                                                <span className="text-xs font-bold uppercase">{new Date(meeting.start_time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                                            </div>
                                            <div className="flex items-center gap-2 text-muted-foreground">
                                                <MapPin className="size-4" />
                                                <span className="text-xs font-bold uppercase">{meeting.venue || "To be shared"}</span>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="pt-6 border-t border-slate-50 flex items-center justify-between">
                                        <div className="flex -space-x-3">
                                            {[1, 2, 3, 4].map(i => (
                                                <div key={i} className="size-10 rounded-full border-4 border-white bg-slate-200 ring-1 ring-slate-100" />
                                            ))}
                                        </div>
                                        <Link href="/member/scan" className="gold-gradient-bg px-8 py-3 rounded-2xl text-white text-xs font-black shadow-lg shadow-gold/20 hover:shadow-gold/40 transition-shadow">
                                            CHECK-IN NOW
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        )) : (
                            <div className="premium-card p-16 text-center bg-white/50 border-dashed border-2">
                                <Calendar className="size-16 text-slate-200 mx-auto mb-6" />
                                <h3 className="text-2xl font-black text-slate-400">No sessions scheduled</h3>
                                <p className="text-slate-300 font-bold uppercase text-[10px] tracking-widest mt-2">Check back later for club updates</p>
                            </div>
                        )}
                    </div>
                </div>

                {/* Quick Access Sidebar */}
                <div className="space-y-10">
                    <h3 className="text-2xl font-black text-foreground tracking-tighter px-2">Quick Access</h3>
                    <div className="grid gap-6">
                        <Link href="/member/scan" className="p-8 bg-slate-900 rounded-[2.5rem] text-white space-y-6 hover:bg-black transition-all group flex flex-col items-center text-center shadow-2xl shadow-slate-300">
                            <div className="size-16 bg-white/10 rounded-3xl flex items-center justify-center group-hover:bg-gold transition-colors">
                                <TrendingUp className="size-8" />
                            </div>
                            <div>
                                <h4 className="text-xl font-black mb-1">Live Scanning</h4>
                                <p className="text-slate-400 text-xs font-medium">Ready for next session</p>
                            </div>
                            <div className="w-full h-px bg-white/10" />
                            <ChevronRight className="size-6 text-gold" />
                        </Link>

                        <div className="premium-card bg-white p-8 space-y-8">
                            <div className="flex items-center gap-3">
                                <div className="size-2 rounded-full bg-gold" />
                                <h4 className="text-xs font-black uppercase tracking-widest text-muted-foreground">Recent MOM</h4>
                            </div>
                            <div className="p-6 bg-slate-50 rounded-2xl border border-slate-100">
                                <p className="text-xs font-bold text-foreground leading-relaxed">
                                    Last meeting minutes are now available for review.
                                </p>
                                <Link href="/member/history" className="text-[10px] font-black text-gold uppercase mt-4 block hover:underline">Read Now</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
