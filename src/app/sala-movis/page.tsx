import Nav from '../components/Nav'
export default function salaMovis() {
    return(
        <div className="h-screen w-screen overflow-x-hidden">
            <Nav/>
            <main className="h-screen grid grid-rows-1 grid-flow-col">
                <div className='row-start-1'>
                    <img src="https://www.tuexpertomovil.com/wp-content/uploads/2021/06/fondos-de-pantalla-para-el-movil-de-harry-potter.jpg" alt="" />
                </div>
                <div className='row-start-2'>
                    <div className='p-4 bg-lime-400'>
                        <i>B</i>
                        <h2>2h 23m</h2>
                        <p>directora</p>
                        <p>j.k. Rowling</p>
                    </div>

                </div>
                <div className='row-start-1 shrink w-full h-full flex flex-col justify-center items-center'>
                    <h1 className='text-3xl'>horarios</h1>
                    <h1 className='text-xl'>SUB</h1>
                    <div className='flex flex-row'>
                        <input type="checkbox" name="" id="" />
                        <input type="checkbox" name="" id="" />
                        <input type="checkbox" name="" id="" />
                    </div>
                    <h1 className='text-xl'>ESP</h1>
                    <div className='flex flex-row'>
                        <input type="checkbox" name="" id="" />
                        <input type="checkbox" name="" id="" />
                        <input type="checkbox" name="" id="" />
                    </div>
                </div>
            </main>

        </div>
    )
}