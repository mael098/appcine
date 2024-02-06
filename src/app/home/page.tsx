export default function HomePage() {
    return(
        <div className="w-full h-screen">
            <header className="flex justify-center">
                <ul className="flex flex-grow justify-between p-5 bg-amber-400">
                    <li className="basis-3">Home</li>
                    <li className="basis-3">About</li>
                    <li className="basis-3">Services</li>
                    <li className="basis-3">Contact</li>
                </ul>
            </header>
            <main className="h-screen">
                <div className="flex flex-grow bg-amber-100 h-screen">
                    <aside className="flex-1 basis-56 bg-green-800 p-5">
                        <p>Aside</p>
                    </aside>
                    <main className="flex-1 bg-cyan-500">
                        <p>Main</p>
                    </main>
                </div>
                <div className="">
                    <footer className="bg-lime-600 p-5">
                        <p>Footer</p>
                    </footer>
                </div>
            </main>

        </div>
    )
}