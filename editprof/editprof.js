// Ambil token dari localStorage
const token = localStorage.getItem("token");
document.addEventListener("DOMContentLoaded", function () {
    // Tambahkan event listener untuk form submit
    document
      .getElementById("edit-profile-form")
      .addEventListener("submit", async function (event) {
        event.preventDefault();
  
        // Ambil nilai dari form
      
        const username = document.getElementById("username").value.trim();
        const newPassword = document.getElementById("edit-new-password").value;
        const confirmPassword = document.getElementById("edit-confirm-password").value;
  
        
  
        // Validasi panjang password (jika ada password baru)
        if (newPassword && newPassword.length < 8) {
          Swal.fire({
            icon: "error",
            title: "Error",
            text: "Password harus terdiri dari minimal 8 karakter.",
          });
          return;
        }
  
        // Validasi kesamaan password baru dengan konfirmasi password
        if (newPassword && newPassword !== confirmPassword) {
          Swal.fire({
            icon: "error",
            title: "Error",
            text: "Pastikan password baru sudah sama.",
          });
          return;
        }
  
        // Siapkan payload untuk API
        const payload = {
          username: username,
        };
  
        // Tambahkan password jika diisi
        if (newPassword) {
          payload.password = newPassword;
        }
  
        // Pastikan token valid
        if (!token) {
          Swal.fire({
            icon: "error",
            title: "Error",
            text: "Token tidak valid. Harap login kembali.",
          }).then(() => {
            window.location.href = "/login";
          });
          return;
        }
  
        try {
          // Panggil API untuk memperbarui profil
          const response = await fetch(
            "https://be-gohealthy-production.up.railway.app/api/users/current",
            {
              method: "PATCH",
              headers: {
                "X-API-TOKEN": token, // Kirim token di header
              },
              body: JSON.stringify(payload),
            }
          );
  
          const data = await response.json();
  
          if (response.ok) {
            Swal.fire({
              icon: "success",
              title: "Berhasil",
              text: "Profil berhasil diperbarui!",
            }).then(() => {
              window.location.href = "/home/home.html";
            });
          } else {
            Swal.fire({
              icon: "error",
              title: "Error",
              text: data.errors || "Terjadi kesalahan saat memperbarui profil.",
            });
          }
        } catch (error) {
          Swal.fire({
            icon: "error",
            title: "Error",
            text: "Tidak dapat terhubung ke server. Coba lagi nanti.",
          });
          console.error("Error:", error);
        }
      });
  

   
  
    // Tambahkan event listener untuk tombol "Kembali"
    document.querySelector(".back-button").addEventListener("click", function () {
      window.location.href = "/home/home.html";
    });
  });
  