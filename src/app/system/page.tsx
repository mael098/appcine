import { getSessionUser } from '@/lib/auth'
import { COOKIE, ROLE } from '@/lib/constants'
import { notFound } from 'next/navigation'
import { AdminDashboard } from './AdminDashboard'
import { PromoterDashboard } from './PromoterDashboard'
import { SellerDashboard } from './SellerDashboard'
import { cookies } from 'next/headers'

export default async function Dashboard() {
    const user = await getSessionUser()
    if (!user) return notFound()
    const like = parseInt(cookies().get(COOKIE.ADMIN_LIKE)?.value??'')
    if (like == ROLE.ADMIN) return <AdminDashboard />
    if (like == ROLE.PROMOTER) return <PromoterDashboard />
    if (like == ROLE.TIKETMAN) return <SellerDashboard />
    return notFound()
}