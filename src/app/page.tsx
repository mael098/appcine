import { MovieCard } from './MovieCard'
import Nav from './Nav'
import { Database } from '@/lib/supabaseTypes'
import { NEXT_URL } from '@/lib/constants'
import db from '@/lib/db'
import { notFound } from 'next/navigation'

export default async function Home() {

    const moviesQuery = await db
        .rpc('get_movie_listings')

    if (moviesQuery.error) {
        console.error(moviesQuery.error)
        return notFound()
    }

    return (
        <div className="h-screen w-screen overflow-x-hidden">
            <Nav/>
            <main className="grid grid-cols-4 grid-rows gap-8">
                {moviesQuery.data.map(({name, id, image})=> (
                    <MovieCard id={id} name={name} image={image} key={id}/>
                ))}
            </main>
        </div>
    )
}
