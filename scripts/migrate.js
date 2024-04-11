"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const promises_1 = require("fs/promises");
const sqlite3_1 = require("sqlite3");
const SQLite3 = (0, sqlite3_1.verbose)();
const sqlite3 = new SQLite3.Database('./scripts/storage.db');
const prisma = new client_1.PrismaClient();
sqlite3.run(/* sql */ `
    create table if not exists buckets (
        name text ,
        public boolean,

        primary key (name)
    )
`);
(async () => {
    const buckets = await prisma.buckets.findMany({});
    for (const bucket of buckets) {
        sqlite3.run(`
            insert into buckets 
            values ("${bucket.id}", ${bucket.public})
        `);
    }
    console.log(await prisma.objects.findMany({}));
    (0, promises_1.mkdir)('./scripts/storage', { recursive: true });
})();
