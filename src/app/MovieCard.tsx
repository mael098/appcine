import Image from 'next/image'
import Link from 'next/link'

export function MovieCard({name,id, image}: {name: string;id: string; image: string}) {
    return (
        <Link href={`/function/${id}`}>
            <div className="flex flex-col items-center justify-center text-center">
                <Image src={`/images/movies/${image}`} width={150} height={150} alt={`Picture of the ${name}`} />
                <h2 className='text-black text-2xl font-extrabold text-center'>{name}</h2>
            </div>
        </Link>
    )
}