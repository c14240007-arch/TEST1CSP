import { useRef } from "react";
import styles from "./FilterBar.module.css";

export default function FilterBar({
  keyword,
  onKeywordChange,
  kategoriAktif,
  onKategoriChange,
  kategori,
  daftarMenu,
}) {
  const inputRef = useRef(null);

  const bersihkan = () => {
    onKeywordChange("");
    inputRef.current.focus();
  };

  return (
    <div className={styles.filterBar}>
      <label htmlFor="pencarian" className={styles.label}>
        Cari menu
      </label>

      <div className={styles.searchRow}>
        <input
          id="pencarian"
          type="search"
          ref={inputRef}
          value={keyword}
          onChange={(e) => onKeywordChange(e.target.value)}
          placeholder="Ketik nama menu"
        />

        <button type="button" onClick={bersihkan}>
          Bersihkan
        </button>
      </div>

      <div
        className={styles.filters}
        role="group"
        aria-label="Filter kategori"
      >
        <button
          type="button"
          aria-pressed={kategoriAktif === "semua"}
          className={kategoriAktif === "semua" ? styles.filterActive : ""}
          onClick={() => onKategoriChange("semua")}
        >
          Semua ({daftarMenu.length})
        </button>

        {kategori.map((nama) => {
          const jumlah = daftarMenu.filter(
            (menu) => menu.kategori === nama
          ).length;

          return (
            <button
              key={nama}
              type="button"
              aria-pressed={kategoriAktif === nama}
              className={kategoriAktif === nama ? styles.filterActive : ""}
              onClick={() => onKategoriChange(nama)}
            >
              {nama} ({jumlah})
            </button>
          );
        })}
      </div>
    </div>
  );
}