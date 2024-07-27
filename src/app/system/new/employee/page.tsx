import { prisma, snowflake } from '@/lib/db'
import { RegisterEmployeeForm, RegisterEmployeeFormSubmit } from './FormEmployee'
import { hash } from 'bcrypt'
import { Role } from '@prisma/client'
import { onlyRole } from '@/lib/auth'
import { getAuthenticatedUser } from '@/lib/auth'
import { cookies } from 'next/headers'
import { COOKIE } from '@/lib/constants'

export default async function NewAdminPage() {
    await onlyRole(Role.ADMIN)
    const user = await getAuthenticatedUser()
    const cinema_id = user.cinema_id ?? cookies().get(COOKIE.CINEMA_ID)?.value

    const action: RegisterEmployeeFormSubmit = async (data) => {
        'use server'
        if (!cinema_id) return {
            status: 'error',
            message: 'No cinema found'
        }

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
                cinema_id
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
            <RegisterEmployeeForm submit={action} />
        </main>
    )
}