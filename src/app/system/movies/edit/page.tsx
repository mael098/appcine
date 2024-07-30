'use client'

import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function EditMoviePage() {
    const router = useRouter()
    useEffect(() => {
        const movies = prompt("ingrese el id de la pelicula")
        if (!movies) {
            router.push(`/system/movies/${movieId}/formats`);
        } else {
            alert("no se encontro la pelicula")
        }
    }, [router])
    return (
        <p> Redirigiendo...</p>
    )
}
