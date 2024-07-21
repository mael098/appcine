import { prisma, snowflake } from '@/lib/db'
import { RegisterMasterForm, RegisterMasterFormSubmit } from './RegisterMasterForm'
import { hash } from 'bcrypt'
import { Role } from '@prisma/client'
import { onlyRole } from '@/lib/auth'

export default async function WelcomePage() {
    await onlyRole(Role.MASTER)

    const registerMaster: RegisterMasterFormSubmit = async (data) => {
        'use server'

        const session = await prisma.employees.create({
            data: {
                id: snowflake.generate().toString(),
                name: data.name,
                email: data.email,
                password: await hash(data.password, 10),
                role: Role.MASTER,
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