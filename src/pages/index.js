import Link from "next/link";

export default function Home() {

  const handleAdd = (event) => {
    event.preventDefault();
    const name = event.target.name.value;
    const email = event.target.email.value;
    const no_wa = event.target.no_wa.value;
    const note = event.target.note.value;
    
    fetch('/api/insertData', {
      method:"POST",
      headers:{"Content-Type":"application/json"},
      body: JSON.stringify({
        name:name,
        email:email,
        no_wa:no_wa,
        note:note
      }),
    })
    .then((res) => res.json())
    .then((data) => {
      alert(data.message);
    })
    .catch((e) => {
      alert("hubungi saya", e.message);
    })
  }
  return (
    <div style={{ fontFamily:"monospace", marginTop:"30px" }}>
       <div className="text-right">
            <Link href={`/`} style={{ backgroundColor:"blue", color:"white", padding:"15px",borderRadius:"7px" }}>Buat Antrian</Link>
            {" "}
            <Link href={`/read-data`} style={{ backgroundColor:"blue", color:"white", padding:"15px",borderRadius:"7px" }}>Daftar Antrian</Link>
        </div>

      <h1 style={{ textAlign:"center", fontSize:"27px", fontWeight:"bold" }}>Buku Antrian Tamu</h1>

      <form onSubmit={handleAdd} style={{ display:'flex', flexDirection:"column", margin:"50px 100px", gap:"40px" }} >

          <input style={{ border:"3px solid black", padding:"10px 10px" }} name="name" placeholder="nama" required></input>
          <input style={{ border:"3px solid black", padding:"10px 10px" }} name="email" placeholder="email"  required></input>
          <input style={{ border:"3px solid black", padding:"10px 10px" }} name="no_wa" placeholder="Nomor Whatsapp"  required></input>
          <textarea style={{ border:"3px solid black", padding:"10px 10px" }} name="note" placeholder="Catatan" rows="4" cols="50" ></textarea>

        <button type="sumbit" style={{ backgroundColor:"blue", color:"white", padding:"5px 30px",borderRadius:"7px", fontSize:"20px" }}>Buat Antrian</button>

      </form>
    </div>
  );
}
