import { useState } from "react";
import { NILAI_AWAL, validasiForm } from "../lib/validasi";
import styles from "./FormTambahMenu.module.css";

export default function FormTambahMenu({ kategori, onTambahMenu }) {
  const [form, setForm] = useState(NILAI_AWAL);
  const [errors, setErrors] = useState({});
  const [pesan, setPesan] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
    setPesan("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const err = validasiForm(form, kategori);
    setErrors(err);
    setPesan("");

    if (Object.keys(err).length > 0) return;

    const baru = {
      nama: form.nama.trim(),
      kategori: form.kategori,
      harga: Number(form.harga),
      stok: Number(form.stok),
    };

    onTambahMenu(baru);
    setForm(NILAI_AWAL);
    setPesan(`Menu ${baru.nama} berhasil ditambahkan.`);
  };

  return (
    <section className={styles.panel} aria-labelledby="judul-form">
      <h2 id="judul-form">Tambah menu</h2>

      <form className={styles.form} onSubmit={handleSubmit} noValidate>
        <div>
          <label className={styles.label} htmlFor="nama-menu">
            Nama menu
          </label>

          <input
            id="nama-menu"
            name="nama"
            type="text"
            value={form.nama}
            onChange={handleChange}
            aria-invalid={Boolean(errors.nama)}
            aria-describedby={errors.nama ? "error-nama" : undefined}
          />

          {errors.nama && (
            <p id="error-nama" className={styles.error} role="alert">
              {errors.nama}
            </p>
          )}
        </div>

        <div>
          <label className={styles.label} htmlFor="kategori-menu">
            Kategori
          </label>

          <select
            id="kategori-menu"
            name="kategori"
            value={form.kategori}
            onChange={handleChange}
            aria-invalid={Boolean(errors.kategori)}
            aria-describedby={errors.kategori ? "error-kategori" : undefined}
          >
            <option value="">Pilih kategori</option>

            {kategori.map((nama) => (
              <option key={nama} value={nama}>
                {nama}
              </option>
            ))}
          </select>

          {errors.kategori && (
            <p id="error-kategori" className={styles.error} role="alert">
              {errors.kategori}
            </p>
          )}
        </div>

        <div>
          <label className={styles.label} htmlFor="harga-menu">
            Harga (Rp)
          </label>

          <input
            id="harga-menu"
            name="harga"
            type="number"
            min="0"
            step="any"
            value={form.harga}
            onChange={handleChange}
            aria-invalid={Boolean(errors.harga)}
            aria-describedby={errors.harga ? "error-harga" : undefined}
          />

          {errors.harga && (
            <p id="error-harga" className={styles.error} role="alert">
              {errors.harga}
            </p>
          )}
        </div>

        <div>
          <label className={styles.label} htmlFor="stok-menu">
            Stok
          </label>

          <input
            id="stok-menu"
            name="stok"
            type="number"
            min="0"
            step="1"
            value={form.stok}
            onChange={handleChange}
            aria-invalid={Boolean(errors.stok)}
            aria-describedby={errors.stok ? "error-stok" : undefined}
          />

          {errors.stok && (
            <p id="error-stok" className={styles.error} role="alert">
              {errors.stok}
            </p>
          )}
        </div>

        <button type="submit" className={styles.primary}>
          Simpan menu
        </button>

        {pesan && (
          <p className={styles.success} role="status">
            {pesan}
          </p>
        )}
      </form>
    </section>
  );
}