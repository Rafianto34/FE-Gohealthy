document.addEventListener("DOMContentLoaded", async () => {
  const quoteInput = document.getElementById("quoteInput");
  const uploadButton = document.getElementById("uploadButton");
  const quoteTableBody = document.getElementById("quoteTableBody");
  const API_URL = "https://jsonplaceholder.typicode.com/posts"; // API contoh, ganti sesuai API Anda

  // Fetch quotes dari API dan render ke tabel
  async function loadQuotes() {
    try {
      const response = await fetch(API_URL);
      const data = await response.json();

      // Hapus konten tabel sebelumnya
      quoteTableBody.innerHTML = "";

      // Loop untuk menambahkan data ke tabel
      data.forEach((quote, index) => {
        const newRow = quoteTableBody.insertRow();

        const cell1 = newRow.insertCell(0);
        const cell2 = newRow.insertCell(1);
        const cell3 = newRow.insertCell(2);

        cell1.textContent = index + 1; // Nomor
        cell2.textContent = quote.title; // Text quote dari API
        cell3.innerHTML = `
          <button class="edit-quote">Edit</button>
          <button class="delete-quote">Hapus</button>
        `;
      });
    } catch (error) {
      console.error("Error fetching quotes:", error);
    }
  }

  // Tambah quote baru
  uploadButton.addEventListener("click", async () => {
    const quoteText = quoteInput.value.trim();
    if (quoteText) {
      try {
        // Simulasi POST ke API
        const response = await fetch(API_URL, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            title: quoteText,
          }),
        });

        if (response.ok) {
          alert("Quote berhasil ditambahkan!");
          quoteInput.value = "";
          loadQuotes(); // Refresh tabel
        } else {
          alert("Gagal menambahkan quote.");
        }
      } catch (error) {
        console.error("Error adding quote:", error);
      }
    }
  });

  // Handle table actions (edit, delete)
  quoteTableBody.addEventListener("click", (e) => {
    const target = e.target;

    if (target.classList.contains("delete-quote")) {
      // Hapus quote
      const row = target.closest("tr");
      row.remove();
      updateTableIndexes();
    } else if (target.classList.contains("edit-quote")) {
      // Edit quote
      const row = target.closest("tr");
      const quoteCell = row.cells[1];

      // Buat input untuk edit jika belum ada
      if (!quoteCell.querySelector("input")) {
        const currentText = quoteCell.textContent.trim();
        quoteCell.innerHTML = `
          <input type="text" value="${currentText}" class="edit-input">
          <button class="save-quote">Save</button>
        `;
      }
    } else if (target.classList.contains("save-quote")) {
      // Simpan quote yang diedit
      const row = target.closest("tr");
      const quoteCell = row.cells[1];
      const editInput = quoteCell.querySelector(".edit-input");

      if (editInput) {
        quoteCell.innerHTML = editInput.value.trim();
      }
    }
  });

  // Update nomor indeks tabel setelah penghapusan
  function updateTableIndexes() {
    [...quoteTableBody.rows].forEach((row, index) => {
      row.cells[0].textContent = index + 1;
    });
  }

  // Load quotes saat halaman dimuat
  loadQuotes();
});
