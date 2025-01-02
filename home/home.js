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



document.addEventListener("DOMContentLoaded", async () => {
  const API_URL = "https://be-gohealthy-production.up.railway.app/api/contents";
  const articlesContainer = document.getElementById("articles-container");

  try {
    const response = await fetch(API_URL, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();

    if (data.errors) {
      throw new Error("Error fetching articles");
    }

    const articles = data.data;

    // Loop through articles and display them
    articles.forEach(article => {
      const articleCard = document.createElement("div");
      articleCard.classList.add("article-card");

      // Format article content and add to the DOM
      articleCard.innerHTML = `
        <div class="content">
          <h3>${article.contentTitle}</h3>
          <p>${article.bodyContent.substring(0, 150)}...</p>
          <small>Published at: ${new Date(article.created_at).toLocaleString()}</small>
         <a href="/pageartikel?id=${article.contentId}" class="read-more">Read More</a>
        </div>
      `;

      articlesContainer.appendChild(articleCard);
    });

  } catch (error) {
    console.error("Error fetching articles:", error);
    articlesContainer.innerHTML = "<p>Failed to load articles. Please try again later.</p>";
  }
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
              window.location.href = "/editprof/editprof.html";
            } else if (result.dismiss === Swal.DismissReason.cancel) {
              // Log out user
              const token = localStorage.getItem("token");
              if (token) {
                fetch("https://be-gohealthy-production.up.railway.app/api/auth/logout", {
                  method: "DELETE",
                  headers: {
                    "X-API-TOKEN": token,
                  },
                })
                  .then((response) => response.json())
                  .then((data) => {
                    if (data.data === "OK") {
                      // Clear localStorage and redirect to login page
                      localStorage.clear();
                      window.location.href = "/login";
                    } else {
                      throw new Error("Logout failed");
                    }
                  })
                  .catch((error) => {
                    Swal.fire({
                      icon: "error",
                      title: "Error",
                      text: "Gagal logout: " + error.message,
                    });
                  });
              } else {
                // If token is not available
                Swal.fire({
                  icon: "error",
                  title: "Error",
                  text: "Token not found!",
                });
              }
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
