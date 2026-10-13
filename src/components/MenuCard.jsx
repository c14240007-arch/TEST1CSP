import Badge from "./Badge";
import { rupiah } from "../lib/format";
import styles from "./MenuCard.module.css";

export default function MenuCard({ menu, qty, onTambah }) {
  const habis = menu.stok === 0;
  const maksimal = qty >= menu.stok;

  const tulisanTombol =
    habis ? "Habis" : maksimal ? "Stok maksimal" : "Tambah";

  return (
    <article className={`${styles.menuCard} ${habis ? styles.habis : ""}`}>
      <div className={styles.cardTop}>
        <span className={styles.category}>{menu.kategori}</span>

        <Badge habis={habis}>
          {habis ? "Habis" : `Stok ${menu.stok}`}
        </Badge>
      </div>

      <h3>{menu.nama}</h3>

      <div className={styles.cardBottom}>
        <strong className={styles.price}>{rupiah(menu.harga)}</strong>

        <button
          type="button"
          className={styles.primary}
          disabled={habis || maksimal}
          aria-label={`Tambah ${menu.nama}`}
          onClick={() => onTambah(menu)}
        >
          {tulisanTombol}
        </button>
      </div>
    </article>
  );
}