const saveButton = document.getElementById('save-button');
const historyList = document.querySelector('.history-list');

// Fungsi untuk memuat riwayat dari API
const loadHistory = async () => {
  try {
    const response = await fetch('https://api.example.com/food-history');
    if (!response.ok) throw new Error('Gagal memuat data!');
    const historyData = await response.json();

    // Clear existing history
    historyList.innerHTML = '';

    // Render data dari API
    historyData.forEach(item => {
      const historyItem = document.createElement('div');
      historyItem.classList.add('history-item');
      historyItem.innerHTML = `
        <p><strong>${item.food}:</strong> ${item.calories} kal (x${item.quantity})</p>
        <p>Total Kalori: ${item.totalCalories} kal</p>
        <span>${new Date(item.date).toLocaleDateString()}</span>
      `;
      historyList.appendChild(historyItem);
    });
  } catch (error) {
    alert(error.message);
  }
};

// Fungsi untuk menyimpan data ke API
const saveHistory = async (data) => {
  try {
    const response = await fetch('https://api.example.com/food-history', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    if (!response.ok) throw new Error('Gagal menyimpan data!');

    // Reload history setelah data berhasil disimpan
    loadHistory();
  } catch (error) {
    alert(error.message);
  }
};

// Event listener untuk tombol simpan
saveButton.addEventListener('click', (e) => {
  e.preventDefault();

  const date = document.getElementById('date').value;
  const food = document.getElementById('food').value;
  const calories = document.getElementById('calories').value;
  const quantity = document.getElementById('quantity').value;

  if (date && food && calories && quantity) {
    const totalCalories = calories * quantity;

    const data = {
      date,
      food,
      calories: parseInt(calories, 10),
      quantity: parseInt(quantity, 10),
      totalCalories,
    };

    // Simpan data ke API
    saveHistory(data);

    // Reset form
    document.querySelector('form').reset();
  } else {
    alert('Harap isi semua field!');
  }
});

// Load history saat halaman pertama kali dimuat
document.addEventListener('DOMContentLoaded', loadHistory);
