// API URL
const BASE_URL = 'http://localhost:8080/api';

// Ambil elemen DOM
const relatedPostsContainer = document.getElementById('related-posts');

// Fungsi untuk memuat artikel terkait
async function loadRelatedPosts() {
  try {
    const response = await fetch(`${BASE_URL}/articles`);
    if (response.ok) {
      const { data: articles } = await response.json();
      
      relatedPostsContainer.innerHTML = articles.map(article => `
        <article class="post-card" data-id="${article.id}">
          <img src="${article.image}" alt="${article.title}">
          <h3>${article.title}</h3>
          <p>${article.description.substring(0, 100)}...</p>
          <div class="post-footer">
            <span>${article.author}</span>
            <span>${new Date(article.date).toLocaleDateString()}</span>
          </div>
        </article>
      `).join('');

      // Tambahkan event listener untuk setiap artikel
      document.querySelectorAll('.post-card').forEach(post => {
        post.addEventListener('click', () => {
          const articleId = post.getAttribute('data-id');
          alert(`Baca lebih lanjut tentang artikel ID: ${articleId}`);
          // Redirect ke halaman detail artikel (opsional)
          // window.location.href = `/page.html//${articleId}`;
        });
      });
    } else {
      relatedPostsContainer.innerHTML = '<p>Gagal memuat artikel terkait.</p>';
    }
  } catch (error) {
    relatedPostsContainer.innerHTML = '<p>Terjadi kesalahan saat memuat artikel terkait.</p>';
  }
}
// Panggil fungsi untuk memuat data
loadRelatedPosts();
