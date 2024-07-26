import { Input, SubmitPrimaryInput, TextArea, InsertarImag } from "@/components/Input";

export default function Formmovies() {
    return (
        <form action="">
            <Input label="Nombre" type="text" placeholder="Nombre de la pelicula" />
            <Input label="Director" type="text" placeholder="Nombre del director" />
            <Input label="Año" type="number" placeholder="Año de lanzamiento" />
            <Input label="Duración" type="number" placeholder="Duración de la pelicula" />
            <TextArea label="Descripción" placeholder="Descripción de la pelicula" />
            <InsertarImag label="Imagen" />
            <SubmitPrimaryInput value="Guardar" />
        </form>
    )
}
