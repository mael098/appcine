import { InputHTMLAttributes, TextareaHTMLAttributes } from 'react'

export interface InputProps
    extends InputHTMLAttributes<HTMLInputElement> {
    error?: string
    prefix?: string,
    tooltip?: string
}
export function Input(props: InputProps) {
    const bg = props.className?.match(/(bg-[^ ])/g)?.[0] ?? 'bg-white'
    return (
        <div
            className={`my-2 flex flex-col z-10 ${bg}${props.disabled ? 'border-opacity-50' : ''}
                ${props.className ?? ''}
                ${props.type === 'hidden' ? 'hidden' : ''}
            `} >
            <input
                className={`p-2 w-full bg-transparent border border-black peer z-10
                    ${props.disabled ? 'text-gray-700' : ''}
                    ${props.error ? 'border-red-600' : ''}
                    ${props.prefix ? 'pl-6' : ''}
            `}
                {...props}
                placeholder=" "
            />
            <label
                className={`
                    absolute transition-all ${bg} leading-3 ${props.disabled ? 'text-gray-700' : ''}
                    p-0 ml-1 -translate-y-2 z-10 text-sm
                    peer-placeholder-shown:translate-y-0 peer-placeholder-shown:p-2 peer-placeholder-shown:z-0 peer-placeholder-shown:ml-0 peer-placeholder-shown:text-base
                    ${props.error ? 'text-red-600' : ''}
                `}
            >
                {props.placeholder ?? props.name} {props.tooltip && (
                    <span
                        data-tooltip={props.tooltip}
                        className={`text-gray-400 text-sm
                            data-[tooltip]:hover:after:content-['${props.tooltip}']
                            data-[tooltip]:hover:after:block
                            data-[tooltip]:hover:after:absolute
                            data-[tooltip]:hover:after:border
                            data-[tooltip]:hover:after:bg-gray-600
                            data-[tooltip]:hover:after:p-1
                        `}
                    >
                        (?)
                    </span>
                )}
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
            <style jsx>{`
                [data-tooltip]:hover::after {
                    content: attr(data-tooltip);
                }
            `}</style>
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

export interface TextAreaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
}
export function TextArea(props: TextAreaProps) {
    return (
        <textarea {...props} className={`bg-light-50 p-2 border border-black my-2
        placeholder:text-black placeholder:text-sm`} />
    )
}

export function InsertarImag(props: InputProps) {
    return (
        <input {...props} type="file" className="bg-slate-200 w-60 h-7 valid:text-transparent" accept='.jpg,.png,.wepg' />
    )
}

export interface RadioSwitchInputsProps {
    options: { name: string, value: string }[]
    name?: string
}
export function RadioSwitchInputs(props: RadioSwitchInputsProps) {
    return (
        <div
            className='flex justify-evenly'
        >
            {props.options.map((option, i) => (
                <label
                    key={i}
                    className={`
                        flex-1 text-center bg-white border border-black p-2 cursor-pointer
                        has-[input:checked]:bg-black has-[input:checked]:text-white
                    `}
                >
                    <input type="radio" defaultChecked={!i} name={props.name} className='hidden' value={option.value} />
                    {option.name}
                </label>
            ))}
        </div>
    )
}