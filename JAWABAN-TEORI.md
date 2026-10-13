=== A1 ===
Kode melanggar aturan hooks karena useState dipanggil dalam condition. React mencocokan state berdasarkan urutan pemanggilan hook pada setiap render. Jika variabel sudahLogin berubah maka urutan pemanggilan dapat berubah dan terjadi error
Perbaikan:
function Profil({ sudahLogin }) {
    const [nama, setNama] = useState("");
    if (!sudahLogin) return <p>SILAHKAN LOGIN<p>
    return {
        <input value={nama} onChange={(event) => setNama(event.target.value)}/>
    };
}

=== A2 ===
items.push(baru) mengubah array secara langsung. setItems(items) memberikan referensi array yang sama dengan state sebelumnya
Perbaikan:
const tambah = (baru) => {
    setItems((prev) => [...prev, baru]);
};

=== A3 ===
Bentuk (a) tanpa dependency array dijalankan setelah setiap render yang di commit. Bentuk (b) dengan [] dijalankan saat komponen dipasang dan tidak diulang. Bentuk (c) dengan [kota] dijalankan saat pemasangan awal dan ketika nilai kota berubah. Cleanup dijalankan sebelum efek dijalankan ulang dan ketika komponen dilepas

=== A4 ===
State keyword sebaiknya disimpan dalam induk sehingga FilterBar dan DaftarMenu menggunakan satu sumber data yang sama. Induk mengirimkan nilai keyword kepada kedua komponen dan callback pembaruan kepada FilterBar. Ketika user mengetik maka FilterBar akan memberi tahu induk melalui callback dengan membawa nilai input baru

=== A5 ===
Controlled component adalah input yang nilai value nya dikendalikan oleh state React. Perubahan input ditangani melalui onChange untuk memperbarui state tersebut. Satu handleChange dapat menangani banyak input karena setiap input memiliki name yang sesuai dengan key objek state dan handler menggunakan [name] untuk memperbarui field yang tepat