import Image from 'next/image'

export function MovieCard() {
    return (
        <div className="flex flex-col items-center justify-center">
            <Image src='/image.jpeg' width={150} height={150} alt="Picture of the author" />
            <h2 className='text-black text-2xl font-extrabold'>Popular Movies</h2>
            <p className='text-xl text-slate-900 font-extrabold'>la pieda Filosofal</p>
        </div>
    )
}