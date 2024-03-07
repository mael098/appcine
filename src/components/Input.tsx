import { InputHTMLAttributes } from 'react'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
}

export function Input(props: InputProps) {
    return (
        <input {...props} className="p-2 rounded-md shadow-gray-950 shadow-inner focus:outline-none focus:outline-emerald-700 focus:shadow-none" />
    )
}

export function SubmitInput(props: InputProps) {
    return (
        <input {...props} className="bg-lime-500 p-2 rounded-md hover:bg-lime-700" />
    )
}