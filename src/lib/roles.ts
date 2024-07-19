import { Role } from "@prisma/client";

const ROLE_VALUE = {
    [Role.MASTER]: 3,
    [Role.ADMIN]: 2,
    [Role.PROMOTER]: 1,
    [Role.TIKETMAN]: 0
}

export function getLikeRole(base: Role, like: string): Role {
    if ((<string[]>Object.values(Role)).includes(like)) return base
    const likeValue = ROLE_VALUE[like as Role]
    const baseValue = ROLE_VALUE[base]
    if (likeValue <= baseValue) return like as Role
    return base
}