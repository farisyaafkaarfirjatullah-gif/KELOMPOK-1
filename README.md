# Portofolio KELOMPOK 1

Situs portofolio sederhana untuk memperkenalkan anggota kelompok, menampilkan dokumentasi, dan menyediakan interaksi kecil untuk pengunjung.

## Isi Proyek

- `index.html`: halaman utama dengan bagian Home, About, Dokumentasi, dan Contact.
- `style.css`: tampilan, tata letak, dan penyesuaian halaman untuk berbagai ukuran layar.
- `script.js`: fungsi pencarian anggota, tantangan misi 60 detik, pemutar bagian reff lagu, animasi kartu, serta pemilihan kartu anggota.
- `list nama.html`: halaman daftar kartu anggota yang ditampilkan di dalam halaman utama.
- `data.json`: data kelompok dalam format JSON, termasuk anggota, mentor, pengaturan lagu, dan contoh misi.

## Fungsi Interaktif

- **Pencarian anggota** menyaring daftar nama saat teks diketik.
- **Tantangan misi** memilih instruksi secara acak dan menjalankan hitung mundur selama 60 detik.
- **Pemutar musik** memutar dan mengulang bagian lagu sesuai waktu mulai dan akhir yang diatur pada elemen audio di `index.html`.
- **Kartu anggota** dapat dipilih dengan klik, Enter, atau Spasi. Jumlah pilihan diperbarui dan tombol tersedia untuk mengosongkannya.
- **Animasi kartu** menampilkan kartu saat masuk ke area pandang.

## Menjalankan

Buka `index.html` di browser. Pastikan file gambar, audio, `style.css`, `script.js`, dan `list nama.html` tetap berada pada lokasi yang sesuai dengan path di HTML.

`data.json` adalah data terstruktur pendamping dan belum dibaca otomatis oleh halaman. Untuk saat ini, konten yang tampil masih ditulis langsung di HTML dan beberapa fungsi masih memiliki data di `script.js`.