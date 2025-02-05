document.getElementById('login-form').addEventListener('submit', async function (e) {
  e.preventDefault();

  const email = document.getElementById('email').value.trim();
  const password = document.getElementById('password').value;

  try {
    // Konsumsi API untuk login
    const response = await fetch('https://be-gohealthy-production.up.railway.app/api/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    if (response.ok) {
      const result = await response.json();
      const role = result.data.role;

      // Simpan token ke localStorage (tanpa enkripsi)
      const token = result.data.token;
      localStorage.setItem('token', token);

      if (role == "ADMIN"){
        Swal.fire({
          icon: 'success',
          title: 'Login berhasil!',
          showConfirmButton: false,
          timer: 1500
        }).then(() => {
          window.location.href = '/admin/home'; // Pastikan URL ini benar
        });
      }else {
        Swal.fire({
          icon: 'success',
          title: 'Login berhasil!',
          showConfirmButton: false,
          timer: 1500
        }).then(() => {
          window.location.href = '/home'; // Pastikan URL ini benar
        });
      }
    } else {
      // Tangani kesalahan login
      const error = await response.json();
      Swal.fire({
        icon: 'error',
        title: 'Login gagal',
        text: error.message || 'Email atau password salah.',
      });
    }
  } catch (err) {
    // Penanganan error koneksi atau lainnya
    Swal.fire({
      icon: 'error',
      title: 'Terjadi kesalahan',
      text: 'Tidak dapat terhubung ke server.',
    });
  }
});
