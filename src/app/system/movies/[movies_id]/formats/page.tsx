import { prisma } from '@/lib/db';
import { EditFormatsAction, EditFormatsForm } from './EditFormatsForm';
import { onlyRole } from '@/lib/auth';
import { Role } from '@prisma/client';

export default async function EditFormatsPage({ params }: { params: { movie_id: string } }) {
    await onlyRole(Role.PROMOTER);

    const { movie_id } = params;

    const movieFormat = await prisma.movie_formats.findFirst({
        where: { movie_id },
    });

    if (!movieFormat) {
        return <p>No se encontró el formato para esta película</p>;
    }

    const action: EditFormatsAction = async (data) => {
        'use server';

        const format = parseInt(data.get('format') as string);

        if (!format) {
            return {
                status: 'error',
                message: 'El formato es requerido'
            };
        }

        await prisma.movie_formats.update({
            where: { id: movieFormat.id },
            data: { format },
        });

        return {
            status: 'success',
            message: 'Formato actualizado correctamente'
        };
    };

    return (
        <main className='flex flex-col gap-1 justify-center h-full text-center p-20'>
            <h1>Edit Movie Format</h1>
            <EditFormatsForm action={action} initialData={{ format: movieFormat.format }} />
        </main>
    );
}
