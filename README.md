# Portofolio KELOMPOK 1

Situs portofolio sederhana untuk memperkenalkan anggota kelompok, menampilkan dokumentasi, dan menyediakan interaksi kecil untuk pengunjung.

## Isi Proyek

- `frontend/`: aplikasi web statis, termasuk halaman HTML, CSS, dan JavaScript.
- Root proyek: aset media seperti foto, musik, latar belakang, dan ikon yang dipakai frontend.
- `backend/`: tempat untuk backend jika API atau layanan server ditambahkan. Saat ini proyek belum memiliki backend.
- `docs/`: data pendamping proyek, termasuk `data.json`.
- `README.md`: panduan proyek dan cara menjalankan situs.

## Fungsi Interaktif

- **Pencarian anggota** menyaring daftar nama saat teks diketik.
- **Tantangan misi** memilih instruksi secara acak dan menjalankan hitung mundur selama 60 detik.
- **Pemutar musik** memutar dan mengulang bagian lagu sesuai waktu mulai dan akhir yang diatur pada elemen audio di `index.html`.
- **Kartu anggota** dapat dipilih dengan klik, Enter, atau Spasi. Jumlah pilihan diperbarui dan tombol tersedia untuk mengosongkannya.
- **Animasi kartu** menampilkan kartu saat masuk ke area pandang.

## Menjalankan

Buka `frontend/index.html` di browser. File halaman memakai path relatif untuk mengakses media di root proyek.

`docs/data.json` adalah data terstruktur pendamping dan belum dibaca otomatis oleh halaman. Untuk saat ini, konten yang tampil masih ditulis langsung di HTML dan beberapa fungsi masih memiliki data di `frontend/script.js`.