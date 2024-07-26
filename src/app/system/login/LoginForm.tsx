'use client'

import { Input, SubmitInput } from '@/components/Input'
import { useRouter } from 'next/navigation'
import { FormEventHandler } from 'react'

export interface LoginFormAction {
    (opt: { email: string, password: string }): Promise<{ message: string, status: 'error' | 'success' }>
}
export interface LoginFormProps {
    action: LoginFormAction
    redirect?: string
}
export default function LoginForm(prop: LoginFormProps) {
    const router = useRouter()

    return (
        <form
            action={async e => {
                const r = await prop.action({
                    email: e.get('email') as string,
                    password: e.get('password') as string
                })
                if (r.status === 'error') alert(r.message)
                else router.push(prop.redirect || '/system')
            }}
            className='col-span-1 flex flex-col gap-9 justify-center items-center'
        >
            <h1 className="text-3xl font-extrabold">login</h1>
            <Input type='email' name='email' id='email' placeholder='email' required />
            <Input type="password" name="password" id='password' placeholder='password' required />
            <SubmitInput type="submit" value="Iniciar Sesion" />
        </form>
    )
}