document.addEventListener("DOMContentLoaded", () => {
  const quoteInput = document.getElementById("quoteInput");
  const uploadButton = document.getElementById("uploadButton");
  const quoteTableBody = document.getElementById("quoteTableBody");

  // Add quote
  uploadButton.addEventListener("click", () => {
    const quoteText = quoteInput.value.trim();
    if (quoteText) {
      const rowCount = quoteTableBody.rows.length + 1;
      const newRow = quoteTableBody.insertRow();

      const cell1 = newRow.insertCell(0);
      const cell2 = newRow.insertCell(1);
      const cell3 = newRow.insertCell(2);

      cell1.textContent = rowCount;
      cell2.textContent = quoteText;
      cell3.innerHTML = `
        <button class="edit-quote">Edit</button>
        <button class="delete-quote">Hapus</button>
      `;

      quoteInput.value = "";
    }
  });

  // Handle table actions
  quoteTableBody.addEventListener("click", (e) => {
    const target = e.target;

    if (target.classList.contains("delete-quote")) {
      // Delete quote
      target.closest("tr").remove();
      updateTableIndexes();
    } else if (target.classList.contains("edit-quote")) {
      // Edit quote
      const row = target.closest("tr");
      const quoteCell = row.cells[1];

      // Create textbox if not exists
      if (!quoteCell.querySelector("input")) {
        const currentText = quoteCell.textContent.trim();
        quoteCell.innerHTML = `
          <input type="text" value="${currentText}" class="edit-input">
          <button class="save-quote">Save</button>
        `;
      }
    } else if (target.classList.contains("save-quote")) {
      // Save edited quote
      const row = target.closest("tr");
      const quoteCell = row.cells[1];
      const editInput = quoteCell.querySelector(".edit-input");

      if (editInput) {
        quoteCell.innerHTML = editInput.value.trim();
      }
    }
  });

  // Update table indexes after delete
  function updateTableIndexes() {
    [...quoteTableBody.rows].forEach((row, index) => {
      row.cells[0].textContent = index + 1;
    });
  }
});
