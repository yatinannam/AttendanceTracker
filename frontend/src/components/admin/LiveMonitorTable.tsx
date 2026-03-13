'use client'

import { useState, useEffect } from 'react'
import { Download, CheckCircle2, User, Clock, ShieldCheck } from 'lucide-react'

// Mock Data Type
type AttendanceRecord = {
    id: string
    user_full_name: string
    user_email: string
    scanned_at: string
}

export function LiveMonitorTable({ meetingId }: { meetingId: string }) {
    const [records, setRecords] = useState<AttendanceRecord[]>([
        { id: '1', user_full_name: 'Alice Johnson', user_email: 'alice@example.com', scanned_at: new Date(Date.now() - 120000).toISOString() },
        { id: '2', user_full_name: 'Bob Smith', user_email: 'bob@example.com', scanned_at: new Date(Date.now() - 60000).toISOString() },
    ])

    const exportCSV = () => {
        const csvContent = "data:text/csv;charset=utf-8,"
            + "Name,Email,Scanned At\n"
            + records.map(r => `${r.user_full_name},${r.user_email},${new Date(r.scanned_at).toLocaleTimeString()}`).join("\n")

        const encodedUri = encodeURI(csvContent)
        const link = document.createElement("a")
        link.setAttribute("href", encodedUri)
        link.setAttribute("download", `attendance_${meetingId}.csv`)
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)
    }

    return (
        <div className="premium-card bg-white flex flex-col overflow-hidden">
            <div className="flex items-center justify-between p-8 border-b border-slate-100 bg-slate-50/30">
                <div className="space-y-1">
                    <h3 className="text-xl font-black text-foreground flex items-center gap-2">
                        <div className="size-2 rounded-full bg-green-500 animate-pulse" />
                        Live Reception Feed
                    </h3>
                    <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Real-time attendance processing enabled</p>
                </div>
                <button
                    onClick={exportCSV}
                    className="flex items-center gap-2 bg-slate-900 hover:bg-black text-white px-5 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-lg shadow-slate-200 transition-all active:scale-95"
                >
                    <Download className="size-4 text-gold" />
                    EXPORT DATABASE
                </button>
            </div>

            <div className="overflow-x-auto">
                <table className="w-full text-left text-sm whitespace-nowrap">
                    <thead className="text-[10px] font-black text-muted-foreground uppercase tracking-[0.2em] bg-white border-b border-slate-50">
                        <tr>
                            <th className="px-8 py-4">Operative Identity</th>
                            <th className="px-8 py-4">Verification Status</th>
                            <th className="px-8 py-4 text-right">Timestamp</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-50">
                        {records.map((record) => (
                            <tr key={record.id} className="hover:bg-slate-50 transition-colors animate-in fade-in slide-in-from-left-4 duration-500 group">
                                <td className="px-8 py-6">
                                    <div className="flex items-center gap-4">
                                        <div className="size-10 rounded-xl bg-slate-100 flex items-center justify-center text-slate-400 font-black group-hover:bg-accent group-hover:text-white transition-all">
                                            <User className="size-4" />
                                        </div>
                                        <div>
                                            <p className="text-foreground font-black tracking-tight">{record.user_full_name}</p>
                                            <p className="text-muted-foreground text-[10px] font-bold uppercase tracking-tight">{record.user_email}</p>
                                        </div>
                                    </div>
                                </td>
                                <td className="px-8 py-6">
                                    <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-green-50 border border-green-100 w-fit">
                                        <ShieldCheck className="size-3.5 text-green-600" />
                                        <span className="text-[10px] font-black text-green-700 uppercase tracking-widest leading-none">Scanned (Secure)</span>
                                    </div>
                                </td>
                                <td className="px-8 py-6 text-right">
                                    <div className="flex items-center justify-end gap-2 text-slate-400">
                                        <Clock className="size-4" />
                                        <span className="text-[10px] font-black tabular-nums tracking-widest">
                                            {new Date(record.scanned_at).toLocaleTimeString()}
                                        </span>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                {records.length === 0 && (
                    <div className="p-20 text-center space-y-4">
                        <Activity className="size-12 text-slate-200 mx-auto animate-pulse" />
                        <p className="text-xs font-black text-slate-300 uppercase tracking-[0.2em]">Awaiting live sensor input...</p>
                    </div>
                )}
            </div>
        </div>
    )
}

function Activity({ className }: { className?: string }) {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
            <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
        </svg>
    )
}
