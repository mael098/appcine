'use client'

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

    return (
        <form
            className='flex flex-col gap-1 p-10'
            action={async e => {
                const response = await props.submit({
                    name,
                    email,
                    password,
                    cinema_name,
                    latitude,
                    longitude
                })
            }}>
            <input
                type="text"
                required
                onInput={e => setName(e.currentTarget.value)}
                value={name}
            />
            <input
                type="email"
                required
                onInput={e => setEmail(e.currentTarget.value)}
                value={email}
            />
            <input
                type="password"
                required
                onInput={e => setPassword(e.currentTarget.value)}
                value={password}
            />
            <input
                type="password"
                required
                onInput={e => setPassword2(e.currentTarget.value)}
                value={password2}
            />
            <input
                type="text"
                required
                onInput={e => setCinemaName(e.currentTarget.value)}
                value={cinema_name}
            />
            <input
                type="number"
                required
                onInput={e => setLatitude(parseFloat(e.currentTarget.value))}
                value={latitude}
            />
            <input
                type="number"
                required
                onInput={e => setLongitude(parseFloat(e.currentTarget.value))}
                value={longitude}
            />
            <input
                type="submit"
                value="Registrar"
            />
        </form>
    )
}