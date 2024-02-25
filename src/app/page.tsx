import { MovieCard } from './MovieCard'
import Nav from './Nav'
import { prisma } from '@/lib/db'

export default async function Home() {

    const movies = await prisma
        .movies
        .findMany({
            where: {
                movie_formats: {
                    some: {
                        functions: {
                            some: {
                                start_at: {
                                    gte: new Date()
                                }
                            }
                        }
                    }
                }
            }
        })
    return (
        <div className="h-screen w-screen overflow-x-hidden">
            <Nav />
            <main className="grid grid-cols-4 grid-rows gap-8">
                {movies.map(({ name, id, image }) => (
                    <MovieCard id={id} name={name} image={image} key={id} />
                ))}
            </main>
        </div>
    )
}
