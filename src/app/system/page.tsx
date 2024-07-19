import { getSessionUser } from '@/lib/auth'
import { COOKIE } from '@/lib/constants'
import { notFound, redirect } from 'next/navigation'
import { AdminDashboard } from './AdminDashboard'
import { PromoterDashboard } from './PromoterDashboard'
import { SellerDashboard } from './SellerDashboard'
import { cookies } from 'next/headers'
import { getLikeRole } from '@/lib/roles'
import { Role } from '@prisma/client'

export default async function Dashboard() {
    const user = await getSessionUser()

    if (!user) redirect('/system/login')
    const like = getLikeRole(user.role, cookies().get(COOKIE.ADMIN_LIKE)?.value ?? '')

    if (like == Role.MASTER) return <AdminDashboard />
    if (like == Role.ADMIN) return <AdminDashboard />
    if (like == Role.PROMOTER) return <PromoterDashboard />
    if (like == Role.TIKETMAN) return <SellerDashboard />
    return notFound()
}