import { prisma, snowflake } from '@/lib/db'
import { RoomForm } from './CinemaForm'
import { getAuthenticatedUser } from '@/lib/auth'
import { Role } from '@prisma/client'
import { cookies } from 'next/headers'
import { COOKIE } from '@/lib/constants'

export default async function RoomPage() {
    const user = await getAuthenticatedUser()
    return (
        <main className="flex flex-1 justify-center items-center">
            <div className="p-5 bg-black bg-opacity-50">
                <RoomForm action={async ({
                    name,
                    adults_price,
                    kids_price,
                    description
                }) => {
                    'use server'
                    const cinema_id = user.role === Role.MASTER
                        ? cookies().get(COOKIE.CINEMA_ID)!.value
                        : user.cinema_id!
                    const exists = await prisma.room.findFirst({ where: { name, cinema_id } })
                    if (exists) return {
                        status: 'error',
                        message: 'Room already exists'
                    }
                    await prisma.room.create({
                        data: {
                            name,
                            adults_price,
                            kids_price,
                            description,
                            cinema_id,
                            id: snowflake.generate().toString(),
                        }
                    })
                    return {
                        status: 'success',
                        message: 'Cinema created'
                    }
                }} />
            </div>
        </main>

    )

}