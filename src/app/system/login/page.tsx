import Image from 'next/image'
import LoginForm, { LoginFormAction } from './LoginForm'
import { cookies } from 'next/headers'
import { compare } from 'bcrypt'
import { SignJWT } from 'jose'
import { redirect } from 'next/navigation'
import { JWT_SECRET } from '@/lib/constants'
import { prisma } from '@/lib/db'

interface LoginPageProps {
    searchParams: {
        redirect?: string
    }
}
let count = 0
export default async function LoginPage(props: LoginPageProps) {
    const c = count++
    console.log('p', props, c)

    const employees = await prisma.employees.count()
    console.log('e', employees, c)

    if (!employees) return redirect('/system/welcome')
    console.log('no', c)
    const submit: LoginFormAction = async ({ email, password }) => {
        'use server'
        const session = await prisma.employees.findUnique({
            where: {
                email,
                active: true
            }
        })

        if (!session) {
            return {
                message: 'Invalid credentials',
                status: 'error'
            }
        }
        const { cinema_id, created_at, id, name, active, role, password: passwordDb } = session
        if (!await compare(password, passwordDb)) {
            return {
                message: 'Invalid credentials',
                status: 'error'
            }
        }
        const expires = new Date()
        expires.setDate(expires.getDate() + 1)
        cookies().set({
            expires,
            name: 'session',
            value: await new SignJWT({ cinema_id, created_at, id, name, active, role, email, exp: expires.getTime() })
                .setProtectedHeader({ alg: 'HS256' })
                .setIssuedAt()
                .setExpirationTime('1d')
                .sign(JWT_SECRET)
        })
        return {
            message: 'Welcome',
            status: 'success'
        }
    }
    return (
        <div className="w-screen h-screen grid justify-center items-center">
            <main className="grid grid-cols-2 justify-center items-center bg-green-200 h-96 w-[700px] rounded-2xl shadow-green-900 shadow-2xl">
                <Image priority src='/Premium Photo _ Vintage cinema videocamera.jpg' alt='fondo' width={380} height={100} className='col-span-1 w-full h-full rounded-l-2xl' />
                <LoginForm redirect={props.searchParams.redirect} action={submit} />
            </main>
        </div>
    )
}