'use client'

import { Input, SubmitPrimaryInput } from '@/components/Input';
import { useRouter } from 'next/navigation';
import { useState } from 'react'

export interface RegisterMasterFormSubmit {
    (props: {
        name: string;
        email: string;
        password: string;
        cinema_name: string;
        latitude: number;
        longitude: number;
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
    const [cinema_name, setCinemaName] = useState('')
    const [latitude, setLatitude] = useState(0)
    const [longitude, setLongitude] = useState(0)
    const { replace } = useRouter()
    const [passwordError, setPasswordError] = useState('')
    const [password2Error, setPassword2Error] = useState('')

    return (
        <form
            className='flex flex-col gap-1 p-10'
            action={async e => {
                if (!password.match(/[A-Z]/g)) return setPasswordError("La contrasenia debe tener al menos una mayuscula")
                if (!password.match(/[a-z]/g)) return setPasswordError("La contrasenia debe tener al menos una minuscula")
                if (!password.match(/[0-9]/g)) return setPasswordError("La contrasenia debe tener al menos un numero")
                if (!password.match(/[!?_\-+=*&%$#]/g)) return setPasswordError('La contrasenia debe tener al menos un caracter especial')
                if (password.length < 8) return setPasswordError("La contrasenia debe tener al menos 8 caracteres")
                if (password.match(/[^A-Za-z0-9!?_\-+=*&%$#]/g)) return setPasswordError("La contrasenia solo puede tener los siguientes caracteres especiales: !?_-=+*&%$#")

                if (password !== password2) return setPassword2Error('Passwords do not match')
                const response = await props.submit({
                    name,
                    email,
                    password,
                    cinema_name,
                    latitude,
                    longitude
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
            <hr className='border-t-4 border-black rounded' />
            <Input
                type="text"
                placeholder='Cinema Name'
                required
                onInput={e => setCinemaName(e.currentTarget.value)}
                value={cinema_name}
            />
            <Input
                placeholder='Cinema Latitude'
                type="number"
                required
                onInput={e => setLatitude(parseFloat(e.currentTarget.value))}
                value={latitude}
            />
            <Input
                type="number"
                placeholder='Cinema Longitude'
                required
                onInput={e => setLongitude(parseFloat(e.currentTarget.value))}
                value={longitude}
            />
            <SubmitPrimaryInput
                type="submit"
                value="Registrar"
            />
        </form>
    )
}