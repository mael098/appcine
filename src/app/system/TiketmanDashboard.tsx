import Link from 'next/link'

export async function TiketmanDashboard() {
    return (
        <div>
            <h1>Tiketman Dashboard</h1>
            <Link href="/system/logout">LogOut</Link>
        </div>
    )
}