const { sql } = require("@vercel/postgres");
const { v4: uuidv4 } = require("uuid");

async function insertData(req, res) {
    try {
        if (req.method !== "POST") {
            return res.status(405).json({ message: "Method tidak diperbolehkan" });
        }

        const { name, email, no_wa, note } = req.body;

        if (!name) {
            return res.status(400).json({ message: "Nama tidak boleh kosong" });
        }

        if (!email || !email.endsWith("@gmail.com")) {
            return res.status(400).json({ message: "Alamat email harus berakhir dengan '@gmail.com'" });
        }

        if (!no_wa) {
            return res.status(400).json({ message: "Nomor WA tidak boleh kosng" });
        }

        if (!no_wa || !no_wa.startsWith("+62")) {
            return res.status(400).json({ message: "Harus ada +62" });
        }

        if (no_wa.length >= 13) {
            return res.status(400).json({ message: "Maksimal 10" });
        }

        console.log(no_wa.length)

        const id = uuidv4();
        
        const rows = await sql` INSERT INTO daftarTamu (id,name, email, no_wa, note)
          VALUES (${id},${name},${email},${no_wa},${note})`

        res.status(200).json({ message: "Success", data: rows });
    } catch (e) {
        console.log("ADA ERROR ", e);
        return res.status(500).json({ message: "Terjadi error" });
    }
}

export default insertData;
