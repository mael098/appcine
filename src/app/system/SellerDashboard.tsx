import { SystemNav } from '@/components/SystemNav'
import { Role } from '@prisma/client'
import Link from 'next/link'

export interface SellerDashboardProps {
    roles: Role[]
}
export async function SellerDashboard(prop: SellerDashboardProps) {
    return (
        <>
            <SystemNav
                options={[
                    { name: 'Dashboard', link: '/system' },
                ]}
                current={Role.SELLER}
                roles={prop.roles}
            />
            <h1>Seller Dashboard</h1>
        </>
    )
}