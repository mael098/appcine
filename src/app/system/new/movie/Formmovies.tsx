'use client'
import { Input, SubmitPrimaryInput, TextArea, InsertarImag, RadioSwitchInputs } from "@/components/Input";
import { Classification } from "@prisma/client";
import { CLASSIFICATIONS } from '@/lib/constants'

export interface FormMoviesAction {
    (props: FormData): Promise<{ status: 'error' | 'succes', message: string }>
}
export interface FormmoviesProps {
    action: FormMoviesAction
}
export function FormMovies({ action }: FormmoviesProps) {

    return (
        <form
            action={async formData => {
                const request = await action(formData)
            }}
            className="flex flex-col gap-2"
        >
            <Input name="name" type="text" placeholder="Nombre de la pelicula" required />
            <Input name="duration" type="text" placeholder="Duracion" required />
            <RadioSwitchInputs
                required
                name="clasification"
                options={[{
                    name: CLASSIFICATIONS[Classification.G],
                    vlue: Classification.G
                }, {
                    name: CLASSIFICATIONS[Classification.PG],
                    value: Classification.PG
                }, {
                    name: CLASSIFICATIONS[Classification.PG13],
                    value: Classification.PG13
                }, {
                    name: CLASSIFICATIONS[Classification.R],
                    value: Classification.R
                }, {
                    name: CLASSIFICATIONS[Classification.NC17],
                    value: Classification.NC17
                }]}
            />
            <TextArea name="sinopsis" placeholder="Sinopsis" required />
            <Input name="director" type="text" placeholder="Director" required />
            <InsertarImag name="image" required />
            <InsertarImag name="cover" placeholder="Cover" required />
            <SubmitPrimaryInput value="Registrar" />
        </form>
    )
}
