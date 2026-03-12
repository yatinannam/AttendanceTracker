import Link from 'next/link'
import { Home, ScanLine, Clock, LogOut } from 'lucide-react'
import { logout } from '@/app/login/actions'

export function MemberSidebar() {
    return (
        <div className="w-72 border-r border-slate-200 bg-white/50 backdrop-blur-xl min-h-screen p-6 flex flex-col gap-10">
            <div className="flex items-center gap-3 px-2 py-6">
                <div className="size-10 rounded-2xl navy-gradient-bg flex items-center justify-center shadow-lg shadow-slate-200">
                    <ScanLine className="size-5 text-gold" />
                </div>
                <div className="flex flex-col">
                    <span className="font-black text-xl tracking-tighter text-foreground">Member</span>
                    <span className="text-[10px] font-black text-gold uppercase tracking-[0.2em] leading-none">Activity Hub</span>
                </div>
            </div>

            <nav className="flex-1 flex flex-col gap-2">
                <Link href="/member" className="flex items-center gap-4 px-4 py-3 rounded-2xl hover:bg-slate-100 text-muted-foreground hover:text-foreground transition-all group">
                    <div className="p-2 bg-slate-50 rounded-xl group-hover:bg-white transition-colors">
                        <Home className="size-4 group-hover:text-gold transition-colors" />
                    </div>
                    <span className="text-sm font-bold tracking-tight">Dashboard</span>
                </Link>
                <Link href="/member/scan" className="flex items-center gap-4 px-4 py-3 rounded-2xl hover:bg-slate-100 text-muted-foreground hover:text-foreground transition-all group">
                    <div className="p-2 bg-slate-50 rounded-xl group-hover:bg-white transition-colors">
                        <ScanLine className="size-4 group-hover:text-gold transition-colors" />
                    </div>
                    <span className="text-sm font-bold tracking-tight">Scanning</span>
                </Link>
                <Link href="/member/history" className="flex items-center gap-4 px-4 py-3 rounded-2xl hover:bg-slate-100 text-muted-foreground hover:text-foreground transition-all group">
                    <div className="p-2 bg-slate-50 rounded-xl group-hover:bg-white transition-colors">
                        <Clock className="size-4 group-hover:text-gold transition-colors" />
                    </div>
                    <span className="text-sm font-bold tracking-tight">Logs & History</span>
                </Link>
            </nav>

            <div className="pt-6 border-t border-slate-100">
                <form action={logout}>
                    <button className="flex w-full items-center gap-4 px-4 py-3 rounded-2xl hover:bg-red-50 text-muted-foreground hover:text-red-600 transition-all font-bold text-sm">
                        <LogOut className="size-4" />
                        <span>Sign Out</span>
                    </button>
                </form>
            </div>
        </div>
    )
}
