import { prisma, snowflake } from '@/lib/db'
import { FormMoviesAction, FormMovies } from './Formmovies'
import { hash } from 'bcrypt'
import { Classification, Role } from '@prisma/client'
import { onlyRole } from '@/lib/auth'
import { supabase } from '@/lib/db'

export default async function NewAdminPage() {
    await onlyRole(Role.PROMOTER)

    const action: FormMoviesAction = async (data) => {
        'use server'

        const name = data.get('name') as string
        const duration = parseInt(data.get('duration') as string)
        const classification = data.get('classification') as Classification
        const sinopsis = data.get('sinopsis') as string
        const director = data.get('director') as string
        const image = data.get('image') as File
        const cover = data.get('cover') as File

        if (!name || !duration || !classification || !sinopsis || !director || !image || !cover) {
            return {
                status: 'error',
                message: 'All fields are required'
            }
        }
        // check if user exists
        const movie = await prisma.movies.findFirst({
            where: {
                name
            }
        })
        if (movie) return {
            status: 'error',
            message: 'Employee already exists'
        }
        const id = snowflake.generate().toString()
        // upload images
        const coverUploaded = await supabase.storage.from('movies').upload(`covers/${id}.png`, cover)
        if (coverUploaded.error) return {
            status: 'error',
            message: 'Error uploading cover'
        }
        const imageUploaded = await supabase.storage.from('movies').upload(`images/${id}.png`, image)
        if (imageUploaded.error) return {
            status: 'error',
            message: 'Error uploading image'
        }
        await prisma.movies.create({
            data: {
                id,
                name,
                duration,
                classification,
                sinopsis,
                director,
                image: id,
                cover: id
            }
        })

        return {
            status: 'succes',
            message: 'Empleado registrado'
        }
    }

    return (
        <main className='flex flex-col gap-1 justify-center h-full text-center p-20' >
            <h1>Welcome to the Greentea System</h1>
            <p>Para continuar se debe registrar al primer empleado el cual tendra como rol Master</p>
            <FormMovies action={action} />
        </main>
    )
}