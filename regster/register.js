document.getElementById("registerForm").addEventListener("submit", async function (event) {
  event.preventDefault();

  const email = document.getElementById("reg-email").value.trim();
  const username = document.getElementById("reg-username").value.trim();
  const name = document.getElementById("reg-name").value.trim();
  const password = document.getElementById("reg-password").value;
  const confirmPassword = document.getElementById("reg-confirm-password").value;

  // Validasi email
  if (!validateEmail(email)) {
    Swal.fire({
      icon: 'error',
      title: 'Error',
      text: 'Masukkan email yang valid.',
    });
    return;
  }

  // Validasi panjang password
  if (password.length < 8) {
    Swal.fire({
      icon: 'error',
      title: 'Error',
      text: 'Password harus terdiri dari minimal 8 karakter.',
    });
    return;
  }

  // Validasi kesamaan password
  if (password !== confirmPassword) {
    Swal.fire({
      icon: 'error',
      title: 'Error',
      text: 'Pastikan password sudah sama.',
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
        email: email,
        username: username,
        name: name,
        password: password,
      }),
    });

    const data = await response.json();

    if (response.ok) {
      Swal.fire({
        icon: 'success',
        title: 'Berhasil',
        text: 'Registrasi berhasil!',
      }).then(() => {
        window.location.href = '../login.html';
      });
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: data.message || 'Terjadi kesalahan saat registrasi.',
      });
    }
  } catch (error) {
    Swal.fire({
      icon: 'error',
      title: 'Error',
      text: 'Tidak dapat terhubung ke server. Coba lagi nanti.',
    });
  }
});

// Fungsi untuk validasi email
function validateEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
}
