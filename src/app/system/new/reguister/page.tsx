export default function reguister() {
    return (
        <main className="h-screen w-screen">
            <div className="absolute h-[auto] p-5 w-[50vh] bg-black bg-opacity-50">
                <form className="h-auto w-50 flex flex-col justify-center items-center gap-7">
                    <h1 className='text-3xl text-slate-50 font-bold'>reguistar</h1>
                    <input type="text" placeholder="Nombre" />
                    <input type="number" placeholder="Precio Adulto"/>
                    <input type="number" placeholder="Presio niños"/>
                    <textarea placeholder="descripcion de la sala"></textarea>
                    <input type="submit" value={'dar de alta'}></input>
                </form>
            </div>

        </main>
    )

}