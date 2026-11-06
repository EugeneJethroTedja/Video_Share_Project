# VidShare Frontend

Aplikasi web berbagi video sederhana (mirip mini-YouTube) yang dibangun dengan React. Pengguna dapat melihat rekomendasi video, mengelola video miliknya sendiri, dan berkomentar pada video.

> Backend: [vidshare-api](https://github.com/USERNAME/vidshare-api) (Laravel REST API)

## Fitur

- **Dashboard "Rekomendasi Untukmu"** – menampilkan semua video dalam grid kartu responsif beserta thumbnail, judul, dan deskripsi.
- **My Videos** – tabel video milik pengguna dengan fitur tambah, ubah, dan hapus (CRUD) lewat modal.
- **Komentar** – modal komentar dengan tambah, edit, dan hapus komentar. *(Saat ini masih state lokal di frontend; integrasi ke endpoint API komentar sedang dikerjakan.)*
- **Feedback UI** – loading spinner, empty state, dan notifikasi toast (react-toastify).
- **Tema gelap** menggunakan React-Bootstrap.

## Tech Stack

| Kategori | Teknologi |
|----------|-----------|
| Library UI | React (Hooks: `useState`, `useEffect`) |
| Styling | React-Bootstrap, Bootstrap 5 |
| Ikon | react-icons |
| Notifikasi | react-toastify |
| Komunikasi API | Axios / Fetch (modul `src/api`) |

## Struktur Halaman

```
src/
├── api/
│   ├── index.js            # konfigurasi base URL & helper getThumbnail
│   └── apiContent.js       # GetAllContents, GetMyContents, DeleteContent, dll.
├── components/modals/
│   ├── ModalCreateContent.jsx
│   └── ModalEditContent.jsx
└── pages/
    ├── DashboardPage.jsx   # rekomendasi video + komentar
    └── ContentPage.jsx     # manajemen video milik user
```

## Cara Menjalankan

```bash
git clone https://github.com/USERNAME/vidshare-frontend.git
cd vidshare-frontend
npm install
cp .env.example .env     # isi URL backend, mis. VITE_API_URL=http://localhost:8000
npm run dev
```

Pastikan backend ([vidshare-api](https://github.com/USERNAME/vidshare-api)) sudah berjalan.

## Screenshot

<!-- Tambahkan screenshot Dashboard, My Videos, dan modal komentar di sini -->
![Dashboard](docs/dashboard.png)
![My Videos](docs/my-videos.png)

## Rencana Pengembangan

- [ ] Hubungkan fitur komentar ke API (`/contents/{id}/comments`)
- [ ] Halaman login & register
- [ ] Pagination dan pencarian video
- [ ] Pemutar video

## Author

**NAMA KAMU** – [GitHub](https://github.com/USERNAME) · [LinkedIn](https://linkedin.com/in/USERNAME)
