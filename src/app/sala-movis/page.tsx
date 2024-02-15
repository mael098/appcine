import Nav from '../components/Nav'
export default function salaMovis() {
    return(
        <div className="h-screen w-screen overflow-x-hidden">
            <Nav/>
            <main className="grid grid-cols-5">
                <div className='col-span-3'>
                    <img src="https://www.tuexpertomovil.com/wp-content/uploads/2021/06/fondos-de-pantalla-para-el-movil-de-harry-potter.jpg" alt="" className='' />
                    <div className='col-span-1 grid grid-cols-4 h-2/5'>
                        <div className='h-full col-span-1 flex flex-col items-center border-r-2 border-zinc-950'>
                            <i className='bg-green-600 p-4 m-2'>B</i>
                            <h2 className='text-nowrap text-2xl font-semibold m-2'>2h 23m</h2>
                            <p className='m-2'>directora</p>
                            <p className='m-2'>j.k. Rowling</p>
                        </div>
                        <div className='col-span-3 grid grid-cols-1 items-center'>
                            <h2 className='font-semibold'>harry potter y la piedra</h2>
                            <p className='col-span-1'>El día de su cumpleaños, Harry Potter descubre que es hijo de dos conocidos hechiceros, de los que ha heredado
                                poderes mágicos. Debe asistir a una famosa escuela de magia y hechicería, donde entabla una amistad con dos jóvenes que se convertirán en sus compañeros de aventura. Durante su primer año
                                en Hogwarts, descubre que un malévolo y poderoso mago llamado Voldemort
                                está en busca de una piedra filosofal que alarga la vida de quien la posee.</p>

                        </div>

                    </div>
                </div>

                <div className='col-span-2 flex flex-col items-center m-11'>
                    <h1 className='text-4xl font-semibold'>horarios</h1>
                    <h1 className='text-xl m-6'>SUB</h1>
                    <div className='grid grid-cols-3 gap-8'>
                        <input type="time" name="" id=""/>
                        <input type="time" name="" id=""/>
                        <input type="time" name="" id=""/>
                    </div>

                    <h1 className='text-xl m-6'>ESP</h1>
                    <div className='grid grid-cols-3 gap-8'>
                        <input type="time" name="" id="" />
                        <input type="time" name="" id="" />
                        <input type="time" name="" id="" />

                    </div>
                </div>
            </main>

        </div>
    )
}