document.getElementById("registerForm").addEventListener("submit", async function (event) {
  event.preventDefault();

  const email = document.getElementById("reg-email").value;
  const username = document.getElementById("reg-username").value;
  const password = document.getElementById("reg-password").value;
  const confirmPassword = document.getElementById("reg-confirm-password").value;

  // Validasi panjang password
  if (password.length < 8) {
    Swal.fire({
      icon: 'error',
      title: 'Error',
      text: 'Password harus terdiri dari minimal 8 karakter',
    });
    return;
  }

  // Validasi kesamaan password
  if (password !== confirmPassword) {
    Swal.fire({
      icon: 'error',
      title: 'Error',
      text: 'Pastikan password sudah sama',
    });
    return;
  }

  try {
    // Kirim data ke API menggunakan fetch
    const response = await fetch("https://example.com/api/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: username,
        email: email,
        password: password,
      }),
    });

    // Parse respons API
    const data = await response.json();

    if (response.ok) {
      Swal.fire({
        icon: 'success',
        title: 'Berhasil',
        text: 'Registrasi berhasil!',
      }).then(() => {
        // Redirect ke halaman login setelah sukses
        window.location.href = '/login.html';
      });
    } else {
      // Tampilkan pesan error dari server
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: data.message || 'Terjadi kesalahan saat registrasi',
      });
    }
  } catch (error) {
    // Tangani error koneksi atau lainnya
    Swal.fire({
      icon: 'error',
      title: 'Error',
      text: 'Tidak dapat terhubung ke server. Coba lagi nanti.',
    });
  }
});