import { InputHTMLAttributes } from 'react'

export interface InputProps
    extends InputHTMLAttributes<HTMLInputElement> {
    error?: string
    prefix?: string,
}
export function Input(props: InputProps) {
    const bg = props.className?.match(/(bg-[^ ])/g)?.[0] ?? 'bg-white'
    return (
        <div
            className={`my-2 flex flex-col z-10 rounded-md ${bg}${props.disabled ? 'border-opacity-50' : ''}
        ${props.className ?? ''}
        ${props.type === 'hidden' ? 'hidden' : ''}`} >
            <input
                className={`p-2 w-full bg-transparent border border-black rounded-md peer z-10
            ${props.disabled ? 'text-gray-700' : ''}
            ${props.error ? 'border-red-600' : ''}
            ${props.prefix ? 'pl-6' : ''}`}
                {...props}
                placeholder=" "
            />
            <label className={`
            absolute transition-all ${bg} leading-3 ${props.disabled ? 'text-gray-700' : ''}
            p-0 ml-1 -translate-y-2 z-10 text-sm rounded-sm
            peer-placeholder-shown:translate-y-0 peer-placeholder-shown:p-2 peer-placeholder-shown:z-0 peer-placeholder-shown:ml-0 peer-placeholder-shown:text-base peer-placeholder-shown:rounded-md
            ${props.error ? 'text-red-600' : ''}`} >
                {props.placeholder ?? props.name}
            </label>
            {props.prefix && (
                <span
                    className={`absolute py-2 pl-2 text-gray-700
            peer-placeholder-shown:hidden`}
                >
                    {props.prefix}
                </span>
            )}
            <small
                className={`relative transition-all ease-in-out px-2 text-red-600 text-[0.6rem]
          ${props.error ? '' : 'hidden'}`} >
                {props.error ?? 'error'}
            </small>
        </div>
    )
}

export function SubmitPrimaryInput(props: InputProps) {
    return (
        <input
            type="submit"
            value="Submit"
            {...props}
            className={`p-2 rounded-md cursor-pointer hover:bg-gray-900 transition-all
          ${props.disabled ? 'bg-gray-900 text-gray-400' : 'bg-black text-white'}
          ${props.className}`}
        />
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