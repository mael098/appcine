import Image from 'next/image'
import LoginForm from './LoginForm'
import { FormEventHandler } from 'react'

export default async function Login() {
    const submit = async ({email, password}:{email:string,password:string}) => {
        'use server'
        console.log({email, password})
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