document.addEventListener('DOMContentLoaded', () => {
  const titleInput = document.getElementById('contentTitleInput'); // Sesuaikan ID input judul
  const contentTextarea = document.getElementById('bodyContentInput'); // Sesuaikan ID textarea konten
  const saveButton = document.getElementById('uploadContentButton'); // Sesuaikan ID tombol simpan
const token = localStorage.getItem("token")
  saveButton.addEventListener('click', async () => {
    const title = titleInput.value.trim();
    const content = contentTextarea.value.trim();

    if (title === '' || content === '') {
      alert('Judul dan konten tidak boleh kosong!');
      return;
    }

    // Data yang akan dikirim ke API
    const data = {
      contentTitle: title,
      bodyContent: content,
    };

    try {
      const response = await fetch('https://be-gohealthy-production.up.railway.app/api/content', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-API-TOKEN': token, // Ganti dengan token API Anda
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const result = await response.json();

      if (result.errors) {
        console.error('API Errors:', result.errors);
        alert('Gagal menambahkan artikel. Silakan periksa kembali.');
        return;
      }

      console.log('Artikel berhasil ditambahkan:', result.data);
      alert('Artikel berhasil disimpan!');

      // Bersihkan input
      titleInput.value = '';
      contentTextarea.value = '';

      // Redirect atau perbarui halaman
      window.location.reload(); // Memuat ulang halaman
    } catch (error) {
      console.error('Terjadi kesalahan saat menyimpan artikel:', error);
      alert('Gagal menyimpan artikel. Silakan coba lagi.');
    }
  });
});
