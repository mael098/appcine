'use client'
import { Input, SubmitPrimaryInput, TextArea } from '@/components/Input'
import { room } from '@prisma/client'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

export interface RoomFormAction {
    (data: {
        name: string,
        adults_price: number,
        kids_price: number,
        description: string,
        width: number,
        length: number
    }): Promise<{
        status: 'success' | 'error',
        message: string,
        data?: room
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
            className="flex flex-col justify-center gap-2 bg-black bg-opacity-50 p-4"
            action={async e => {
                console.log('d', e.get('description'))

                const request = await props.action({
                    name: e.get('name') as string,
                    adults_price: parseFloat(e.get('adults_price') as string),
                    kids_price: parseFloat(e.get('kids_price') as string),
                    description: e.get('description') as string,
                    width: parseFloat(e.get('width') as string),
                    length: parseFloat(e.get('length') as string)
                })
                if (request.status === 'error' && request.message === 'Room already exists')
                    setErrorName(request.message)
                else if (request.status === 'error') alert('An error occurred')
                push(`/system/edit/room/${request.data!.id}/seats`)
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
            <div className='flex gap-2'>
                <Input
                    type="number"
                    placeholder="Precio Adulto"
                    name='adults_price'
                    min={0}
                    required
                /><Input
                    type="number"
                    placeholder="Precio Niños"
                    name='kids_price'
                    min={0}
                    required
                />
            </div>
            <div className='flex gap-2'>
                <Input
                    type="number"
                    placeholder="Ancho en metros"
                    name='width'
                    min={0}
                    required
                    tooltip='Ancho de la sala en metros, este sera el frente donde debe estar la pantalla'
                /><Input
                    type="number"
                    placeholder="Largo en metros"
                    name='length'
                    min={0}
                    required
                />
            </div>
            <TextArea
                placeholder="Descripción"
                name='description'
                required
            />
            <SubmitPrimaryInput value='Crear' />
        </form>
    )
}