const saveButton = document.getElementById('save-button');
const historyList = document.querySelector('.history-list');
const BASE_URL = 'https://be-gohealthy-production.up.railway.app/api/';
// Fungsi untuk memuat riwayat dari API
const loadHistory = async () => {
  try {
    const token = localStorage.getItem('token');
    if (!token) throw new Error('Unauthorized: Token is missing!');

    const response = await fetch(`${BASE_URL}users/food-consumption`, {
      method: 'GET',
      headers: {
        
        'X-API-TOKEN': token,
      },
    });

    if (!response.ok) {
      const errorResponse = await response.json();
      throw new Error(errorResponse.errors || 'Gagal memuat data!');
    }

    const historyData = await response.json();

    // Clear existing history
    historyList.innerHTML = '';

    // Render data dari API
    historyData.data.forEach((item) => {
      const historyItem = document.createElement('div');
      historyItem.classList.add('history-item');
      historyItem.innerHTML = `
        <p><strong>${item.foodName}:</strong> ${item.calories} kal (x${item.quantity})</p>
        <p>Total Kalori: ${item.calories * item.quantity} kal</p>
        <span>${new Date(item.consumptionDate).toLocaleDateString()}</span>
      `;
      historyList.appendChild(historyItem);
    });
  } catch (error) {
    console.error('Load history error:', error.message);
    alert(error.message);
  }
};

// Fungsi untuk menyimpan data ke API
const saveHistory = async (data) => {
  try {
    const token = localStorage.getItem('token');
    if (!token) throw new Error('Unauthorized: Token is missing!');

    const response = await fetch(`${BASE_URL}food-consumption`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-API-TOKEN': token,
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const errorResponse = await response.json();
      throw new Error(errorResponse.errors || 'Gagal menyimpan data!');
    }

    const responseData = await response.json();
    console.log('Data berhasil disimpan:', responseData);

    // Tampilkan data yang baru disimpan di riwayat tanpa reload
    const historyItem = document.createElement('div');
    historyItem.classList.add('history-item');
    historyItem.innerHTML = `
      <p><strong>${data.foodName}:</strong> ${data.calories} kal (x${data.quantity})</p>
      <p>Total Kalori: ${data.calories * data.quantity} kal</p>
      <span>${new Date(data.consumptionDate).toLocaleDateString()}</span>
    `;
    historyList.appendChild(historyItem);

    alert('Data berhasil disimpan!');
  } catch (error) {
    console.error('Save history error:', error.message);
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
    const data = {
      foodName: food,
      calories: parseFloat(calories),
      consumptionDate: new Date(date).toISOString(),
      quantity: parseInt(quantity, 10),
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
