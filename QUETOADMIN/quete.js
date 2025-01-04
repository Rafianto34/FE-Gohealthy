const token = localStorage.getItem("token")
document.addEventListener('DOMContentLoaded', () => {
  const quoteInput = document.getElementById('quoteInput');
  const uploadButton = document.getElementById('uploadButton');
  const quoteTableBody = document.getElementById('quoteTableBody');


  // Endpoint API dan token
  const apiUrl = 'https://be-gohealthy-production.up.railway.app/api/'; // Sesuaikan dengan endpoint yang benar
 

  // Fungsi untuk menambahkan quote baru
  async function addQuote(quoteText) {
    try {
      const response = await fetch(`${apiUrl}motivation`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-API-TOKEN': token,
        },
        body: JSON.stringify({ quote: quoteText }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const result = await response.json();
      if (result.errors) {
        console.error('API Errors:', result.errors);
        alert('Gagal menambahkan quote. Silakan coba lagi.');
        return;
      }

      alert('Quote berhasil ditambahkan!');
      loadQuotes(); // Perbarui tabel dengan data terbaru
    } catch (error) {
      console.error('Terjadi kesalahan saat menambahkan quote:', error);
      alert('Gagal menambahkan quote. Silakan coba lagi.');
    }
  }

  // Fungsi untuk memuat data quotes
  async function loadQuotes() {
    try {
      const response = await fetch(`${apiUrl}motivations`, {
        method : 'GET',
        headers: {
          'X-API-TOKEN': token,
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const result = await response.json();
      renderQuotes(result.data); // Asumsikan data response berisi array quotes
    } catch (error) {
      console.error('Gagal memuat data quotes:', error);
    }
  }

  // Fungsi untuk menampilkan data quotes di tabel
  function renderQuotes(quotes) {
    quoteTableBody.innerHTML = ''; // Bersihkan tabel sebelum menambahkan data baru
    quotes.forEach((quote, index) => {
      const row = document.createElement('tr');

      row.innerHTML = `
        <td>${index + 1}</td>
        <td>${quote.text}</td>
        <td>
          <button class="edit-quote">Edit</button>
          <button class="delete-quote">Hapus</button>
        </td>
      `;

      quoteTableBody.appendChild(row);
    });
  }

  // Event listener untuk tombol "Unggah"
  uploadButton.addEventListener('click', () => {
    const quoteText = quoteInput.value.trim();
    if (quoteText === '') {
      alert('Quote tidak boleh kosong!');
      return;
    }

    addQuote(quoteText);
    quoteInput.value = ''; // Kosongkan input setelah upload
  });

  // Muat data quotes saat halaman dimuat
  loadQuotes();
});
