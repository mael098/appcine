import Link from 'next/link'

export async function SellerDashboard() {
    return (
        <div>
            <h1>Seller Dashboard</h1>
            <Link href="/system/logout">LogOut</Link>
        </div>
    )
}