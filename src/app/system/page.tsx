import { getSessionUser } from '@/lib/auth'
import { ROLE } from '@/lib/constants'
import { notFound } from 'next/navigation'
import { AdminDashboard } from './AdminDashboard'
import { PromoterDashboard } from './PromoterDashboard'
import { TiketmanDashboard } from './TiketmanDashboard'

export default async function Dashboard() {
    const user = await getSessionUser()
    if (!user) return notFound()
    if (user.role === ROLE.ADMIN) return <AdminDashboard />
    if (user.role === ROLE.PROMOTER) return <PromoterDashboard />
    if (user.role === ROLE.TIKETMAN) return <TiketmanDashboard />
    return notFound()
}