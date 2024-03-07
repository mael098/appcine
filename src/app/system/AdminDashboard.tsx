import Link from 'next/link'

export async function AdminDashboard() {
    return (
        <div>
            <h1>Admin Dashboard</h1>
            <Link href="/system/logout">LogOut</Link>
        </div>
    )
}