import { PrismaClient } from '@prisma/client'
import { mkdir } from 'fs/promises'
import {verbose} from 'sqlite3'
const SQLite3 = verbose()

const sqlite3 = new SQLite3.Database('./scripts/storage.db')
const prisma = new PrismaClient()

sqlite3.run(/* sql */`
    create table if not exists buckets (
        name text ,
        public boolean,
        primary key (name)
    )
`)
// sqlite3.run(`
//     create table if not exists objects (
//         id text,

//     )
// `)

;(async ()=>{
    const buckets = await prisma.buckets.findMany({})
    for (const bucket of buckets) {
        sqlite3.run(`
            insert into buckets 
            values ("${bucket.id}", ${bucket.public})
        `)
    }
    console.log(await prisma.objects.findMany({}))

    mkdir('./scripts/storage', {recursive:true})
})()
