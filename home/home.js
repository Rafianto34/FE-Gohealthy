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

document.addEventListener("DOMContentLoaded", () => {
  const articlesData = [
    {
      image: "img1.jpg",
      title: "Waspadai Gejala Kanker Lambung, Sekilas Mirip dengan Sakit Maag",
    },
    {
      image: "img2.jpg",
      title: "Sering Makan Daging Merah Bisa Picu Kanker, Benarkah? Ini Faktanya",
    },
    {
      image: "img3.jpg",
      title: "Benarkah Kumur Air Garam Bisa Atasi Sariawan?",
    },
  ];

  const articlesContainer = document.getElementById("articles-container");

  // Loop through articlesData to generate cards
  articlesData.forEach((article) => {
    const articleCard = document.createElement("article");
    articleCard.classList.add("article");

    articleCard.innerHTML = `
      <img src="${article.image}" alt="${article.title}">
      <h3>${article.title}</h3>
    `;

    articlesContainer.appendChild(articleCard);
  });

  // Example Profile Button Handler (unchanged)
  document.getElementById("profile-btn").addEventListener("click", () => {
    Swal.fire({
      icon: "info",
      title: "Profile",
      text: "Profile button clicked!",
    });
  });
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
          localStorage.clear();
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
