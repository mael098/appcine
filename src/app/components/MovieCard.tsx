import Image from 'next/image'

export function MovieCard() {
    return (
        <div className="flex flex-col items-center justify-center text-center">
            <Image src='/image.jpeg' width={150} height={150} alt="Picture of the author" />
            <h2 className='text-black text-2xl font-extrabold text-center'>Harry Potter:
            La Piedra Filosofal</h2>
        </div>
    )
}