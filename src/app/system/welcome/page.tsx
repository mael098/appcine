import { prisma, snowflake } from '@/lib/db'
import { redirect } from 'next/navigation'
import { RegisterMasterForm, RegisterMasterFormSubmit } from './RegisterMasterForm'
import { hash } from 'bcrypt'
import { Role } from '@prisma/client'

export default async function WelcomePage() {
    const employees = await prisma.employees.findFirst({})
    if (employees) return redirect('/system')

    const registerMaster: RegisterMasterFormSubmit = async (data) => {
        'use server'

        const session = await prisma.employees.create({
            data: {
                id: snowflake.generate().toString(),
                name: data.name,
                email: data.email,
                password: await hash(data.password, 10),
                role: Role.MASTER,
                cinemas: {
                    create: {
                        id: snowflake.generate().toString(),
                        name: data.cinema_name,
                        latitude: data.latitude,
                        longitude: data.longitude,
                    }
                }
            }
        })

        return {
            status: 'succes',
            message: 'Empleado registrado'
        }
    }

    return (
        <main className='flex flex-col gap-1 justify-center h-full text-center' >
            <h1>Welcome to the Greentea System</h1>
            <p>Para continuar se debe registrar al primer empleado el cual tendra como rol Master</p>
            <RegisterMasterForm submit={registerMaster} />
        </main>
    )
}