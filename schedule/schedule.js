const BASE_URL = 'https://be-gohealthy-production.up.railway.app/api/schedule'; // Ganti dengan URL API Anda
const scheduleContainer = document.getElementById('schedule-container');

// Fungsi untuk memuat jadwal dari API
async function loadSchedule() {
  try {
    const response = await fetch(`${BASE_URL}/schedules`);
    if (response.ok) {
      const schedules = await response.json();
      renderSchedule(schedules);
    } else {
      scheduleContainer.innerHTML = '<p>Gagal memuat jadwal.</p>';
    }
  } catch (error) {
    console.error('Error fetching schedule:', error);
    scheduleContainer.innerHTML = '<p>Terjadi kesalahan saat memuat jadwal.</p>';
  }
}

// Fungsi untuk merender jadwal ke dalam HTML
function renderSchedule(schedules) {
  scheduleContainer.innerHTML = schedules
    .map(schedule => `
      <h3 class="schedule-date">${schedule.date}</h3>
      <section class="schedule">
        ${schedule.items
          .map(item => `
            <div class="schedule-row">
              <div class="left">
                <h3>${item.type}</h3>
                <p>${item.startTime} - ${item.endTime}</p>
                <ul>
                  ${item.details
                    .map(detail => `<li>${detail}</li>`)
                    .join('')}
                </ul>
              </div>
              <div class="right">
                <h3>Catatan</h3>
                <p>${item.note}</p>
              </div>
            </div>
          `)
          .join('')}
      </section>
    `)
    .join('');
}

// Tambahkan event listener untuk tombol
document.querySelectorAll('.btn').forEach(button => {
  button.addEventListener('click', () => {
    alert(`Anda menekan tombol: ${button.textContent}`);
  });
});

// Panggil fungsi untuk memuat jadwal
loadSchedule();
