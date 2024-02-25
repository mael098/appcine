'use client'

import { Input, SubmitInput } from '@/components/Input'
import { FormEventHandler } from 'react'

type submit = (opt:{email:string,password:string})=>Promise<{error?:string,status:string}>

export default function LoginForm({submit}:{submit:submit}) {
    const submitForm: FormEventHandler<HTMLFormElement> = async (e) => {
        e.preventDefault()
        const formData = new FormData(e.currentTarget)
        const r = await submit({
            email: formData.get('email') as string,
            password: formData.get('password') as string
        })
        if(r.error) {
            alert(r.error)
        }
    }
    return (
        <form onSubmit={submitForm} className='col-span-1 flex flex-col gap-9 justify-center items-center'>
            <h1 className="text-3xl font-extrabold">login</h1>
            <Input type='email' name='email' id='email' placeholder='email' required />
            <Input type="password" name="password" id='password' placeholder='password' required />
            <SubmitInput type="submit" value="Iniciar Sesion" />
        </form>
    )
}