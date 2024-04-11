import { InputHTMLAttributes } from 'react'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
}

export function Input(props: InputProps) {
    return (
        <input {...props} className="bg-light-50 p-3 placeholder:text-black placeholder:text-sm" />
    )
}

export function SubmitInput(props: InputProps) {
    return (
        <input {...props} className="bg-lime-500 p-2 rounded-md hover:bg-lime-700 valid:text-center" />
    )
}

export function TextArea(props: InputProps) {
    return (
        <textarea name="descripcion" id="descripcionSala" cols={23} rows={5} placeholder='descripcion de la sala' className='bg-light-50 p-3 placeholder:text-black placeholder:text-sm'></textarea>
    )
}

export function InsertarImag(props: InputProps) {
    return (
        <input {...props} type="file" className="bg-slate-200 w-60 h-7 valid:text-transparent" accept='.jpg,.png,.wepg' />
    )

}