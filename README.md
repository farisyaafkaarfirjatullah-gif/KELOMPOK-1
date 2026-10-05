# Portofolio KELOMPOK 1

Situs portofolio sederhana untuk memperkenalkan anggota kelompok, menampilkan dokumentasi, dan menyediakan interaksi kecil untuk pengunjung.

## Isi Proyek

- `index.html`: halaman utama.
- `list nama.html`: daftar kartu anggota yang ditampilkan di halaman utama.
- `style.css`: tampilan dan tata letak.
- `script.js`: interaksi pencarian, misi, pemutar musik, pemilihan anggota, dan tema.
- `data.json`: data pendamping kelompok dan misi.
- File gambar dan ikon berada di folder utama yang sama.

Proyek ini berupa website statis dan belum memiliki backend atau API.

## Fungsi Interaktif

- **Pencarian anggota** menyaring daftar nama saat teks diketik.
- **Tantangan misi** memilih instruksi secara acak dan menjalankan hitung mundur selama 60 detik.
- **Kartu anggota** ditampilkan sebagai daftar informatif tanpa fungsi pemilihan.
- **Animasi kartu** menampilkan kartu saat masuk ke area pandang.
- **Dokumentasi pertemuan** menampilkan foto dalam slider dengan tombol, indikator, dan keyboard.
- **Instagram kelompok** menampilkan 11 profil. Nama, peran, dan username diatur pada array `instagramProfiles` di `script.js`; isi `username` tanpa `@`. Profil tanpa username tidak membuat tautan palsu.

## Mengganti Foto Dokumentasi

Simpan foto di folder utama, lalu ubah nilai `src` pada gambar pertemuan terkait di `index.html`:

```html
<img class="meeting-photo" src="FOTO_PERTEMUAN_01.jpg" alt="Kegiatan Kelompok 1 pada Pertemuan 01">
```

Untuk pertemuan baru, duplikasikan elemen `<article class="documentation-slide" data-slide>` dan tambahkan satu tombol indikator dengan `data-slide-index` berikutnya.

## Menjalankan

Buka `index.html` di browser. Semua file frontend dan aset media berada di folder utama proyek.

`data.json` adalah data terstruktur pendamping dan belum dibaca otomatis oleh halaman. Untuk saat ini, konten yang tampil masih ditulis langsung di HTML dan beberapa fungsi masih memiliki data di `script.js`.