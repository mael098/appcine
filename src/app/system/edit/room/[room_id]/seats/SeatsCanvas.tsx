'use client'

import { room, seats } from '@prisma/client'
import { useEffect, useRef, useState } from 'react'

export interface SeatsCanvasProps {
    seats: seats[],
    room: room
}
export function SeatsCanvas({room}: SeatsCanvasProps) {
    const ref = useRef<HTMLCanvasElement>(null)
    const [pw, setPw] = useState(0)
    const [ph, setPh] = useState(0)
    const [isLandscape, setIsLandscape] = useState(false)

    useEffect(() => {
        setIsLandscape(
            room.width < room.length
        )
    }, [room])

    console.log(isLandscape)

    useEffect(() => {
        const c = ref.current
        const ctx = c?.getContext('2d')
        if (c && ctx) {
            const CW = c.parentElement!.clientWidth
            const CH = c.parentElement!.clientHeight

            c.width = CW
            c.height = CH

            const tempw = isLandscape ? room.length : room.width
            const temph = isLandscape ? room.width : room.length
            const SCALE = temph * (CW / tempw) > CH ? CH / temph : CW / tempw

            const RW = tempw*SCALE
            const RH = temph*SCALE

            const P = {
                tl: {
                    x: CW/2-(RW)/2,
                    y: CH/2-(RH)/2
                },
                bl: {
                    x: CW/2-(RW)/2,
                    y: CH/2+(RH)/2
                },
                tr: {
                    x: CW/2+(RW)/2,
                    y: CH/2-(RH)/2
                },
                br: {
                    x: CW/2+(RW)/2,
                    y: CH/2+(RH)/2
                },
                t: {
                    x: CW/2,
                    y: CH/2-(RH)/2
                },
                b: {
                    x: CW/2,
                    y: CH/2+(RH)/2
                },
                l: {
                    x: CW/2-(RW)/2,
                    y: CH/2
                },
                r: {
                    x: CW/2+(RW)/2,
                    y: CH/2
                },
                c: {
                    x: CW/2,
                    y: CH/2
                }
            }

            ctx.fillStyle = 'white'
            ctx.fillRect(P.tl.x, P.tl.y, RW, RH)

            // draw scren
            ctx.fillStyle = 'black'
            if (isLandscape) {
                ctx.fillRect(P.tl.x, P.tl.y, 20, RH)
                ctx.fillStyle = 'white'
                ctx.save()
                ctx.translate(P.l.x+6, P.c.y)
                ctx.rotate(-Math.PI / 2)
                ctx.textAlign = 'center'
                ctx.fillText('SCREEN',  0, 15 / 2)
                ctx.restore()
            } else {
                ctx.fillRect(P.tl.x, P.tl.y, RW, 20)
                ctx.fillStyle = 'white'
                ctx.fillText('SCREEN', P.t.x-ctx.measureText('SCREEN').width/2, 13)
            }
        }
    }, [room, ref, isLandscape])

    return (
        <main className='flex-1'>
            <canvas
                width={5}
                height={5}
                ref={ref}
            />
        </main>
    )
}