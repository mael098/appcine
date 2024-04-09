import {Input,SubmitInput} from '@/components/Input'

export default async function RoomPage() {
    return (
        <main className="w-screen h-screen flex justify-center items-center">
            <form className="h-auto w-50 flex flex-col justify-center items-center gap-7">
                <h1 className='text-3xl text-slate-50 font-bold'>Registrar Sala</h1>
                <Input type="text" placeholder="Nombre"/>
                <Input type="number" placeholder="Precio Adulto"/>
                <Input type="number" placeholder="Presio Adulto"/>
                <textarea name="descripcion" id="descripcionSala" cols={30} rows={10} placeholder='descripcion de la sala' ></textarea>
                <SubmitInput value={'dar de alta'}></SubmitInput>
            </form>
        </main>

    )

}