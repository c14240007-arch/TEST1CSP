import { useState } from "react";
import Badge from "./Badge";
import { rupiah } from "../lib/format";
import styles from "./Keranjang.module.css";

export default function Keranjang({
  items,
  jumlahItem,
  totalHarga,
  onUbahQty,
  onHapus,
}) {
  const [konfirmasiId, setKonfirmasiId] = useState(null);

  const hapus = (id) => {
    onHapus(id);
    setKonfirmasiId(null);
  };

  const kurangi = (item) => {
    onUbahQty(item.id, -1);
    if (item.qty === 1) setKonfirmasiId(null);
  };

  return (
    <section className={styles.panel} aria-labelledby="judul-keranjang">
      <div className={styles.sectionHeading}>
        <h2 id="judul-keranjang">Keranjang</h2>
        <Badge>{jumlahItem} item</Badge>
      </div>

      {items.length === 0 ? (
        <p className={styles.cartEmpty}>Keranjang masih kosong.</p>
      ) : (
        <ul className={styles.cartList}>
          {items.map((item) => (
            <li key={item.id} className={styles.cartItem}>
              <div className={styles.cartItemHeading}>
                <h3>{item.nama}</h3>
                <strong>{rupiah(item.harga * item.qty)}</strong>
              </div>

              <p className={styles.unitPrice}>
                {rupiah(item.harga)} / porsi
              </p>

              <div className={styles.cartActions}>
                <div className={styles.quantity}>
                  <button
                    type="button"
                    aria-label={`Kurangi ${item.nama}`}
                    onClick={() => kurangi(item)}
                  >
                    -
                  </button>

                  <span aria-label={`Jumlah ${item.nama}`}>
                    {item.qty}
                  </span>

                  <button
                    type="button"
                    aria-label={`Tambah jumlah ${item.nama}`}
                    disabled={item.qty >= item.stok}
                    onClick={() => onUbahQty(item.id, 1)}
                  >
                    +
                  </button>
                </div>

                <button
                  type="button"
                  className={styles.danger}
                  aria-label={`Hapus ${item.nama}`}
                  onClick={() => setKonfirmasiId(item.id)}
                >
                  Hapus
                </button>
              </div>

              {konfirmasiId === item.id && (
                <div
                  className={styles.confirm}
                  role="group"
                  aria-label={`Konfirmasi hapus ${item.nama}`}
                >
                  <p>Hapus {item.nama}?</p>

                  <button type="button" onClick={() => hapus(item.id)}>
                    Hapus
                  </button>

                  <button type="button" onClick={() => setKonfirmasiId(null)}>
                    Batal
                  </button>
                </div>
              )}
            </li>
          ))}
        </ul>
      )}

      <div className={styles.total} aria-live="polite">
        <span>Total · {jumlahItem} item</span>
        <strong>{rupiah(totalHarga)}</strong>
      </div>
    </section>
  );
}