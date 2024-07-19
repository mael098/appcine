import { SystemNav } from '@/components/SystemNav'
import { Role } from '@prisma/client'
import Link from 'next/link'

export interface PromoterDashboardProps {
    roles: Role[]
}
export async function PromoterDashboard(prop: PromoterDashboardProps) {
    return (
        <>
            <SystemNav
                options={[
                    { name: 'Dashboard', link: '/system' },
                ]}
                current={Role.PROMOTER}
                roles={prop.roles}
            />
            <h1>Promoter Dashboard</h1>
        </>
    )
}