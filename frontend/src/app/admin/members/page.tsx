import { createClient } from '@backend/infrastructure/supabase/server'
import { Users, Mail, ShieldAlert, Award, Search, Filter } from 'lucide-react'

export const metadata = {
    title: 'Member Directory | Admin Suite',
}

export default async function MembersPage() {
    const supabase = await createClient()

    const { data: members } = await supabase
        .from('users')
        .select('*')
        .eq('role', 'member')
        .order('full_name', { ascending: true })

    return (
        <div className="max-w-7xl mx-auto space-y-12 pb-20 animate-in fade-in duration-700">
            {/* Header Area */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 pt-6">
                <div className="space-y-4">
                    <div className="flex items-center gap-2">
                        <div className="h-px w-8 bg-gold" />
                        <span className="text-[10px] font-black text-gold uppercase tracking-[0.3em]">Personnel Database</span>
                    </div>
                    <h1 className="text-5xl font-black tracking-tighter text-foreground">
                        Member <br />
                        <span className="text-gradient-gold">Directory</span>
                    </h1>
                </div>

                <div className="flex items-center gap-4">
                    <div className="relative group">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 size-4 text-slate-400 group-focus-within:text-gold transition-colors" />
                        <input
                            type="text"
                            placeholder="Search operatives..."
                            className="pl-12 pr-6 py-4 bg-white border border-slate-200 rounded-2xl text-xs font-bold focus:outline-none focus:ring-2 focus:ring-gold/20 focus:border-gold transition-all w-72 shadow-sm"
                        />
                    </div>
                    <button className="p-4 bg-slate-900 text-white rounded-2xl hover:bg-black transition-all">
                        <Filter className="size-5" />
                    </button>
                </div>
            </div>

            {/* Premium Table View */}
            <div className="premium-card bg-white overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm whitespace-nowrap">
                        <thead className="bg-slate-50/50 border-b border-slate-100">
                            <tr>
                                <th className="px-8 py-6 text-[10px] font-black text-muted-foreground uppercase tracking-[0.2em]">Full Name / Identity</th>
                                <th className="px-8 py-6 text-[10px] font-black text-muted-foreground uppercase tracking-[0.2em]">Contact Channel</th>
                                <th className="px-8 py-6 text-[10px] font-black text-muted-foreground uppercase tracking-[0.2em] text-right">Domain Specialization</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-50">
                            {members?.map((member) => (
                                <tr key={member.id} className="hover:bg-slate-50/50 transition-colors group">
                                    <td className="px-8 py-6">
                                        <div className="flex items-center gap-4">
                                            <div className="size-12 rounded-2xl bg-slate-100 flex items-center justify-center text-slate-400 font-black group-hover:bg-gold/10 group-hover:text-gold transition-all border border-slate-200/50">
                                                {member.full_name?.charAt(0)}
                                            </div>
                                            <div>
                                                <p className="font-black text-foreground text-base tracking-tight">{member.full_name}</p>
                                                <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-tighter">Registered Operative</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-8 py-6">
                                        <div className="flex items-center gap-2 group-hover:text-accent transition-colors">
                                            <Mail className="size-4 text-slate-300" />
                                            <p className="font-bold text-slate-500 lowercase tracking-tight">{member.email}</p>
                                        </div>
                                    </td>
                                    <td className="px-8 py-6 text-right">
                                        <div className="flex items-center justify-end gap-2">
                                            <Award className="size-3.5 text-gold opacity-0 group-hover:opacity-100 transition-opacity" />
                                            <span className="px-4 py-1.5 rounded-xl bg-slate-900 text-white text-[10px] font-black uppercase tracking-widest shadow-lg shadow-slate-200">
                                                {member.domain || "GENERAL"}
                                            </span>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {(!members || members.length === 0) && (
                    <div className="p-24 text-center space-y-6">
                        <div className="size-20 bg-slate-50 rounded-[2.5rem] flex items-center justify-center mx-auto border border-slate-100">
                            <ShieldAlert className="size-10 text-slate-200" />
                        </div>
                        <div className="space-y-2">
                            <h3 className="text-2xl font-black text-slate-400">Registry Vacant</h3>
                            <p className="text-xs font-bold text-slate-300 uppercase tracking-widest">No members found in the current sector</p>
                        </div>
                    </div>
                )}
            </div>

            {/* Footer Summary */}
            <div className="px-4 flex items-center justify-between text-[10px] font-black text-muted-foreground uppercase tracking-[0.2em]">
                <p>Showing {members?.length || 0} Professional Members</p>
                <div className="flex gap-4">
                    <button className="hover:text-gold transition-colors">Export CSV</button>
                    <button className="hover:text-gold transition-colors">Print Registry</button>
                </div>
            </div>
        </div>
    )
}
