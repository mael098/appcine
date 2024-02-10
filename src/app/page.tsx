import { MovieCard } from './components/MovieCard'

export default function Home() {

    return (
        <div className="h-screen w-screen overflow-x-hidden">
            <div className="flex w-screen flex-grow p4 h-12">
                <nav className="flex w-screen flex-grow p-3 bg-lime-500 fixed">
                    <h1 className="text-4xl">N_cine</h1>
                </nav>
            </div>
            <main className="h-5/6 grid grid-cols-4 grid-rows gap-8 m-16">
                {Array(13).fill(0).map((_,i)=> (
                    <MovieCard key={i}/>
                ))}
            </main>
        </div>
    )
}
