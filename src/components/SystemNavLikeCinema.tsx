'use client'
import { COOKIE } from '@/lib/constants'
import { cinemas } from '@prisma/client'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { useCookies } from 'react-cookie'

export interface GetCinemaAction {
    (): Promise<cinemas[]>
}
export interface SystemNavLikeCinemaProps {
    // recibe la server action
    getCinemas: GetCinemaAction
}
export function SystemNavLikeCinema({getCinemas}: SystemNavLikeCinemaProps) {
    const router = useRouter()
    const [cookies, setCookie] = useCookies()

    // se inicializa sin informacion
    const [cinemas, setCinemas] = useState<cinemas[]>([])

    useEffect(() => {
        const exec = async () => {
            // despues del renderizado obtiene la informacion del servidor
            setCinemas(await getCinemas())
        }
        exec()
    }, [getCinemas])

    return (
        <form>
            <select
                name="cinema"
                className="bg-white border border-gray-300 p-2 rounded"
                onChange={e => {
                    setCookie(COOKIE.CINEMA_ID, e.currentTarget.value)
                    router.refresh()
                }}
                defaultValue={cookies[COOKIE.CINEMA_ID]}
            >
                {cinemas.map((cinema) => (
                    <option key={cinema.id} value={cinema.id} >{cinema.name}</option>
                ))}
            </select>
        </form>
    )
}