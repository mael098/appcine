import { Input, SubmitPrimaryInput, TextArea, InsertarImag } from "@/components/Input";
import { Classification } from "@prisma/client";
import { CLASSIFICATIOS } from '@/lib/constants'
import { useState } from "react";
export interface FormmoviesProps {
    (props: {
        nombre: string,
        duraction: string,
        clasification: Classification,
        sinopsis: string,
        director: string,
        image: string,
        cover: string
    }): Promise<{ status: 'error' | 'usses', message: string }>
}


export default function Formmovies() {
    const [Formmovies, setFordmovie] = useState('')
    const

    return (
        <form action="">
            <Input type="text" placeholder="Nombre de la pelicula" value={FormData.} />
            <Input type="text" placeholder="Duracion" />
            <Input type="text" placeholder="Clasificacion" />
            <TextArea placeholder="Sinopsis" />
            <Input type="text" placeholder="Director" />
            <InsertarImag />
            <SubmitPrimaryInput type="submit" value="Registrar" />
        </form>
    )
}
