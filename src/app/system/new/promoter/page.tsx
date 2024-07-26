import { prisma, snowflake } from '@/lib/db'
import { RegisterAdminForm, RegisterAdminFormSubmit } from './FromPromotor'
import { hash } from 'bcrypt'
import { Role } from '@prisma/client'
import { onlyRole } from '@/lib/auth'
import { getAuthenticatedUser } from '@/lib/auth'

export default async function NewAdminPage() {
    await onlyRole(Role.ADMIN)
    const user = await getAuthenticatedUser()
    const cinemaid =  user.cinema_id

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
                role: Role.PROMOTER,
                cinema_id: cinemaid
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
            <RegisterAdminForm  submit={action} />
        </main>
    )
}