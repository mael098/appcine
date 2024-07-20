'use client'
import { Role } from '@prisma/client'

export interface SystemNavLikeRoleAtion {
    (role: string): Promise<void>
}
export interface SystemNavLikeRoleProps {
    action: SystemNavLikeRoleAtion
    current: Role
    roles: Role[]
}
export function SystemNavLikeRole(prop: SystemNavLikeRoleProps) {
    return (
        <form action={e => prop.action(e.get('role') as string)}>
            <select
                name="role"
                className="bg-white border border-gray-300 p-2 rounded"
                onChange={e => e.currentTarget.form?.submit()}
            >
                {prop.roles.map((role, i) => (
                    <option key={i} value={role} selected={role === prop.current} >{role}</option>
                ))}
            </select>
        </form>
    )
}