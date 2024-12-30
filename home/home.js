// Ambil token dan salt dari localStorage
const encryptedToken = localStorage.getItem('token');
const salt = localStorage.getItem('salt');

// Dekripsi token
const token = encryptedToken
  ? CryptoJS.AES.decrypt(encryptedToken, salt).toString(CryptoJS.enc.Utf8)
  : null;

// API URL
const BASE_URL = 'http://localhost:8080/api';

// Cek jika token tersedia
if (!token) {
  Swal.fire({
    icon: 'warning',
    title: 'Session expired',
    text: 'Silakan login kembali.',
    confirmButtonText: 'OK'
  }).then(() => {
    window.location.href = './login.html';
  });
}

// Event untuk tombol notifikasi
document.getElementById('notification-btn').addEventListener('click', async () => {
  try {
    const response = await fetch(`${BASE_URL}/notifications`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });

    if (response.ok) {
      const notifications = await response.json();

      const notificationHTML = notifications.data
        .map((notif) => `<li>${notif.message}</li>`)
        .join('');

      Swal.fire({
        title: 'Notifikasi',
        html: `<ul>${notificationHTML}</ul>`,
        icon: 'info',
        confirmButtonText: 'OK'
      });
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Gagal Memuat Notifikasi',
        text: 'Terjadi kesalahan saat memuat notifikasi.',
      });
    }
  } catch (error) {
    Swal.fire({
      icon: 'error',
      title: 'Terjadi Kesalahan',
      text: 'Tidak dapat terhubung ke server.',
    });
  }
});

// Event untuk tombol profil
document.getElementById('profile-btn').addEventListener('click', async () => {
  try {
    const response = await fetch(`${BASE_URL}/user/profile`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });

    if (response.ok) {
      const profile = await response.json();

      Swal.fire({
        title: 'PROFILE',
        html: `
          <div style="text-align: left;">
            <p><strong>Nama:</strong> ${profile.data.name}</p>
            <p><strong>Username:</strong> @${profile.data.username}</p>
            <p><strong>Email:</strong> ${profile.data.email}</p>
            <p><strong>No. Telp:</strong> ${profile.data.phone}</p>
            <p><strong>Status:</strong> ${profile.data.status}</p>
          </div>
        `,
        showCloseButton: true,
        showCancelButton: true,
        focusConfirm: false,
        confirmButtonText: 'Edit Profile',
        cancelButtonText: 'Log Out'
      }).then((result) => {
        if (result.isConfirmed) {
          window.location.href = './edit-profile.html';
        } else if (result.dismiss === Swal.DismissReason.cancel) {
          localStorage.clear(); // Hapus token
          window.location.href = './login.html';
        }
      });
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Gagal Memuat Profil',
        text: 'Terjadi kesalahan saat memuat profil.',
      });
    }
  } catch (error) {
    Swal.fire({
      icon: 'error',
      title: 'Terjadi Kesalahan',
      text: 'Tidak dapat terhubung ke server.',
    });
  }
});
