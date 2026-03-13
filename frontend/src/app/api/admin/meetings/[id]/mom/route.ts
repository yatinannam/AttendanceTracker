import { updateMeetingMomAction } from '@/app/admin/actions'
import { redirect } from 'next/navigation'

export async function POST(request: Request, { params }: { params: Promise<{ id: string }> }) {
    const { id } = await params

    const formData = await request.formData()
    const mom = formData.get('mom') as string

    await updateMeetingMomAction(id, mom)

    redirect(`/admin/meetings/${id}`)
}
