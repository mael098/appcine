'use client'
import { Input, SubmitPrimaryInput, TextArea } from '@/components/Input'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

export interface RoomFormAction {
    (data: {
        name: string,
        adults_price: number,
        kids_price: number,
        description: string
    }): Promise<{
        status: 'success' | 'error',
        message: string
    }>
}
export interface RoomFormProps {
    action: RoomFormAction
}
export function RoomForm(props: RoomFormProps) {
    const [errorName, setErrorName] = useState('')
    const { push } = useRouter()
    return (
        <form
            className="h-auto w-50 flex flex-col justify-center items-center gap-2"
            action={async e => {
                const request = await props.action({
                    name: e.get('name') as string,
                    adults_price: parseFloat(e.get('adults_price') as string),
                    kids_price: parseFloat(e.get('kids_price') as string),
                    description: e.get('description') as string
                })
                if (request.status === 'error' && request.message === 'Room already exists')
                    setErrorName(request.message)
                else if (request.status === 'error') alert('An error occurred')
                push('/system')
            }}
        >
            <h1 className='text-3xl text-slate-50 font-bold'>
                Registrar Sala
            </h1>
            <Input
                type="text"
                placeholder="Nombre Clave"
                name='name'
                error={errorName}
                onChange={() => setErrorName('')}
                required
            />
            <Input
                type="number"
                placeholder="Precio Adulto"
                name='adults_price'
                min={0}
                required
            />
            <Input
                type="number"
                placeholder="Precio Niños"
                name='kids_price'
                min={0}
                required
            />
            <TextArea
                placeholder="Descripción"
                name='description'
                required
            />
            <SubmitPrimaryInput value='Crear' />
        </form>
    )
}