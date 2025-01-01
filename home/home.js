// Ambil token dan salt dari localStorage
const token = localStorage.getItem("token");


// API URL
const BASE_URL = 'https://be-gohealthy-production.up.railway.app/api';



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

  
});


document.addEventListener("DOMContentLoaded", () => {
  // Ganti dengan API yang sesuai atau gunakan untuk testing
  const token = localStorage.getItem("token") // Token untuk testing, ganti jika perlu

  // Event untuk tombol profil
  document.getElementById("profile-btn").addEventListener("click", async () => {
    try {
      // Simulasi panggilan API
      const response = await fetch(`${BASE_URL}/users/current`, {
        method: "GET",
        headers: {
          "X-API-TOKEN": token,
        },
      });

      if (response.ok) {
        const profile = await response.json();

        // Menampilkan pop-up profil
        Swal.fire({
          title: `<h2 style="font-weight: bold;">PROFILE</h2>`,
          html: `
            <div style="text-align: center;">
              <img src="https://via.placeholder.com/100" alt="Profile Picture" style="width: 100px; height: 100px; border-radius: 50%; margin-bottom: 10px;">
              <p><strong>Nama:</strong> ${profile.data.name}</p>
              <p><strong>Username:</strong> ${profile.data.username}</p>
              <p><strong>Email:</strong> ${profile.data.email}</p>
              
            </div>
          `,
          showCloseButton: true,
          showCancelButton: true,
          confirmButtonText: "Edit Profile",
          cancelButtonText: "Log Out",
        }).then((result) => {
          if (result.isConfirmed) {
            // Redirect ke halaman edit profile
            window.location.href = "./edit-profile.html";
          } else if (result.dismiss === Swal.DismissReason.cancel) {
            // Log out user
            localStorage.clear();
            window.location.href = "/login";
          }
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "Gagal Memuat Profil",
          text: "Terjadi kesalahan saat memuat profil.",
        });
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Terjadi Kesalahan",
        text: "Tidak dapat terhubung ke server.",
      });
    }
  });
});
