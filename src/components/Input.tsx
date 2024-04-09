import { InputHTMLAttributes } from 'react'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
}

export function Input(props: InputProps) {
    return (
        <input {...props} className="bg-light-50 p-3 placeholder:text-black placeholder:text-sm"/>
    )
}

export function SubmitInput(props: InputProps) {
    return (
        <input {...props} className="bg-lime-500 p-2 rounded-md hover:bg-lime-700 valid:text-center" />
    )
}

export function TextArea(props: InputProps){
    return(
        <textarea name="descripcion" id="descripcionSala" cols={30} rows={10} placeholder='descripcion de la sala' className='bg-light-50 p-3 placeholder:text-black placeholder:text-sm'></textarea>
    )
}