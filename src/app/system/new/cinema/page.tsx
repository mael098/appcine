import { RegisterCinemaForm } from './RegisterCinemaForm'

export default async function CinemaPage() {
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