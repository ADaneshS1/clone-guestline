require('dotenv').config({ path: '.env.development.local' });
const { sql } = require('@vercel/postgres');
const { v4: uuidv4 } = require('uuid'); // Impor generator UUID v4

async function execute() {
    try {
        const uuid = uuidv4(); // Generate a new UUID v4
        const rows = await sql`
            INSERT INTO daftarTamu (id, name, email, no_wa, note)
            VALUES (${uuid}, 'John Doe', 'john@example.com', '1234567890', 'Some note');
        `;
        console.log(rows);
    } catch (error) {
        console.log(error);
    }
}

execute();
