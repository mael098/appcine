import { getAuthenticatedUser, getLikeRole } from '@/lib/auth'
import { COOKIE } from '@/lib/constants'
import { notFound } from 'next/navigation'
import { AdminDashboard } from './AdminDashboard'
import { PromoterDashboard } from './PromoterDashboard'
import { SellerDashboard } from './SellerDashboard'
import { cookies } from 'next/headers'
import { Role } from '@prisma/client'
import { MasterDashboard } from './MasterDashboard'

export default async function Dashboard() {
    const user = await getAuthenticatedUser()
    const like = getLikeRole(user.role, cookies().get(COOKIE.ADMIN_LIKE)?.value ?? '')

    if (like == Role.MASTER) return <MasterDashboard />
    if (like == Role.ADMIN) return <AdminDashboard />
    if (like == Role.PROMOTER) return <PromoterDashboard />
    if (like == Role.SELLER) return <SellerDashboard />
    return notFound()
}