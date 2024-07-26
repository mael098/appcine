import { prisma, snowflake } from '@/lib/db'
import { SeatsCanvas } from './SeatsCanvas'
import { redirect } from 'next/navigation'

interface SeatsPageProps {
    params: {
        room_id: string
    }
}
export default async function SeatsPage({params: {room_id}}: SeatsPageProps) {
    const addSeatsGroup = async () => {
        'use server'
        const groups = await prisma.seatGroup.findMany({
            where: {
                room_id: room_id
            }
        })
        const seatGroup = await prisma.seatGroup.create({
            data: {
                room_id: room_id,
                id: snowflake.generate().toString(),
                x: 2,
                y: groups.length + 2,
                seats: {
                    createMany: {
                        data: [{
                            id: snowflake.generate().toString(),
                            name: '1',
                        }, {
                            id: snowflake.generate().toString(),
                            name: '2',
                        }]
                    }
                },
            },
            include: {
                seats: true
            }
        })
        return seatGroup
    }
    const room = await prisma.room.findUnique({
        where: {
            id: room_id
        },
        include: {
            SeatGroup: {
                include: {
                    seats: true
                }
            }
        }
    })
    if (!room) return redirect('/system')
    return (
        <SeatsCanvas
            room={room}
            addSeatGroup={addSeatsGroup}
        />
    )
}