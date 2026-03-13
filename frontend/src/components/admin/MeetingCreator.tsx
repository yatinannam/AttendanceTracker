'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { PlusCircle, X, Calendar, MapPin, Type, Info, ArrowRight, Save } from 'lucide-react'
import { createMeetingAction } from '@/app/admin/actions'
import { toast } from 'sonner'

export function MeetingCreator() {
    const [isOpen, setIsOpen] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [meetingType, setMeetingType] = useState<'Club' | 'Domain'>('Club')
    const router = useRouter()

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()
        setIsLoading(true)
        const formData = new FormData(e.currentTarget)

        try {
            const res = await createMeetingAction(formData)
            if (res.error) {
                toast.error(res.error)
            } else {
                toast.success("Identity Event Orchestrated Successfully")
                setIsOpen(false)
                router.refresh()
            }
        } catch (err) {
            toast.error("Failed to manifest event in registry")
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <>
            <button
                onClick={() => setIsOpen(true)}
                className="gold-gradient-bg text-white px-8 py-4 rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] shadow-xl shadow-gold/20 hover:scale-[1.05] active:scale-95 transition-all flex items-center gap-3"
            >
                <PlusCircle className="size-4" />
                Orchestrate Event
            </button>

            {isOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8 bg-slate-900/60 backdrop-blur-md animate-in fade-in duration-300">
                    <div className="bg-white rounded-[3rem] shadow-[0_32px_128px_-16px_rgba(0,0,0,0.3)] w-full max-w-2xl overflow-hidden animate-in zoom-in-95 duration-500 border border-slate-100 flex flex-col md:flex-row">

                        {/* Sidebar Info Panel */}
                        <div className="md:w-64 navy-gradient-bg p-10 text-white flex flex-col justify-between relative group overflow-hidden">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-gold/10 rounded-full blur-3xl -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-1000" />

                            <div className="space-y-8 relative z-10">
                                <div className="size-12 rounded-2xl bg-white/10 flex items-center justify-center text-gold border border-white/10">
                                    <Type className="size-6" />
                                </div>
                                <div className="space-y-4">
                                    <h3 className="text-2xl font-black tracking-tight italic">Event <br /><span className="text-gold">Manifest</span></h3>
                                    <p className="text-[10px] font-bold text-slate-300 uppercase tracking-widest leading-relaxed">
                                        Define the parameters for your next organizational session.
                                    </p>
                                </div>
                            </div>

                            <div className="space-y-6 pt-10 relative z-10">
                                <div className="flex items-center gap-3">
                                    <div className="size-1.5 rounded-full bg-gold" />
                                    <span className="text-[9px] font-black uppercase tracking-widest text-slate-400 italic">Level 2 Clearance</span>
                                </div>
                            </div>
                        </div>

                        {/* Form Area */}
                        <form onSubmit={handleSubmit} className="flex-1 p-10 space-y-8 overflow-y-auto max-h-[90vh]">
                            <div className="flex items-center justify-between">
                                <h2 className="text-sm font-black text-muted-foreground uppercase tracking-[0.3em]">Configure Session</h2>
                                <button
                                    type="button"
                                    onClick={() => setIsOpen(false)}
                                    className="p-3 bg-slate-50 text-slate-400 hover:text-red-500 hover:bg-red-50 transition-all rounded-xl"
                                >
                                    <X className="size-5" />
                                </button>
                            </div>

                            <div className="space-y-8">
                                {/* Title Input */}
                                <div className="space-y-3">
                                    <label className="text-[10px] font-black text-muted-foreground uppercase tracking-widest flex items-center gap-2">
                                        <Info className="size-3" /> Event Identity
                                    </label>
                                    <input
                                        required
                                        name="title"
                                        className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-6 py-4 text-foreground font-bold text-sm focus:bg-white focus:outline-none focus:ring-4 focus:ring-gold/5 focus:border-gold/30 transition-all shadow-inner"
                                        placeholder="Enter meeting title..."
                                    />
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                    {/* Type Selection */}
                                    <div className="space-y-3">
                                        <label className="text-[10px] font-black text-muted-foreground uppercase tracking-widest">Logic Sector</label>
                                        <select
                                            name="type"
                                            className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-6 py-4 text-foreground font-bold text-sm focus:bg-white focus:outline-none focus:ring-4 focus:ring-gold/5 focus:border-gold/30 transition-all appearance-none cursor-pointer"
                                            onChange={(e) => setMeetingType(e.target.value as 'Club' | 'Domain')}
                                        >
                                            <option value="Club">Club-Wide</option>
                                            <option value="Domain">Domain-Specific</option>
                                        </select>
                                    </div>

                                    {/* Domain Selection (Conditional) */}
                                    <div className={`space-y-3 transition-all duration-500 ${meetingType === 'Domain' ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2 pointer-events-none'}`}>
                                        <label className="text-[10px] font-black text-muted-foreground uppercase tracking-widest">Assigned Wing</label>
                                        <select
                                            name="domain"
                                            disabled={meetingType !== 'Domain'}
                                            className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-6 py-4 text-foreground font-bold text-sm focus:bg-white focus:outline-none focus:ring-4 focus:ring-gold/5 focus:border-gold/30 transition-all appearance-none cursor-pointer disabled:bg-slate-100/50"
                                        >
                                            <option value="Technical">Technical</option>
                                            <option value="Creative">Creative</option>
                                            <option value="Operations">Operations</option>
                                            <option value="Outreach">Outreach</option>
                                            <option value="Sponsorship">Sponsorship</option>
                                        </select>
                                    </div>
                                </div>

                                {/* Venue & Time */}
                                <div className="space-y-8">
                                    <div className="space-y-3">
                                        <label className="text-[10px] font-black text-muted-foreground uppercase tracking-widest flex items-center gap-2">
                                            <MapPin className="size-3" /> Orchestration Venue
                                        </label>
                                        <input
                                            required
                                            name="venue"
                                            className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-6 py-4 text-foreground font-bold text-sm focus:bg-white focus:outline-none focus:ring-4 focus:ring-gold/5 focus:border-gold/30 transition-all shadow-inner"
                                            placeholder="Specify location..."
                                        />
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                        <div className="space-y-3">
                                            <label className="text-[10px] font-black text-muted-foreground uppercase tracking-widest">Commencement</label>
                                            <input
                                                required
                                                type="datetime-local"
                                                name="start_time"
                                                className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-6 py-4 text-foreground font-bold text-sm focus:bg-white focus:outline-none focus:ring-4 focus:ring-gold/5 focus:border-gold/30 transition-all"
                                            />
                                        </div>
                                        <div className="space-y-3">
                                            <label className="text-[10px] font-black text-muted-foreground uppercase tracking-widest">Termination</label>
                                            <input
                                                required
                                                type="datetime-local"
                                                name="end_time"
                                                className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-6 py-4 text-foreground font-bold text-sm focus:bg-white focus:outline-none focus:ring-4 focus:ring-gold/5 focus:border-gold/30 transition-all"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="flex justify-end gap-6 pt-10 border-t border-slate-50">
                                <button
                                    type="button"
                                    onClick={() => setIsOpen(false)}
                                    className="px-6 py-4 text-[10px] font-black text-muted-foreground hover:text-foreground transition-all uppercase tracking-widest"
                                >
                                    Abort
                                </button>
                                <button
                                    type="submit"
                                    disabled={isLoading}
                                    className="px-10 py-5 bg-slate-900 text-white rounded-2xl font-black text-[10px] shadow-xl shadow-slate-200 hover:bg-black transition-all flex items-center gap-3 uppercase tracking-widest disabled:opacity-50"
                                >
                                    {isLoading ? 'Processing...' : (
                                        <>
                                            Save Parameters <ArrowRight className="size-4 text-gold" />
                                        </>
                                    )}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </>
    )
}
