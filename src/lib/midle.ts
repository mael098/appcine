'use server'

import { prisma } from './db'

export async function employees() {
    return await prisma.employees.count()
}