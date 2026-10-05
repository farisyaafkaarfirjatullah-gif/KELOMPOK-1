# Portofolio KELOMPOK 1

Situs portofolio sederhana untuk memperkenalkan anggota kelompok, menampilkan dokumentasi, dan menyediakan interaksi kecil untuk pengunjung.

## Isi Proyek

- `index.html`: halaman utama.
- `list nama.html`: daftar kartu anggota yang ditampilkan di halaman utama.
- `style.css`: tampilan dan tata letak.
- `script.js`: interaksi pencarian, misi, pemutar musik, pemilihan anggota, dan tema.
- `data.json`: data pendamping kelompok, audio, dan misi.
- File gambar, ikon, serta musik berada di folder utama yang sama.

Proyek ini berupa website statis dan belum memiliki backend atau API.

## Fungsi Interaktif

- **Pencarian anggota** menyaring daftar nama saat teks diketik.
- **Tantangan misi** memilih instruksi secara acak dan menjalankan hitung mundur selama 60 detik.
- **Pemutar musik** memutar dan mengulang bagian lagu sesuai waktu mulai dan akhir yang diatur pada elemen audio di `index.html`.
- **Kartu anggota** ditampilkan sebagai daftar informatif tanpa fungsi pemilihan.
- **Animasi kartu** menampilkan kartu saat masuk ke area pandang.

## Menjalankan

Buka `index.html` di browser. Semua file frontend dan aset media berada di folder utama proyek.

`data.json` adalah data terstruktur pendamping dan belum dibaca otomatis oleh halaman. Untuk saat ini, konten yang tampil masih ditulis langsung di HTML dan beberapa fungsi masih memiliki data di `script.js`.