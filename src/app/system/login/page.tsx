import Image from 'next/image'
import LoginForm from './LoginForm'
import { cookies } from 'next/headers'
import supabase from '@/lib/db'
import { compare } from 'bcrypt'
import { SignJWT } from 'jose'
import { redirect } from 'next/navigation'
import { JWT_SECRET } from '@/lib/constants'

export default async function Login() {
    const submit = async ({email, password}:{email:string,password:string}) => {
        'use server'
        const session = await supabase.rpc('get_employee_login', {employee_email:email})
        if (session.error) {
            return {
                error: session.error.message,
                status: 'failed'
            }
        } else if (!session.data[0]) {
            return {
                error: 'invalid credentials',
                status: 'failed'
            }
        }
        const {cinema_id,created_at,id,name,active,role,password: passwordDb} = session.data[0]
        if (!await compare(password, passwordDb)) {
            return {
                error: 'invalid credentials',
                status: 'failed'
            }
        }
        const expires = new Date()
        expires.setDate(expires.getDate() + 1)
        cookies().set({
            expires,
            name: 'session',
            value: await new SignJWT({cinema_id,created_at,id,name,active,role,email,exp: expires.getTime()})
                .setProtectedHeader({ alg: 'HS256' })
                .setIssuedAt()
                .setExpirationTime('1d')
                .sign(JWT_SECRET)
        })
        redirect('/system')
    }
    return (
        <div className="w-screen h-screen grid justify-center items-center">
            <main className="grid grid-cols-2 justify-center items-center bg-green-200 h-96 w-[700px] rounded-2xl shadow-green-900 shadow-2xl">
                <Image priority src='/Premium Photo _ Vintage cinema videocamera.jpg' alt='fondo' width={380} height={100} className='col-span-1 w-full h-full rounded-l-2xl'/>
                <LoginForm submit={submit}/>
            </main>
        </div>
    )
}