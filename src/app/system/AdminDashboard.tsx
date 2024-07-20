import Link from 'next/link'
import { SystemNav } from '@/components/SystemNav'
import { Role } from '@prisma/client'

export interface AdminDashboardProps {
    roles: Role[]
}
export async function AdminDashboard(prop: AdminDashboardProps) {
    return (
        <>
            <SystemNav
                options={[
                    { name: 'Dashboard', link: '/system' },
                ]}
                current={Role.ADMIN}
                roles={prop.roles}
            />
            <h1>Admin Dashboard</h1>
        </>
    )
}