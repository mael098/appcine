import { MovieCard } from './components/MovieCard'
import Nav from './components/Nav'

export default function Home() {

    return (
        <div className="h-screen w-screen overflow-x-hidden">
            <Nav></Nav>
            <main className="grid grid-cols-4 grid-rows gap-8">
                {Array(13).fill(0).map((_,i)=> (
                    <MovieCard key={i}/>
                ))}
            </main>
        </div>
    )
}
