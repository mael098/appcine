import { prisma } from '@/lib/db'
import { SeatsCanvas } from './SeatsCanvas'
import { redirect } from 'next/navigation'

interface SeatsPageProps {
    params: {
        room_id: string
    }
}
export default async function SeatsPage({params: {room_id}}: SeatsPageProps) {
    const room = await prisma.room.findUnique({
        where: {
            id: room_id
        },
        include: {
            seats: true
        }
    })
    if (!room) return redirect('/system')
    return (
        <SeatsCanvas room={room} seats={room.seats} />
    )
}