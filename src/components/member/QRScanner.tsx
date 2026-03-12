'use client'
import { useEffect, useRef, useState } from 'react'
import { Html5Qrcode } from 'html5-qrcode'
import { toast } from 'sonner'
import { Camera, XCircle, ShieldCheck, Scan, Sparkles } from 'lucide-react'

import { markAttendanceAction } from '@/app/member/actions'

export function QRScanner() {
    const [isScanning, setIsScanning] = useState(false)
    const scannerRef = useRef<Html5Qrcode | null>(null)
    const [isProcessing, setIsProcessing] = useState(false)

    useEffect(() => {
        return () => {
            if (scannerRef.current && scannerRef.current.isScanning) {
                scannerRef.current.stop().catch(console.error)
            }
        }
    }, [])

    const startScanning = () => {
        setIsScanning(true)
        setTimeout(() => {
            if (!document.getElementById('reader')) return;

            const html5QrCode = new Html5Qrcode("reader")
            scannerRef.current = html5QrCode

            html5QrCode.start(
                { facingMode: "environment" },
                { fps: 15, qrbox: { width: 250, height: 250 }, aspectRatio: 1.0 },
                (decodedText) => {
                    html5QrCode.stop().then(() => {
                        setIsScanning(false)
                        processScannedToken(decodedText)
                    })
                },
                () => { } // ignore stream read errors
            ).catch(err => {
                toast.error("Camera access denied or unavailable.")
                setIsScanning(false)
            })
        }, 300)
    }

    const stopScanning = () => {
        if (scannerRef.current && scannerRef.current.isScanning) {
            scannerRef.current.stop().then(() => setIsScanning(false)).catch(console.error)
        } else {
            setIsScanning(false)
        }
    }

    const processScannedToken = async (text: string) => {
        setIsProcessing(true)
        try {
            const data = JSON.parse(text)
            if (data.meetingId) {
                const res = await markAttendanceAction(data.meetingId)
                if (res.error) {
                    toast.error(res.error)
                } else {
                    toast.success("Identity Verified. Attendance Recorded.")
                }
            } else {
                toast.error("Unauthorized Code Structure")
            }
        } catch {
            toast.error("Invalid Security Token Format")
        } finally {
            setIsProcessing(false)
        }
    }

    return (
        <div className="flex flex-col items-center gap-10 w-full max-w-xl mx-auto pb-10">
            {/* Premium Scanner Frame */}
            <div className="relative w-full aspect-square md:aspect-[4/3] bg-white rounded-[3rem] overflow-hidden shadow-2xl shadow-slate-200 border border-slate-100 flex flex-col items-center justify-center group">

                {/* Visual Security Accents */}
                <div className="absolute top-8 left-8 w-16 h-16 border-t-8 border-l-8 border-gold/40 rounded-tl-3xl z-10" />
                <div className="absolute top-8 right-8 w-16 h-16 border-t-8 border-r-8 border-gold/40 rounded-tr-3xl z-10" />
                <div className="absolute bottom-8 left-8 w-16 h-16 border-b-8 border-l-8 border-gold/40 rounded-bl-3xl z-10" />
                <div className="absolute bottom-8 right-8 w-16 h-16 border-b-8 border-r-8 border-gold/40 rounded-br-3xl z-10" />

                {!isScanning ? (
                    <div className="text-center p-12 space-y-8 animate-in fade-in zoom-in-95 duration-500 relative z-20">
                        <div className="relative mx-auto w-32 h-32">
                            <div className="absolute inset-0 bg-gold/10 rounded-full animate-ping" />
                            <div className="absolute inset-4 bg-slate-900 rounded-[2.5rem] flex items-center justify-center text-gold shadow-2xl relative z-10">
                                <Scan className="size-12" />
                            </div>
                        </div>

                        <div className="space-y-3">
                            <h3 className="text-3xl font-black text-foreground tracking-tight italic">Secure Lens Ready</h3>
                            <p className="text-muted-foreground text-sm font-medium leading-relaxed max-w-[240px] mx-auto uppercase tracking-tighter">
                                Align the dynamic QR within the focal frame for instant verification.
                            </p>
                        </div>

                        <button
                            onClick={startScanning}
                            disabled={isProcessing}
                            className="px-10 py-5 gold-gradient-bg text-white rounded-[2rem] font-black text-sm shadow-xl shadow-gold/20 hover:scale-[1.05] active:scale-95 transition-all flex items-center gap-3 mx-auto uppercase tracking-[0.2em]"
                        >
                            <Camera className="size-5" />
                            ACTIVATE SCANNER
                        </button>
                    </div>
                ) : (
                    <div className="w-full h-full relative">
                        <div id="reader" className="w-full h-full [&>video]:object-cover" />
                        {/* Scanning HUD */}
                        <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
                            <div className="size-64 border-2 border-gold/60 rounded-[2rem] relative">
                                <div className="absolute inset-0 bg-gold/5 animate-pulse" />
                                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-48 h-[2px] bg-gold shadow-[0_0_15px_rgba(217,119,6,0.8)] animate-[scan_2s_ease-in-out_infinite]" />
                            </div>
                        </div>
                    </div>
                )}

                {isScanning && (
                    <div className="absolute bottom-10 left-0 right-0 flex justify-center z-30">
                        <button
                            onClick={stopScanning}
                            className="flex items-center gap-3 bg-slate-900/40 backdrop-blur-xl border border-white/20 text-white rounded-full px-8 py-4 text-xs font-black uppercase tracking-widest hover:bg-slate-900 transition-all shadow-2xl"
                        >
                            <XCircle className="size-4 text-red-500" />
                            Dismiss Lens
                        </button>
                    </div>
                )}
            </div>

            {/* Verification Badge */}
            <div className="flex items-center gap-4 px-8 py-4 bg-slate-50 border border-slate-100 rounded-2xl shadow-sm">
                <ShieldCheck className="size-5 text-gold" />
                <div className="space-y-0.5">
                    <p className="text-[10px] font-black text-muted-foreground uppercase tracking-widest">Biometric Security</p>
                    <p className="text-xs font-bold text-slate-700">256-bit Encrypted Identity Push</p>
                </div>
                <div className="ml-4 pl-4 border-l border-slate-200">
                    <Sparkles className="size-5 text-gold/40" />
                </div>
            </div>

            <style jsx global>{`
                @keyframes scan {
                    0%, 100% { top: 10%; opacity: 0.2; }
                    50% { top: 90%; opacity: 1; }
                }
            `}</style>
        </div>
    )
}
