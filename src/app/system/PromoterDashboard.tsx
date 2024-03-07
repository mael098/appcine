import Link from 'next/link'

export async function PromoterDashboard() {
    return (
        <div>
            <h1>Promoter Dashboard</h1>
            <Link href="/system/logout">LogOut</Link>
        </div>
    )
}