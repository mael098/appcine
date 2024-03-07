import Image from 'next/image'
import Nav from '../../Nav'
import { prisma } from '@/lib/db'
import { notFound } from 'next/navigation'
import { BitField } from '@/lib/BitField'

export default async function salaMovis({params}: {params: {slug: string}}) {

    const query = await prisma.movies.findUnique({
        where: {
            id: params.slug
        },
        include: {
            movie_formats: {
                where: {
                    functions: {
                        some: {
                            start_at: {
                                gte: new Date()
                            }
                        }
                    }
                },
                select: {
                    format: true,
                    functions: {
                        select: {
                            start_at: true
                        }
                    }
                }
            }
        }
    })
    if (!query) {
        return notFound()
    }

    const dub = query
        .movie_formats
        .filter(f=>(
            new BitField(f.format)
                .has(BitField.Flags.Dub)
        ))
        .flatMap(f=>f.functions)
        .map(f=>f.start_at)
    const sub = query
        .movie_formats
        .filter(f=>(
            !new BitField(f.format)
                .has(BitField.Flags.Dub)
        ))
        .flatMap(f=>f.functions)
        .map(f=>f.start_at)

    return(
        <div className="h-screen w-screen overflow-x-hidden">
            <Nav/>
            <main className="h-full w-full grid grid-cols-5">
                <div className='col-span-3 grid'>
                    <Image src={`/images/covers/${query.cover}`} alt={`${query.name} cover`} width={600} height={100} className='w-auto h-full'/>
                    <div className='col-span-1 grid grid-cols-4 h-2/5'>
                        <div className='h-full w-full col-span-1 flex flex-col items-center border-r-2 border-zinc-950'>
                            <i className='bg-green-600 p-4 m-2'>B</i>
                            <h2 className='text-nowrap text-2xl font-semibold m-2'>{query.duration}</h2>
                            <p className='m-2'>director</p>
                            <p className='m-2'>{query.director}</p>
                        </div>
                        <div className='col-span-3 grid grid-cols-1 items-center'>
                            <h2 className='font-semibold'>{query.name}</h2>
                            <p className='col-span-1'>{query.sinopsis}</p>
                        </div>
                    </div>
                </div>
                <div className='col-span-2 flex flex-col items-center m-11'>
                    <h1 className='text-4xl font-semibold'>horarios</h1>
                    <h1 className='text-xl m-6'>SUB</h1>
                    <div className='grid grid-cols-3 gap-8'>
                        {sub.map((f, i)=>(
                            <input
                                type="time"
                                key={i}
                                defaultValue={`${
                                    f.getHours().toString().padStart(2,'0')
                                }:${
                                    f.getMinutes().toString().padStart(2,'0')
                                }`}
                            />
                        ))}
                    </div>
                    <h1 className='text-xl m-6'>ESP</h1>
                    <div className='grid grid-cols-3 gap-8'>
                        {dub.map((f, i)=>(
                            <input
                                type="time"
                                key={i}
                                defaultValue={`${
                                    f.getHours().toString().padStart(2,'0')
                                }:${
                                    f.getMinutes().toString().padStart(2,'0')
                                }`}
                            />
                        ))}
                    </div>
                </div>
            </main>
        </div>
    )
}