import { MemberSidebar } from '@/components/layout/MemberSidebar'

export default function MemberLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <div className="flex min-h-screen bg-background text-foreground">
            <MemberSidebar />
            <main className="flex-1 p-8 overflow-y-auto relative">
                {/* Subtle decorative background gradient */}
                <div className="absolute top-0 right-0 -z-10 w-96 h-96 bg-accent/5 rounded-full blur-3xl pointer-events-none" />
                <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in duration-500 slide-in-from-bottom-4">
                    {children}
                </div>
            </main>
        </div>
    )
}
