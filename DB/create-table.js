require('dotenv').config({ path: '.env.development.local' });
const { sql } = require('@vercel/postgres');

async function execute() {
    try {
        const deleteTable = await sql`DROP TABLE IF EXISTS daftarTamu`; // Drop the table if it exists
        const createTable = await sql`
            CREATE TABLE IF NOT EXISTS daftarTamu (
                id TEXT PRIMARY KEY,
                antrian SERIAL,
                name VARCHAR(50) NOT NULL,
                email VARCHAR(50) NOT NULL,
                no_wa VARCHAR NOT NULL,
                note VARCHAR(800)
            )
        `;
        console.log(createTable);
    } catch (error) {
        console.log(error);
    }
}

execute();
