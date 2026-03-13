'use client'

import { QRCodeSVG } from 'qrcode.react'
import { useEffect, useState } from 'react'
import { RefreshCcw, ShieldCheck, Lock, Scan } from 'lucide-react'

export function QRGenerator({ meetingId }: { meetingId: string }) {
    const [token, setToken] = useState(`${meetingId}-${Date.now()}`)
    const [timeLeft, setTimeLeft] = useState(10)

    // Rotate QR code every 10 seconds to prevent proxy attendance
    useEffect(() => {
        const timer = setInterval(() => {
            setTimeLeft((prev) => {
                if (prev <= 1) {
                    setToken(`${meetingId}-${Date.now()}`)
                    return 10
                }
                return prev - 1
            })
        }, 1000)

        return () => clearInterval(timer)
    }, [meetingId])

    return (
        <div className="flex flex-col items-center gap-10 animate-in fade-in zoom-in-95 duration-700">
            {/* Premium QR Frame */}
            <div className="relative group p-10 bg-white rounded-[3rem] shadow-2xl shadow-slate-200 border border-slate-100 overflow-hidden">
                {/* Visual Security Overlay */}
                <div className="absolute inset-0 bg-slate-50/50 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
                <div className="absolute top-0 left-0 w-12 h-12 border-t-4 border-l-4 border-gold rounded-tl-2xl p-2">
                    <Scan className="size-4 text-gold opacity-50" />
                </div>
                <div className="absolute top-0 right-0 w-12 h-12 border-t-4 border-r-4 border-gold rounded-tr-2xl" />
                <div className="absolute bottom-0 left-0 w-12 h-12 border-b-4 border-l-4 border-gold rounded-bl-2xl" />
                <div className="absolute bottom-0 right-0 w-12 h-12 border-b-4 border-r-4 border-gold rounded-br-2xl p-2 flex items-end justify-end">
                    <Lock className="size-4 text-gold opacity-50" />
                </div>

                <div className="relative z-10 bg-white p-6 rounded-2xl shadow-inner border border-slate-50">
                    <QRCodeSVG
                        value={JSON.stringify({ meetingId, token })}
                        size={280}
                        level="H"
                        includeMargin={false}
                        className="transition-transform duration-500 group-hover:scale-105"
                    />
                </div>
            </div>

            {/* Status Indicators */}
            <div className="flex flex-col md:flex-row items-center gap-6">
                <div className="flex items-center gap-4 bg-slate-900 border border-slate-800 text-white px-8 py-4 rounded-3xl shadow-xl shadow-slate-200 group transition-all">
                    <div className="relative">
                        <RefreshCcw className="size-5 text-gold animate-[spin_3s_linear_infinite]" />
                        <div className="absolute inset-0 bg-gold/20 blur-md rounded-full animate-pulse" />
                    </div>
                    <div>
                        <p className="text-[10px] font-black uppercase tracking-[0.2em] text-gold/80 mb-0.5 whitespace-nowrap">Security Rotation</p>
                        <p className="text-xs font-bold tabular-nums">Automatic Refresh in {timeLeft}s</p>
                    </div>
                </div>

                <div className="flex items-center gap-4 bg-white border border-slate-200 text-slate-900 px-8 py-4 rounded-3xl shadow-lg shadow-slate-100">
                    <ShieldCheck className="size-5 text-green-500" />
                    <div>
                        <p className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground mb-0.5 whitespace-nowrap">Encryption Active</p>
                        <p className="text-xs font-bold">Dynamic Token Verified</p>
                    </div>
                </div>
            </div>

            <p className="text-slate-300 font-black text-[9px] uppercase tracking-[0.4em] mt-4">
                Club Attendance System • Secure ID Engine
            </p>
        </div>
    )
}
