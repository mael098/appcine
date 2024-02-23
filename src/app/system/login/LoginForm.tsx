'use client'

import { FormEventHandler } from 'react'

export default function LoginForm({submit}:{submit:(opt:{email:string,password:string})=>void}) {
    const submitForm: FormEventHandler<HTMLFormElement> = (e) => {
        e.preventDefault()
        const formData = new FormData(e.currentTarget)
        submit({
            email: formData.get('email') as string,
            password: formData.get('password') as string
        })
    }
    return (
        <form onSubmit={submitForm} className='col-span-1 flex flex-col gap-9 justify-center items-center'>
            <h1 className="text-3xl font-extrabold">login</h1>
            <input type="email" name="email" id='email' placeholder='email' required className="p-2 rounded-md shadow-gray-950 shadow-inner focus:outline-none focus:outline-emerald-700 focus:shadow-none"/>
            <input type="password" name="password" id='password' placeholder='password' required className="p-2 rounded-md shadow-gray-950 shadow-inner focus:outline-none focus:outline-emerald-700 focus:shadow-none"/>
            <input type="submit" value="Iniciar Sesion" className='bg-lime-500 p-2 rounded-md hover:bg-lime-700' />
        </form>
    )
}