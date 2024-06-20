import Link from 'next/link'
import {SystemNav} from '@/components/SystemNav'

export async function AdminDashboard() {
    return (
        <div>
            <SystemNav />
            <h1>Admin Dashboard</h1>
            <Link href="/system/logout" className=''>LogOut</Link>
        </div >
    )
}