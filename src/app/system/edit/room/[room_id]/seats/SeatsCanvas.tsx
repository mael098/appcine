'use client'

import { LoadingSpin } from '@/components/LoadingSpin'
import { room, SeatGroup, seats } from '@prisma/client'
import { Prisma } from 'prisma/prisma-client'
import { useEffect, useOptimistic, useRef, useState } from 'react'
import { isPointColision } from './utils'
import logo from './logo.png'

export interface CreateSeatGroupAction {
    (): Promise<SeatGroup & { seats: seats[] }>
}
export interface SeatsCanvasProps {
    room: Prisma.roomGetPayload<{
        include: {
            SeatGroup: {
                include: {
                    seats: true
                }
            }
        }
    }>
    createSeatGroup: CreateSeatGroupAction
}
export function SeatsCanvas({
    room,
    createSeatGroup
}: SeatsCanvasProps) {
    const [groups, setGroups] = useOptimistic<(Prisma.SeatGroupGetPayload<{
        include: {
            seats: true
        }
    }> & {
        layer: number
    })[]>(room.SeatGroup.map((group, i) => ({
            ...group,
            layer: i,
        })))
    const [loadingCreateSeatGroup, setLoadingCreateSeatGroup] = useState(false)
    const [selected, setSelected] = useState('')
    const [measures, setMeasures] = useState({
        CW: 0,
        CH: 0,
    })
    const [points, setPoints] = useState({
        tl: {
            x: 0,
            y: 0
        },
        tr: {
            x: 0,
            y: 0
        },
        bl: {
            x: 0,
            y: 0
        },
        br: {
            x: 0,
            y: 0
        },
        t: {
            x: 0,
            y: 0
        },
        b: {
            x: 0,
            y: 0
        },
        l: {
            x: 0,
            y: 0
        },
        r: {
            x: 0,
            y: 0
        },
        c: {
            x: 0,
            y: 0
        }
    })
    const [scale, setScale] = useState(1)
    const [image, setImage] = useState<ImageBitmap | null>(null)

    const ref = useRef<HTMLCanvasElement>(null)

    const isLandscape = room.width < room.length

    useEffect(() => {
        // caprute body on mouse down
        const canvas = ref.current
        const parent = canvas?.parentElement
        const onMouseDown = (e: MouseEvent) => {
            // const x = e.offsetX
            // const y = e.offsetY
            // console.log(x, y)
        }
        const onMouseUp = (e: MouseEvent) => {
            // const x = e.offsetX
            // const y = e.offsetY
            // console.log(x, y)
        }
        const onMouseMove = (e: MouseEvent) => {
            // const x = e.offsetX
            // const y = e.offsetY
            // console.log(x, y)
        }
        const onClick = (e: MouseEvent) => {
            const x = e.offsetX
            const y = e.offsetY

            // check if click on seat group
            // ctx.fillRect(
            //     points.tl.x + g.x*scale,
            //     points.tl.y + g.y*scale,
            //     scale*g.seats.length,
            //     scale
            // )
            const selected = groups
                .sort((a,b) => a.layer - b.layer)
                .find(g => isLandscape
                    ? isPointColision({ x, y }, {
                        x: points.bl.x + g.y*scale,
                        y: points.bl.y - g.x*scale,
                        w: scale,
                        h: -scale*g.seats.length
                    })
                    : isPointColision({ x, y }, {
                        x: points.tl.x + g.x*scale,
                        y: points.tl.y + g.y*scale,
                        w: scale*g.seats.length,
                        h: scale
                    })
                )
            setSelected(selected?.id || '')
        }
        canvas?.addEventListener('mousedown', onMouseDown)
        canvas?.addEventListener('mousemove', onMouseMove)
        canvas?.addEventListener('mouseup', onMouseUp)
        canvas?.addEventListener('click', onClick)
        return () => {
            canvas?.removeEventListener('mousedown', onMouseDown)
            canvas?.removeEventListener('mousemove', onMouseMove)
            canvas?.removeEventListener('mouseup', onMouseUp)
            canvas?.removeEventListener('click', onClick)
        }
    }, [groups, isLandscape, ref, points, scale])

    useEffect(() => {
        const c = ref.current
        if (c) {
            const CW = c.parentElement!.clientWidth
            const CH = c.parentElement!.clientHeight

            c.width = CW
            c.height = CH

            const tempw = isLandscape ? room.length : room.width
            const temph = isLandscape ? room.width : room.length
            const SCALE = temph * (CW / tempw) > CH ? CH / temph : CW / tempw
            setScale(SCALE)

            const RW = tempw*SCALE
            const RH = temph*SCALE

            setPoints({
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
            })
        }

    }, [isLandscape, room])

    // load image blob from public logo.png
    useEffect(() => {
        (async ()=> {
            const img = logo
            const bl = await fetch(img.src).then(r => r.blob())
            setImage(await createImageBitmap(bl))
        })()
    }, [])

    useEffect(() => {
        const c = ref.current
        const ctx = c?.getContext('2d')
        if (c && ctx && scale && points && image) {
            const CW = c.parentElement!.clientWidth
            const CH = c.parentElement!.clientHeight

            c.width = CW
            c.height = CH

            const tempw = isLandscape ? room.length : room.width
            const temph = isLandscape ? room.width : room.length

            const RW = tempw*scale
            const RH = temph*scale

            const SCREEN_WIDTH = 20

            ctx.fillStyle = 'white'
            ctx.fillRect(points.tl.x, points.tl.y, RW, RH)

            // draw scren
            ctx.fillStyle = 'black'
            if (isLandscape) {
                ctx.fillRect(points.tl.x, points.tl.y, SCREEN_WIDTH, RH)
                ctx.fillStyle = 'white'
                ctx.save()
                ctx.translate(points.l.x+6, points.c.y)
                ctx.rotate(-Math.PI / 2)
                ctx.textAlign = 'center'
                ctx.fillText('SCREEN',  0, 15 / 2)
                ctx.restore()
            } else {
                ctx.fillRect(points.tl.x, points.tl.y, RW, SCREEN_WIDTH)
                ctx.fillStyle = 'white'
                ctx.fillText('SCREEN', points.t.x-ctx.measureText('SCREEN').width/2, points.t.y+13)
            }

            // gide lines
            ctx.strokeStyle = 'gray'
            ctx.lineWidth = 1
            ctx.beginPath()
            ctx.moveTo(points.t.x, points.t.y)
            ctx.lineTo(points.b.x, points.b.y)
            ctx.moveTo(points.l.x, points.l.y)
            ctx.lineTo(points.r.x, points.r.y)
            ctx.stroke()

            // draw seat groups
            for (const g of groups) {
                if (g.id === selected) {
                    ctx.fillStyle = 'red'
                } else {
                    ctx.fillStyle = 'blue'
                }
                ctx.strokeStyle = 'black'
                if (isLandscape) {
                    ctx.fillRect(
                        points.bl.x + g.y*scale,
                        points.bl.y - g.x*scale,
                        scale,
                        -scale*g.seats.length
                    )
                    ctx.strokeRect(
                        points.bl.x + g.y*scale,
                        points.bl.y - g.x*scale,
                        scale,
                        -scale*g.seats.length
                    )
                    ctx.fillStyle = 'white'
                    ctx.textBaseline = 'bottom'
                    ctx.fillText('Seat', points.bl.x + g.y*scale, points.bl.y - g.x*scale - 10)
                    ctx.fillText('Group', points.bl.x + g.y*scale, points.bl.y - g.x*scale)
                } else {
                    ctx.fillRect(
                        points.tl.x + g.x*scale,
                        points.tl.y + g.y*scale,
                        scale*g.seats.length,
                        scale
                    )
                    ctx.strokeRect(
                        points.tl.x + g.x*scale,
                        points.tl.y + g.y*scale,
                        scale*g.seats.length,
                        scale
                    )
                    ctx.fillStyle = 'white'
                    ctx.textBaseline = 'top'
                    ctx.fillText('Seat Group', points.tl.x + g.x*scale, points.tl.y + g.y*scale)
                }
            }
            // draw image in a center of canvas
            ctx.drawImage(image, points.c.x, points.c.y)
        }
    }, [ref, isLandscape, groups, room, selected, points, scale, image])

    return (
        <main className='flex-1 flex'>
            <div className='hidden'>
            </div>
            <div className='p-2 bg-[#3BCC52] bg-opacity-50' >
                <button
                    className={`w-10 p-1 rounded-md border border-black transition-all
                        hover:bg-white
                    `}
                    onClick={async () => {
                        setLoadingCreateSeatGroup(true)
                        const result = await createSeatGroup()
                        const lastLayer = Math.max(...groups.map(g => g.layer), 0)
                        setGroups([...groups, {...result, layer: lastLayer + 1}])
                        setLoadingCreateSeatGroup(false)
                    }}
                    disabled={loadingCreateSeatGroup}
                >
                    {
                        loadingCreateSeatGroup
                            ? <LoadingSpin className='h-7' />
                            : <svg fill="#000000" viewBox="0 0 512 512">
                                <path d="M494.908,204.587h-34.628l-5.53-88.533c-1.681-26.914-24.124-48-51.098-48h-74.01c-26.59,0-49.015,20.77-51.046,47.292,c-2.167,28.254-4.992,65.297-6.75,89.242h-24.9l-5.53-88.533c-1.681-26.914-24.124-48-51.098-48h-74.01,c-26.59,0-49.015,20.77-51.046,47.292c-2.167,28.254-4.992,65.297-6.75,89.242H17.092C7.663,204.587,0,212.25,0,221.679v17.015,c0,6.298,3.456,11.742,8.533,14.711v45.047c0,14.114,11.486,25.6,25.6,25.6h8.533v8.533c0,15.855,10.923,29.107,25.6,32.922,v52.412c0,14.114,11.486,25.6,25.6,25.6s25.6-11.486,25.6-25.6v-51.2h68.267v51.627c0,14.114,11.486,25.6,25.6,25.6,c14.114,0,25.6-11.486,25.6-25.6V366.72H256h17.067v51.627c0,14.114,11.486,25.6,25.6,25.6s25.6-11.486,25.6-25.6V366.72h68.267,v51.2c0,14.114,11.486,25.6,25.6,25.6s25.6-11.486,25.6-25.6v-52.412c14.677-3.814,25.6-17.067,25.6-32.922v-8.533h8.533,c14.114,0,25.6-11.486,25.6-25.6v-45.047c5.077-2.97,8.533-8.414,8.533-14.711v-17.015,C512,212.25,504.337,204.587,494.908,204.587z M310.622,144.205l1.109-14.558c1.178-15.394,14.217-27.46,29.687-27.46h50.296,c15.684,0,28.732,12.262,29.713,27.913l0.887,14.225c0.29,4.702-3.285,8.755-7.979,9.054c-0.188,0.009-0.367,0.009-0.546,0.009,c-4.471,0-8.226-3.473-8.508-7.996l-0.888-14.225c-0.418-6.682-5.99-11.913-12.68-11.913h-50.296,c-6.605,0-12.169,5.137-12.672,11.699l-1.101,14.541c-0.367,4.693-4.446,8.209-9.156,7.868,C313.788,153.003,310.263,148.907,310.622,144.205z M230.426,221.653h8.508h40.849l1.818,0.026l-0.026,17.041l-51.174-0.026,L230.426,221.653z M97.289,144.205l1.109-14.558c1.178-15.394,14.216-27.46,29.687-27.46h50.295,c15.684,0,28.732,12.262,29.713,27.913l0.887,14.225c0.29,4.702-3.285,8.755-7.979,9.054c-0.188,0.009-0.367,0.009-0.546,0.009,c-4.471,0-8.226-3.473-8.508-7.996l-0.887-14.225c-0.418-6.682-5.99-11.913-12.681-11.913h-50.295,c-6.605,0-12.169,5.137-12.672,11.699l-1.101,14.541c-0.367,4.693-4.437,8.209-9.156,7.868,C100.454,153.003,96.93,148.907,97.289,144.205z M17.092,221.653h49.357l1.818,0.026l-0.026,17.041l-51.174-0.026L17.092,221.653zM51.2,306.987H34.133c-4.702,0-8.533-3.831-8.533-8.533v-42.667h34.133v34.133v8.533C59.733,303.155,55.902,306.987,51.2,306.987,z M247.467,349.653H230.4h-34.133h-85.333H76.8c-9.412,0-17.067-7.654-17.067-17.067v-9.992c0.29-0.102,0.546-0.256,0.828-0.367,c0.478-0.188,0.93-0.401,1.391-0.623c0.947-0.444,1.86-0.939,2.748-1.493c0.418-0.256,0.836-0.512,1.237-0.794,c1.007-0.717,1.963-1.502,2.859-2.355c0.188-0.179,0.401-0.333,0.58-0.512c1.05-1.058,1.988-2.219,2.842-3.439,c0.23-0.341,0.427-0.717,0.649-1.067c0.58-0.93,1.109-1.886,1.57-2.893c0.213-0.469,0.401-0.939,0.589-1.425,c0.393-0.998,0.7-2.022,0.956-3.072c0.119-0.469,0.256-0.922,0.341-1.399c0.29-1.527,0.478-3.089,0.478-4.702h145.067,c0,14.114,11.486,25.6,25.6,25.6V349.653z M247.467,306.987c-4.702,0-8.533-3.831-8.533-8.533v-8.533v-34.133h34.133v34.133v8.533,c0,4.702-3.831,8.533-8.533,8.533H256H247.467z M452.267,332.587c0,9.412-7.654,17.067-17.067,17.067h-34.133h-85.333H281.6,h-17.067v-25.6c14.114,0,25.6-11.486,25.6-25.6H435.2c0,1.613,0.188,3.174,0.478,4.702c0.085,0.478,0.222,0.93,0.333,1.399,c0.265,1.05,0.58,2.082,0.964,3.081c0.188,0.478,0.375,0.947,0.589,1.417c0.461,1.007,0.99,1.963,1.57,2.893,c0.222,0.35,0.418,0.725,0.649,1.067c0.853,1.22,1.792,2.381,2.842,3.439c0.179,0.179,0.393,0.333,0.58,0.512,c0.896,0.853,1.852,1.638,2.859,2.355c0.401,0.282,0.819,0.538,1.237,0.794c0.887,0.555,1.801,1.05,2.756,1.502,c0.452,0.213,0.905,0.427,1.382,0.606c0.282,0.119,0.538,0.273,0.828,0.375V332.587z M486.4,298.453,c0,4.702-3.831,8.533-8.533,8.533H460.8c-4.702,0-8.533-3.831-8.533-8.533v-8.533v-34.133H486.4V298.453z M494.908,238.72,l-51.174-0.026l0.026-17.041l51.174,0.026L494.908,238.72z"/>
                            </svg>
                    }
                </button>
            </div>
            <div className='flex-1 overflow-hidden'>
                <canvas
                    width={5}
                    height={5}
                    ref={ref}
                />
            </div>
        </main>
    )
}