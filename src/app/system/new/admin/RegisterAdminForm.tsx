'use client'

import { Input, SubmitPrimaryInput } from '@/components/Input'
import { cinemas } from '@prisma/client'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

export interface RegisterAdminFormSubmit {
    (props: {
        name: string;
        email: string;
        password: string;
        cinema_id: string;
    }): Promise<{ status: 'error' | 'succes', message: string }>;
}
export interface RegisterAdminFormProps {
    submit: RegisterAdminFormSubmit
    cinemas: cinemas[]
}
export function RegisterAdminForm(props: RegisterAdminFormProps) {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [password2, setPassword2] = useState('')
    const { replace } = useRouter()
    const [passwordError, setPasswordError] = useState('')
    const [password2Error, setPassword2Error] = useState('')
    const [emailError, setEmailError] = useState('')

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
                    name: e.get('name') as string,
                    email,
                    password,
                    cinema_id: e.get('cinema') as string
                })
                if (response.status === 'error' && response.message === 'Employee already exists') return setEmailError(response.message)
                else if (response.status === 'error') return alert(response.message)
                else replace('/system')
            }}>
            <Input
                placeholder='Name'
                name="name"
                type="text"
                required
            />
            <Input
                placeholder='Email'
                type="email"
                required
                onInput={e => {
                    setEmail(e.currentTarget.value)
                    setEmailError('')
                }}
                error={emailError}
                value={email}
            />
            <select
                name="cinema"
                required
            >
                {props.cinemas.map(cinema => (
                    <option value={cinema.id} key={cinema.id}>{cinema.name}</option>
                ))}
            </select>
            <Input
                type="password"
                placeholder='Password'
                required
                onInput={e => {
                    setPassword(e.currentTarget.value)
                    setPasswordError('')
                }}
                value={password}
                error={passwordError}
            />
            <Input
                placeholder='Confirm Password'
                type="password"
                required
                onInput={e => {
                    setPassword2(e.currentTarget.value)
                    setPassword2Error('')
                }}
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