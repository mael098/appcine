'use client'

import { Input, SubmitInput } from '@/components/Input'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

export interface RegisterCinemaAction {
    (data: {
        name: string,
        latitude: number,
        longitude: number,
    }): Promise<{
        status: 'error' | 'success'
        message: string
    }>
}
export interface RegisterCinemaFormProps {
    action: RegisterCinemaAction
}
export function RegisterCinemaForm(prop: RegisterCinemaFormProps) {
    const [nameError, setNameError] = useState('')
    const router = useRouter()
    return (
        <form
            className='flex flex-col gap-2 p-4 min-w-96'
            action={async e => {
                const response = await prop.action({
                    name: e.get('name') as string,
                    latitude: parseFloat(e.get('latitude') as string),
                    longitude: parseFloat(e.get('longitude') as string),
                })
                if (response.status === 'error' && response.message === 'cinema already exists')
                    return setNameError('El cine ya existe')
                if (response.status === 'error')
                    return alert('An unexpected error occurred')
                router.push('/system')
            }}
        >
            <Input
                type='text'
                placeholder='Nombre'
                required
                name='name'
            />
            <Input
                type='number'
                placeholder='Latitud'
                required
                name='latitude'
                step={0.0000001}
            />
            <Input
                type='number'
                placeholder='Longitud'
                required
                name='longitude'
                step={0.0000001}
            />
            <SubmitInput value='Registrar' />
        </form>
    )
}