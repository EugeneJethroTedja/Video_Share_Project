# VidShare API

REST API untuk aplikasi berbagi video, dibangun dengan Laravel. Menyediakan autentikasi pengguna, manajemen konten video, dan sistem komentar.

> Frontend: [vidshare-frontend](https://github.com/USERNAME/vidshare-frontend) (React)

## Fitur

- Registrasi dan login pengguna
- Seluruh endpoint konten & komentar dilindungi middleware `auth:api`
- CRUD konten video (judul, deskripsi, thumbnail)
- Daftar konten berdasarkan pengguna
- CRUD komentar pada setiap konten

## Tech Stack

- PHP / Laravel
- Autentikasi token (guard `api`)
- MySQL
- Arsitektur REST API (controller di `App\Http\Controllers\Api`)

## Endpoint API

### Autentikasi (publik)

| Method | Endpoint | Deskripsi |
|--------|----------|-----------|
| POST | `/api/register` | Registrasi pengguna baru |
| POST | `/api/login` | Login dan mendapatkan token |

### Konten (butuh token)

| Method | Endpoint | Deskripsi |
|--------|----------|-----------|
| GET | `/api/contents` | Semua konten |
| POST | `/api/contents` | Tambah konten |
| GET | `/api/contents/{id}` | Detail konten |
| PUT | `/api/contents/{id}` | Ubah konten |
| DELETE | `/api/contents/{id}` | Hapus konten |
| GET | `/api/contents/user/{id}` | Konten milik pengguna tertentu |

### Komentar (butuh token)

| Method | Endpoint | Deskripsi |
|--------|----------|-----------|
| GET | `/api/contents/{id}/comments` | Daftar komentar suatu konten |
| POST | `/api/contents/{id}/comments` | Tambah komentar |
| PUT | `/api/comments/{id}` | Ubah komentar |
| DELETE | `/api/comments/{id}` | Hapus komentar |

Header untuk endpoint terproteksi:

```
Authorization: Bearer <token>
Accept: application/json
```

## Cara Menjalankan

```bash
git clone https://github.com/USERNAME/vidshare-api.git
cd vidshare-api
composer install
cp .env.example .env
php artisan key:generate
# atur koneksi database di .env
php artisan migrate
php artisan storage:link
php artisan serve
```

## Contoh Request

```bash
curl -X POST http://localhost:8000/api/login \
  -H "Content-Type: application/json" \
  -d '{"email":"user@example.com","password":"password"}'
```

## Author

**NAMA KAMU** – [GitHub](https://github.com/USERNAME) · [LinkedIn](https://linkedin.com/in/USERNAME)
