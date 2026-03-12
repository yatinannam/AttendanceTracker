import { createClient } from '@/lib/supabase/server'
import { Activity, Users, CalendarSync, BarChart3, ArrowUpRight, Plus, ExternalLink } from 'lucide-react'
import Link from 'next/link'

export const metadata = {
    title: 'Admin Dashboard | Command Center',
}

export default async function AdminDashboard() {
    const supabase = await createClient()

    // Real fetches for the summary
    const { count: memberCount } = await supabase.from('users').select('*', { count: 'exact', head: true }).eq('role', 'member')
    const { data: meetings } = await supabase.from('meetings').select('id, start_time')
    const { count: recordCount } = await supabase.from('attendance').select('*', { count: 'exact', head: true })

    const upcomingCount = meetings?.filter(m => new Date(m.start_time) > new Date()).length || 0

    const stats = [
        { title: 'Registered Members', value: memberCount?.toString() || '0', icon: Users, trend: 'Total count', color: 'accent' },
        { title: 'Upcoming Sessions', value: upcomingCount.toString(), icon: CalendarSync, trend: 'Next 7 days', color: 'gold' },
        { title: 'Scan Volume', value: recordCount?.toString() || '0', icon: Activity, trend: 'All time records', color: 'accent' },
        { title: 'Active Reach', value: 'High', icon: BarChart3, trend: 'Club engagement', color: 'gold' },
    ]

    return (
        <div className="max-w-7xl mx-auto space-y-12 pb-20 animate-in fade-in slide-in-from-top-6 duration-1000">
            {/* Admin Header */}
            <header className="flex flex-col md:flex-row md:items-center justify-between gap-8 pt-6">
                <div className="space-y-3">
                    <div className="flex items-center gap-2">
                        <div className="h-px w-8 bg-slate-400" />
                        <span className="text-[10px] font-black text-muted-foreground uppercase tracking-[0.3em]">Command Center v2.0</span>
                    </div>
                    <h1 className="text-5xl font-black tracking-tighter text-foreground leading-tight">
                        Administrative <br />
                        <span className="text-gradient-gold">Insight Engine</span>
                    </h1>
                </div>

                <Link
                    href="/admin/meetings"
                    className="group px-8 py-5 bg-slate-900 text-white rounded-[2rem] font-black shadow-2xl shadow-slate-300 hover:bg-black transition-all flex items-center gap-4"
                >
                    <Plus className="size-5 text-gold group-hover:rotate-90 transition-transform duration-500" />
                    CREATE NEW MEETING
                </Link>
            </header>

            {/* Admin Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.map((stat, i) => (
                    <div key={i} className="premium-card bg-white p-8 group relative">
                        <div className={`p-3 rounded-2xl w-fit mb-6 transition-colors ${stat.color === 'gold' ? 'bg-gold/10 text-gold group-hover:bg-gold group-hover:text-white' : 'bg-slate-100 text-accent group-hover:bg-accent group-hover:text-white'
                            }`}>
                            <stat.icon className="size-6 transition-transform group-hover:scale-110" />
                        </div>
                        <div className="space-y-1">
                            <p className="text-[10px] font-black text-muted-foreground uppercase tracking-widest">{stat.title}</p>
                            <h2 className="text-4xl font-black text-foreground tabular-nums">{stat.value}</h2>
                        </div>
                        <div className="mt-4 pt-4 border-t border-slate-50 flex items-center justify-between">
                            <span className="text-[10px] font-bold text-muted-foreground uppercase">{stat.trend}</span>
                            <ArrowUpRight className="size-3 text-slate-300 group-hover:text-gold transition-colors" />
                        </div>
                    </div>
                ))}
            </div>

            {/* Dashboard Insights */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-8">
                    <div className="premium-card min-h-[450px] bg-white p-10 flex flex-col justify-between">
                        <div className="flex items-center justify-between">
                            <h3 className="text-2xl font-black text-foreground tracking-tight">Analytical Trends</h3>
                            <div className="flex gap-2">
                                <div className="px-4 py-2 bg-slate-50 rounded-xl text-[10px] font-black text-slate-400">Monthly View</div>
                            </div>
                        </div>

                        <div className="flex-1 flex flex-col items-center justify-center space-y-4 border-2 border-dashed border-slate-50 rounded-3xl mt-10 mb-6 bg-slate-50/20 group hover:border-gold/30 hover:bg-gold/5 transition-all transition-duration-500">
                            <div className="p-4 bg-white rounded-full shadow-sm group-hover:scale-110 transition-transform">
                                <BarChart3 className="size-8 text-slate-300 group-hover:text-gold" />
                            </div>
                            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Aggregate Data visualization Processing...</p>
                        </div>
                    </div>
                </div>

                <div className="space-y-8">
                    <div className="premium-card bg-slate-50 border-none p-10 space-y-8 h-full">
                        <h3 className="text-xl font-black text-foreground tracking-tight">Recent Scans</h3>
                        <div className="space-y-6">
                            {[1, 2, 3, 4].map((i) => (
                                <div key={i} className="flex items-center justify-between group">
                                    <div className="flex items-center gap-4">
                                        <div className="size-10 rounded-xl bg-white flex items-center justify-center text-xs font-black shadow-sm group-hover:bg-gold group-hover:text-white transition-colors">
                                            {i}
                                        </div>
                                        <div>
                                            <p className="text-sm font-black text-foreground">Scan Registered</p>
                                            <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-tighter">System ID: 039{i}x</p>
                                        </div>
                                    </div>
                                    <p className="text-[10px] font-black text-muted-foreground">RECENT</p>
                                </div>
                            ))}
                        </div>
                        <div className="pt-4">
                            <Link href="/admin/meetings" className="w-full py-4 bg-white border border-slate-200 rounded-2xl flex items-center justify-center text-[10px] font-black uppercase tracking-widest hover:bg-gold/10 hover:border-gold/30 hover:text-gold transition-all">
                                VIEW DETAILED LOGS <ExternalLink className="size-3 ml-2" />
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
