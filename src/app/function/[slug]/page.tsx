import Image from 'next/image'
import { Database } from '@/lib/supabaseTypes'
import Nav from '../../Nav'
export default async function salaMovis({params}: {params: {slug: string}}) {
    const getFunctions = async () => {
        const res = await fetch(`${process.env.NEXT_URL}/api/movie/${params.slug}/functions`)
        return await res.json() as Database['public']['Functions']['get_available_functions_by_movie']['Returns']
    }
    const functions = await getFunctions()
    const dubFunctions = functions.filter(f=>(f.format & 1))
    const subFunctions = functions.filter(f=>!(f.format & 1))

    const getMovie = async () => {
        const res = await fetch(`${process.env.NEXT_URL}/api/movie/${params.slug}`)
        return await res.json() as Database['public']['Tables']['movies']['Row']
    }
    const movie = await getMovie()

    return(
        <div className="h-screen w-screen overflow-x-hidden">
            <Nav/>
            <main className="grid grid-cols-5">
                <div className='col-span-3'>
                    <Image src={`/images/covers/${movie.cover}`} alt={`${movie.name} cover`} />
                    <div className='col-span-1 grid grid-cols-4 h-2/5'>
                        <div className='h-full col-span-1 flex flex-col items-center border-r-2 border-zinc-950'>
                            <i className='bg-green-600 p-4 m-2'>B</i>
                            <h2 className='text-nowrap text-2xl font-semibold m-2'>{movie.duration}</h2>
                            <p className='m-2'>director</p>
                            <p className='m-2'>{movie.director}</p>
                        </div>
                        <div className='col-span-3 grid grid-cols-1 items-center'>
                            <h2 className='font-semibold'>{movie.name}</h2>
                            <p className='col-span-1'>{movie.sinopsis}</p>
                        </div>
                    </div>
                </div>
                <div className='col-span-2 flex flex-col items-center m-11'>
                    <h1 className='text-4xl font-semibold'>horarios</h1>
                    <h1 className='text-xl m-6'>SUB</h1>
                    <div className='grid grid-cols-3 gap-8'>
                        {subFunctions.map(f=><input type="time" defaultValue={`${new Date(f.start_at).getHours().toString().padStart(2,'0')}:${new Date(f.start_at).getMinutes().toString().padStart(2,'0')}`} key={f.id}/>)}
                    </div>
                    <h1 className='text-xl m-6'>ESP</h1>
                    <div className='grid grid-cols-3 gap-8'>
                        {dubFunctions.map(f=><input type="time" defaultValue={`${new Date(f.start_at).getHours().toString().padStart(2,'0')}:${new Date(f.start_at).getMinutes().toString().padStart(2,'0')}`} key={f.id}/>)}
                    </div>
                </div>
            </main>
        </div>
    )
}