import { Input, TextArea, SubmitPrimaryInput, InsertarImag } from '@/components/Input'

export interface FormpelisProps {
    (props: {
        nombre: string,
        clasificacion: string,
        director: string,
        img: string
    }): Promise<{status:'error' | 'succes', message:string}>
}

export interface RegistrodepelisProps {
    submit: FormpelisProps
}

export default function formPelis(props: RegistrodepelisProps) {
    return (
        <main className='h-screen w-screen flex justify-center items-center'>
            <div className="absolute h-[auto] p-5 w-[50vh] bg-black bg-opacity-50">
                <form className="h-auto w-50 flex flex-col justify-center items-center gap-7">
                    <h1 className='text-3xl text-slate-50 font-bold'>Registrar Sala</h1>
                    <Input type="text" placeholder="Nombre de la pelicula" />
                    <Input type="text" placeholder="clasificasion"/>
                    <Input type="text" placeholder="director" />
                    <InsertarImag />
                    <SubmitPrimaryInput value={'dar de alta'}></SubmitPrimaryInput>
                </form>
            </div>

        </main>
    )

}

