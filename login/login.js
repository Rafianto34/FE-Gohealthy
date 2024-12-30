document.getElementById('loginForm').addEventListener('submit', async function (e) {
  e.preventDefault();

  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;

  try {
    // Konsumsi API untuk login
    const response = await fetch('http://localhost:8080/api/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
    });

    if (response.ok) {
      const result = await response.json();

      // Enkripsi token menggunakan CryptoJS
      const token = result.data.token;
      const salt = CryptoJS.lib.WordArray.random(128 / 8).toString(); // Generate salt
      const encryptedToken = CryptoJS.AES.encrypt(token, salt).toString(); // Encrypt token with salt
      localStorage.setItem('token', encryptedToken); // Simpan token terenkripsi di localStorage
      localStorage.setItem('salt', salt); // Simpan salt di localStorage

      // Notifikasi sukses dan redirect
      Swal.fire({
        icon: 'success',
        title: 'Login berhasil!',
        showConfirmButton: false,
        timer: 1500
      }).then(() => {
        window.location.href = '/home.html'; // Redirect ke halaman home
      });
    } else {
      // Notifikasi gagal login
      const error = await response.json();
      Swal.fire({
        icon: 'error',
        title: 'Login gagal',
        text: error.errors || 'Username atau password salah.',
      });
    }
  } catch (err) {
    // Penanganan error
    Swal.fire({
      icon: 'error',
      title: 'Terjadi kesalahan',
      text: 'Tidak dapat terhubung ke server.',
    });
  }
});
