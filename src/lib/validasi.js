export const NILAI_AWAL = {
  nama: "",
  kategori: "",
  harga: "",
  stok: "",
};

export function validasiForm(form, kategori) {
  const err = {};

  if (form.nama.trim().length < 3) {
    err.nama = "Nama minimal 3 karakter.";
  }

  if (!kategori.includes(form.kategori)) {
    err.kategori = "Kategori wajib dipilih.";
  }

  const harga = Number(form.harga);

  if (
    form.harga.trim() === "" ||
    !Number.isFinite(harga) ||
    harga <= 0
  ) {
    err.harga = "Harga harus lebih dari 0.";
  }

  const stok = Number(form.stok);

  if (
    form.stok.trim() === "" ||
    !Number.isInteger(stok) ||
    stok < 0
  ) {
    err.stok = "Stok wajib diisi dengan bilangan bulat 0 atau lebih.";
  }

  return err;
}