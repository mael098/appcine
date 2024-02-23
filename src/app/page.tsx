import { MovieCard } from './MovieCard'
import Nav from './Nav'
import db from '@/lib/db'
import { notFound } from 'next/navigation'

export default async function Home() {

    const moviesQuery = await db
        .rpc('get_movie_listings')

    if (moviesQuery.error) {
        console.error(moviesQuery.error)
        return notFound()
    }

    const movies = moviesQuery.data.filter((m, i) => i === moviesQuery.data.findIndex((movie) => movie.id === m.id))

    return (
        <div className="h-screen w-screen overflow-x-hidden">
            <Nav/>
            <main className="grid grid-cols-4 grid-rows gap-8">
                {movies.map(({name, id, image})=> (
                    <MovieCard id={id} name={name} image={image} key={id}/>
                ))}
            </main>
        </div>
    )
}
