import { login, signup } from './actions'
import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { ScanLine, ShieldCheck, Lock, Mail, ArrowRight } from 'lucide-react'

export default async function LoginPage({
    searchParams,
}: {
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (user) {
        return redirect('/')
    }

    const resolvedSearchParams = await searchParams;
    const message = resolvedSearchParams?.message as string;

    return (
        <div className="flex-1 flex flex-col w-full min-h-screen items-center justify-center p-6 relative overflow-hidden bg-slate-50">
            {/* Background Decorative Elements */}
            <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden">
                <div className="absolute -top-24 -left-24 w-96 h-96 bg-gold/5 rounded-full blur-3xl" />
                <div className="absolute top-1/2 -right-24 w-64 h-64 bg-slate-200/50 rounded-full blur-3xl" />
            </div>

            <div className="w-full sm:max-w-[480px] relative z-10 animate-in fade-in zoom-in-95 duration-1000">
                {/* Brand Logo / Identity */}
                <div className="flex flex-col items-center text-center mb-12 space-y-4">
                    <div className="size-20 rounded-[2.5rem] navy-gradient-bg flex items-center justify-center shadow-2xl shadow-slate-300">
                        <ScanLine className="size-10 text-gold" />
                    </div>
                    <div className="space-y-1">
                        <div className="flex items-center justify-center gap-2">
                            <div className="h-px w-6 bg-gold" />
                            <span className="text-[10px] font-black text-gold uppercase tracking-[0.4em]">Secure Access Portal</span>
                            <div className="h-px w-6 bg-gold" />
                        </div>
                        <h1 className="text-5xl font-black tracking-tighter text-foreground italic">
                            Club <span className="text-gradient-gold">Sync</span>
                        </h1>
                    </div>
                </div>

                <form className="premium-card bg-white p-10 flex flex-col gap-8">
                    <div className="space-y-6">
                        {/* Email Field */}
                        <div className="space-y-3">
                            <label className="text-[10px] font-black text-muted-foreground uppercase tracking-widest flex items-center gap-2" htmlFor="email">
                                <Mail className="size-3" /> Identity Email
                            </label>
                            <div className="relative group">
                                <input
                                    className="w-full rounded-2xl px-6 py-4 bg-slate-50 border border-slate-100 focus:bg-white focus:border-gold/30 focus:ring-4 focus:ring-gold/5 outline-none transition-all font-bold text-sm text-foreground placeholder:text-slate-300"
                                    name="email"
                                    placeholder="you@presence.net"
                                    required
                                    autoComplete="email"
                                />
                                <div className="absolute inset-0 rounded-2xl border border-gold/0 group-focus-within:border-gold/20 pointer-events-none transition-all" />
                            </div>
                        </div>

                        {/* Password Field */}
                        <div className="space-y-3">
                            <label className="text-[10px] font-black text-muted-foreground uppercase tracking-widest flex items-center gap-2" htmlFor="password">
                                <Lock className="size-3" /> Security Token
                            </label>
                            <div className="relative group">
                                <input
                                    className="w-full rounded-2xl px-6 py-4 bg-slate-50 border border-slate-100 focus:bg-white focus:border-gold/30 focus:ring-4 focus:ring-gold/5 outline-none transition-all font-bold text-sm text-foreground"
                                    type="password"
                                    name="password"
                                    placeholder="••••••••"
                                    required
                                    autoComplete="current-password"
                                />
                                <div className="absolute inset-0 rounded-2xl border border-gold/0 group-focus-within:border-gold/20 pointer-events-none transition-all" />
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-col gap-4">
                        <button
                            formAction={login}
                            className="bg-slate-900 hover:bg-black text-white rounded-[1.5rem] px-8 py-5 text-xs font-black uppercase tracking-[0.2em] transition-all shadow-xl shadow-slate-200 active:scale-95 flex items-center justify-center gap-2"
                        >
                            Authorize Entry <ArrowRight className="size-4 text-gold" />
                        </button>

                        <div className="flex items-center gap-4 py-2">
                            <div className="h-px flex-1 bg-slate-100" />
                            <span className="text-[9px] font-black text-slate-300 uppercase tracking-widest">New Operative?</span>
                            <div className="h-px flex-1 bg-slate-100" />
                        </div>

                        <button
                            formAction={signup}
                            className="border-2 border-slate-100 hover:border-gold/20 hover:bg-slate-50 text-foreground rounded-[1.5rem] px-8 py-4 text-xs font-bold transition-all uppercase tracking-widest"
                        >
                            Request Registry
                        </button>
                    </div>

                    {message && (
                        <div className="p-5 bg-red-50 border border-red-100 rounded-2xl flex items-center gap-3 animate-in slide-in-from-top-2">
                            <div className="size-2 rounded-full bg-red-500 animate-pulse" />
                            <p className="text-[10px] font-black text-red-600 uppercase tracking-widest">
                                {message}
                            </p>
                        </div>
                    )}
                </form>

                <div className="mt-12 flex items-center justify-center gap-6 opacity-30">
                    <div className="flex items-center gap-2">
                        <ShieldCheck className="size-4" />
                        <span className="text-[9px] font-black uppercase tracking-widest">SSL Encrypted</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <Lock className="size-4" />
                        <span className="text-[9px] font-black uppercase tracking-widest">Biometric Ready</span>
                    </div>
                </div>
            </div>
        </div>
    )
}
