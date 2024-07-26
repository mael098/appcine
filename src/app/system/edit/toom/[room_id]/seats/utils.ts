export function isPointColision(point: {x: number, y: number}, area: {x: number, y: number, w: number, h: number}) {
    const left = Math.min(area.x, area.x + area.w)
    const right = Math.max(area.x, area.x + area.w)
    const bottom = Math.min(area.y, area.y + area.h)
    const top = Math.max(area.y, area.y + area.h)

    return (point.x >= left && point.x <= right && point.y >= bottom && point.y <= top)
}