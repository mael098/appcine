import { onlyRole } from '@/lib/auth'
import { RegisterCinemaForm } from './RegisterCinemaForm'
import { Role } from '@prisma/client'

export default async function CinemaPage() {
    await onlyRole(Role.MASTER)

    return (
        <main className='flex flex-col p-4 gap-1 justify-center h-full text-center items-center' >
            <h1>Registro de Cine</h1>
            <RegisterCinemaForm action={async data => {
                'use server'
                return {
                    status: 'success',
                    message: 'cinema registered'
                }
            }} />
        </main>
    )
}