import { Input, TextArea, SubmitInput, InsertarImag } from '@/components/Input'
export default function formPelis() {
    return (
        <main className='h-screen w-screen flex justify-center items-center'>

            <div className="absolute h-[auto] p-5 w-[50vh] bg-black bg-opacity-50">
                <form className="h-auto w-50 flex flex-col justify-center items-center gap-7">
                    <h1 className='text-3xl text-slate-50 font-bold'>Registrar Sala</h1>
                    <Input type="text" placeholder="Nombre de la pelicula" />
                    <Input type="text" placeholder="clasificasion" />
                    <Input type="text" placeholder="director" />
                    <InsertarImag />
                    <SubmitInput value={'dar de alta'}></SubmitInput>
                </form>
            </div>

        </main>
    )

}

