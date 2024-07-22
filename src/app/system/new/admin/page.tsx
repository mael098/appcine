import { prisma, snowflake } from '@/lib/db'
import { RegisterAdminForm, RegisterAdminFormSubmit } from './RegisterAdminForm'
import { hash } from 'bcrypt'
import { Role } from '@prisma/client'
import { onlyRole } from '@/lib/auth'

export default async function NewAdminPage() {
    await onlyRole(Role.MASTER)

    const cinemas = await prisma.cinemas.findMany()

    const action: RegisterAdminFormSubmit = async (data) => {
        'use server'

        // check if user exists
        const user = await prisma.employees.findFirst({
            where: {
                email: data.email
            }
        })
        if (user) return {
            status: 'error',
            message: 'Employee already exists'
        }
        await prisma.employees.create({
            data: {
                id: snowflake.generate().toString(),
                name: data.name,
                email: data.email,
                password: await hash(data.password, 10),
                role: Role.ADMIN,
                cinema_id: data.cinema_id
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
            <RegisterAdminForm cinemas={cinemas} submit={action} />
        </main>
    )
}