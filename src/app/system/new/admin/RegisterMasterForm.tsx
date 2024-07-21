'use client'

import { Input, SubmitPrimaryInput } from '@/components/Input'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

export interface RegisterMasterFormSubmit {
    (props: {
        name: string;
        email: string;
        password: string;
    }): Promise<{ status: 'error' | 'succes', message: string }>;
}
export interface RegisterMasterFormProps {
    submit: RegisterMasterFormSubmit
}
export function RegisterMasterForm(props: RegisterMasterFormProps) {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [password2, setPassword2] = useState('')
    const { replace } = useRouter()
    const [passwordError, setPasswordError] = useState('')
    const [password2Error, setPassword2Error] = useState('')

    return (
        <form
            className='flex flex-col gap-1 p-10'
            action={async e => {
                if (!password.match(/[A-Z]/g)) return setPasswordError('La contrasenia debe tener al menos una mayuscula')
                if (!password.match(/[a-z]/g)) return setPasswordError('La contrasenia debe tener al menos una minuscula')
                if (!password.match(/[0-9]/g)) return setPasswordError('La contrasenia debe tener al menos un numero')
                if (!password.match(/[!?_\-+=*&%$#]/g)) return setPasswordError('La contrasenia debe tener al menos un caracter especial')
                if (password.length < 8) return setPasswordError('La contrasenia debe tener al menos 8 caracteres')
                if (password.match(/[^A-Za-z0-9!?_\-+=*&%$#]/g)) return setPasswordError('La contrasenia solo puede tener los siguientes caracteres especiales: !?_-=+*&%$#')

                if (password !== password2) return setPassword2Error('Passwords do not match')
                const response = await props.submit({
                    name,
                    email,
                    password,
                })
                if (response.status === 'error') alert(response.message)
                else replace('/system')
            }}>
            <Input
                placeholder='Name'
                type="text"
                required
                onInput={e => setName(e.currentTarget.value)}
                value={name}
            />
            <Input
                placeholder='Email'
                type="email"
                required
                onInput={e => setEmail(e.currentTarget.value)}
                value={email}
            />
            <Input
                type="password"
                placeholder='Password'
                required
                onInput={e => setPassword(e.currentTarget.value)}
                value={password}
                error={passwordError}
            />
            <Input
                placeholder='Confirm Password'
                type="password"
                required
                onInput={e => setPassword2(e.currentTarget.value)}
                value={password2}
                error={password2Error}
            />
            <SubmitPrimaryInput
                type="submit"
                value="Registrar"
            />
        </form>
    )
}