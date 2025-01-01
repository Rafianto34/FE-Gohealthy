const express = require('express');
const path = require('path');

const app = express();
const PORT = 3000;

// Middleware untuk mengatur folder public
app.use(express.static(path.join(__dirname)));
app.use('/admin/static', express.static(path.join(__dirname, 'FE-Gohealthy-Admin', 'HOME_ADMIN')));


app.get('/images', (req, res) => {
  res.sendFile(path.join(__dirname, 'image', 'logo.png'));
});


// Routing untuk FE-Gohealthy

app.get('/landing', (req, res) => {
  res.sendFile(path.join(__dirname, 'landing.html'));
});

app.get('/artikel', (req, res) => {
  res.sendFile(path.join(__dirname, 'artikel', 'artikel.html'));
});

app.get('/home', (req, res) => {
  res.sendFile(path.join(__dirname, 'home', 'home.html'));
});

app.get('/inputmakan', (req, res) => {
  res.sendFile(path.join(__dirname, 'inputmakan', 'inputmakan.html'));
});

app.get('/login', (req, res) => {
  res.sendFile(path.join(__dirname, 'login', 'login.html'));
});

app.get('/login.html', (req, res) => {
  res.sendFile(path.join(__dirname, 'login', 'login.html'));
});

app.get('/pageartikel', (req, res) => {
  res.sendFile(path.join(__dirname, 'Pageartikel', 'page.html'));
});

app.get('/pola', (req, res) => {
  res.sendFile(path.join(__dirname, 'pola', 'pola.html'));
});

app.get('/register', (req, res) => {
  res.sendFile(path.join(__dirname, 'regster', 'register.html'));
});

app.get('/schedule', (req, res) => {
  res.sendFile(path.join(__dirname, 'schedule', 'schedule.html'));
});

// Routing untuk FE-Gohealthy-Admin
app.get('/admin/artikel', (req, res) => {
  res.sendFile(path.join(__dirname, 'ARTIKELADMIN', 'editart.html'));
});

app.get('/admin/home', (req, res) => {
  res.sendFile(path.join(__dirname,'HOME_ADMIN', 'homead.html')); 
});

app.get('/admin/queto', (req, res) => {
  res.sendFile(path.join(__dirname,'QUETOADMIN', 'quete.html'));
});

// Menjalankan server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}/login`);
});
