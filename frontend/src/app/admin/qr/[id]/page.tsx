import { QRGenerator } from '@/components/admin/QRGenerator'

export default async function QRConsolePage({ params }: { params: Promise<{ id: string }> }) {
    const resolvedParams = await params;

    return (
        <div className="min-h-[80vh] flex flex-col items-center justify-center space-y-8 animate-in fade-in zoom-in-95 duration-500">
            <div className="text-center space-y-2">
                <h1 className="text-4xl font-bold text-foreground tracking-tight">Scan to Attend</h1>
                <p className="text-muted-foreground">Point your phone camera or use the Member Portal scanner</p>
            </div>

            <div className="glass-panel p-8 md:p-12 border-accent/20 shadow-2xl shadow-accent/10">
                <QRGenerator meetingId={resolvedParams.id} />
            </div>
        </div>
    )
}
