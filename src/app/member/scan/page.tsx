import { QRScanner } from '@/components/member/QRScanner'
import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'

export const metadata = {
    title: 'Secure Check-in | Member Portal',
}

export default function ScanPage() {
    return (
        <div className="max-w-7xl mx-auto space-y-12 pb-20 animate-in fade-in duration-1000">
            {/* Header Area */}
            <div className="space-y-6 pt-6 flex flex-col items-center text-center">
                <Link
                    href="/member"
                    className="flex items-center gap-2 text-[10px] font-black text-muted-foreground hover:text-gold transition-colors tracking-[0.3em] uppercase"
                >
                    <ArrowLeft className="size-3" /> Dashboard
                </Link>

                <div className="space-y-4">
                    <div className="flex items-center justify-center gap-3">
                        <div className="h-px w-8 bg-gold" />
                        <span className="text-[10px] font-black text-gold uppercase tracking-[0.5em]">Auth Lens v2.0</span>
                        <div className="h-px w-8 bg-gold" />
                    </div>
                    <h1 className="text-5xl md:text-6xl font-black tracking-tighter text-foreground leading-[0.9]">
                        Session <br />
                        <span className="text-gradient-gold italic">Verification</span>
                    </h1>
                </div>
            </div>

            <QRScanner />

            {/* Guided Instructions */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto px-4">
                <div className="space-y-3 text-center">
                    <div className="text-[10px] font-black text-gold/40 tabular-nums">01</div>
                    <p className="text-xs font-black text-foreground uppercase tracking-widest">Focus Lens</p>
                    <p className="text-[10px] font-bold text-muted-foreground leading-relaxed">Center the administration code within the digital focal point.</p>
                </div>
                <div className="space-y-3 text-center">
                    <div className="text-[10px] font-black text-gold/40 tabular-nums">02</div>
                    <p className="text-xs font-black text-foreground uppercase tracking-widest">Decrypt</p>
                    <p className="text-[10px] font-bold text-muted-foreground leading-relaxed">Wait for the dynamic security token to resolve and authenticate.</p>
                </div>
                <div className="space-y-3 text-center">
                    <div className="text-[10px] font-black text-gold/40 tabular-nums">03</div>
                    <p className="text-xs font-black text-foreground uppercase tracking-widest">Verify</p>
                    <p className="text-[10px] font-bold text-muted-foreground leading-relaxed">Identity confirmed. Your attendance logs will update instantly.</p>
                </div>
            </div>
        </div>
    )
}
