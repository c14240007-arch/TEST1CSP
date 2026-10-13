import MenuCard from "./MenuCard";
import styles from "./MenuList.module.css";

export default function MenuList({
  menu,
  keyword,
  kategoriAktif,
  keranjang,
  onTambah,
}) {
  if (menu.length === 0) {
    return (
      <p className={styles.empty} role="status">
        Tidak ada menu untuk kata kunci "{keyword.trim() || "(kosong)"}"
        pada kategori "{kategoriAktif}".
      </p>
    );
  }

  return (
    <div className={styles.menuGrid}>
      {menu.map((item) => {
        const qty = keranjang.find(
          (pesanan) => pesanan.id === item.id
        )?.qty ?? 0;

        return (
          <MenuCard
            key={item.id}
            menu={item}
            qty={qty}
            onTambah={onTambah}
          />
        );
      })}
    </div>
  );
}