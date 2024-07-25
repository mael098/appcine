'use client'
import { COOKIE } from '@/lib/constants'
import { Role } from '@prisma/client'
import { useRouter } from 'next/navigation'
import { useCookies } from 'react-cookie'

export interface SystemNavLikeRoleProps {
    roles: Role[]
}
export function SystemNavLikeRole(prop: SystemNavLikeRoleProps) {
    const router = useRouter()
    const [cookies, setCookie] = useCookies([COOKIE.ADMIN_LIKE])

    return (
        <form>
            <select
                name="role"
                className="bg-white border border-gray-300 p-2 rounded"
                onChange={e => {
                    setCookie(COOKIE.ADMIN_LIKE, e.currentTarget.value)
                    router.refresh()
                }}
                defaultValue={cookies[COOKIE.ADMIN_LIKE]}
            >
                {prop.roles.map((role, i) => (
                    <option key={i} defaultValue={role} >{role}</option>
                ))}
            </select>
        </form>
    )
}