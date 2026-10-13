import { useState, useEffect } from "react";
import { semuaMenu } from "./data/menu";
import Badge from "./components/Badge";
import FilterBar from "./components/FilterBar";
import MenuList from "./components/MenuList";
import Keranjang from "./components/Keranjang";
import TimerSesi from "./components/TimerSesi";
import FormTambahMenu from "./components/FormTambahMenu";
import "./App.css";

const KEY_KERANJANG = "kantinkita-keranjang";
const KEY_MENU = "kantinkita-menu-tambahan";

function bacaArray(key) {
  try {
    const hasil = JSON.parse(
      localStorage.getItem(key) ?? "[]"
    );

    return Array.isArray(hasil) ? hasil : [];
  } catch {
    return [];
  }
}

function menuValid(menu) {
  return (
    menu !== null &&
    typeof menu === "object" &&
    (typeof menu.id === "string" || Number.isInteger(menu.id)) &&
    typeof menu.nama === "string" &&
    menu.nama.trim().length >= 3 &&
    typeof menu.kategori === "string" &&
    menu.kategori.length > 0 &&
    Number.isFinite(menu.harga) &&
    menu.harga > 0 &&
    Number.isInteger(menu.stok) &&
    menu.stok >= 0
  );
}

function bacaKeranjang() {
  return bacaArray(KEY_KERANJANG)
    .filter((item) =>
      menuValid(item) &&
      Number.isInteger(item.qty) &&
      item.qty > 0 &&
      item.qty <= item.stok
    )
    .filter((item, posisi, items) =>
      items.findIndex((lain) => lain.id === item.id) === posisi
    );
}

function bacaMenuTambahan() {
  return bacaArray(KEY_MENU)
    .filter((menu) =>
      menuValid(menu) &&
      typeof menu.id === "string" &&
      menu.id.startsWith("menu-")
    )
    .filter((menu, posisi, items) =>
      items.findIndex((lain) => lain.id === menu.id) === posisi
    );
}

export default function App() {
  const [daftarMenu, setDaftarMenu] = useState(() => [
    ...semuaMenu,
    ...bacaMenuTambahan(),
  ]);

  const [keyword, setKeyword] = useState("");
  const [kategoriAktif, setKategoriAktif] = useState("semua");
  const [keranjang, setKeranjang] = useState(bacaKeranjang);
  const [timerTampil, setTimerTampil] = useState(true);
  const [gagalSimpan, setGagalSimpan] = useState(false);

  const kategori = [...new Set(daftarMenu.map((menu) => menu.kategori))];

  const menuTerfilter = daftarMenu.filter((menu) => {
    const cocokNama = menu.nama
      .toLowerCase()
      .includes(keyword.trim().toLowerCase());

    const cocokKategori =
      kategoriAktif === "semua" || menu.kategori === kategoriAktif;

    return cocokNama && cocokKategori;
  });

  const jumlahItem = keranjang.reduce(
    (total, item) => total + item.qty, 0
  );

  const totalHarga = keranjang.reduce(
    (total, item) => total + item.harga * item.qty, 0
  );

  useEffect(() => {
    try {
      localStorage.setItem(KEY_KERANJANG, JSON.stringify(keranjang));

      const tambahan = daftarMenu.filter(
        (menu) => typeof menu.id === "string"
      );

      localStorage.setItem(KEY_MENU, JSON.stringify(tambahan));
      setGagalSimpan(false);
    } catch {
      setGagalSimpan(true);
    }
  }, [keranjang, daftarMenu]);

  useEffect(() => {
    document.title =
      jumlahItem > 0 ? `(${jumlahItem}) KantinKita` : "KantinKita";
  }, [jumlahItem]);

  const tambahKeKeranjang = (menu) => {
    if (menu.stok === 0) return;

    setKeranjang((prev) => {
      const ada = prev.find((item) => item.id === menu.id);

      if (!ada) {
        return [...prev, { ...menu, qty: 1 }];
      }

      return prev.map((item) =>
        item.id === menu.id
          ? { ...item, qty: Math.min(item.qty + 1, item.stok) }
          : item
      );
    });
  };

  const ubahQty = (id, perubahan) => {
    setKeranjang((prev) =>
      prev
        .map((item) =>
          item.id === id
            ? {
                ...item,
                qty: Math.min(item.qty + perubahan, item.stok),
              }
            : item
        )
        .filter((item) => item.qty > 0)
    );
  };

  const hapusItem = (id) => {
    setKeranjang((prev) => prev.filter((item) => item.id !== id));
  };

  const tambahMenu = (form) => {
    const baru = {
      ...form,
      id: `menu-${crypto.randomUUID()}`,
    };

    setDaftarMenu((prev) => [...prev, baru]);
  };

  return (
    <main className="halaman">
      <header className="header">
        <h1>KANTIN KITA</h1>

        <div className="sesi">
          {timerTampil && <TimerSesi />}

          <button
            type="button"
            onClick={() => setTimerTampil((prev) => !prev)}
          >
            {timerTampil ? "Sembunyikan timer" : "Tampilkan timer"}
          </button>
        </div>
      </header>

      {gagalSimpan && (
        <p className="pesanSalah" role="alert">
          Penyimpanan browser tidak tersedia.
        </p>
      )}

      <div className="tataLetak">
        <section aria-labelledby="judul-menu">
          <div className="kepalaMenu">
            <h2 id="judul-menu">Daftar menu</h2>
            <Badge>{daftarMenu.length} menu</Badge>
          </div>

          <FilterBar
            keyword={keyword}
            onKeywordChange={setKeyword}
            kategoriAktif={kategoriAktif}
            onKategoriChange={setKategoriAktif}
            kategori={kategori}
            daftarMenu={daftarMenu}
          />

          <MenuList
            menu={menuTerfilter}
            keyword={keyword}
            kategoriAktif={kategoriAktif}
            keranjang={keranjang}
            onTambah={tambahKeKeranjang}
          />
        </section>

        <Keranjang
          items={keranjang}
          jumlahItem={jumlahItem}
          totalHarga={totalHarga}
          onUbahQty={ubahQty}
          onHapus={hapusItem}
        />

        <FormTambahMenu
          kategori={kategori}
          onTambahMenu={tambahMenu}
        />
      </div>
    </main>
  );
}