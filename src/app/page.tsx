import { MovieCard } from './MovieCard'
import Nav from './Nav'
import { Database } from '@/lib/supabaseTypes'
import { NEXT_URL } from '@/lib/constants'

export default async function Home() {

    const getMovies = async () => {
        console.log(NEXT_URL+'/api/movies')
        const res = await fetch(NEXT_URL+'/api/movies')
        const data = await res.json()
        return data as Database['public']['Tables']['movies']['Row'][]
    }
    const movies = await getMovies()

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
