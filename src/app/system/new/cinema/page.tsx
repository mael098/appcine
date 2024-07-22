import { onlyRole } from '@/lib/auth'
import { RegisterCinemaForm } from './RegisterCinemaForm'
import { Role } from '@prisma/client'
import { prisma, snowflake } from '@/lib/db'

export default async function CinemaPage() {
    await onlyRole(Role.MASTER)

    return (
        <main className='flex flex-col p-4 gap-1 justify-center h-full text-center items-center' >
            <h1>Registro de Cine</h1>
            <RegisterCinemaForm action={async data => {
                'use server'
                const cinema = await prisma.cinemas.findFirst({
                    where: {
                        name: data.name
                    }
                })
                if (cinema) return {
                    status: 'error',
                    message: 'Cinema already exists'
                }
                const session = await prisma.cinemas.create({
                    data: {
                        name: data.name,
                        latitude: data.latitude,
                        longitude: data.longitude,
                        id: snowflake.generate().toString(),
                    }
                })
                return {
                    status: 'success',
                    message: 'cinema registered'
                }
            }} />
        </main>
    )
}