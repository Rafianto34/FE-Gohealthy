const BASE_URL = 'http://localhost:8080/api';

    // Ambil elemen kontainer artikel terkait
    const relatedPostsContainer = document.getElementById('related-posts');

    // Fungsi untuk memuat artikel terkait
    async function loadRelatedPosts() {
      try {
        const response = await fetch(`${BASE_URL}/articles`);
        if (response.ok) {
          const { data: articles } = await response.json();

          // Kosongkan kontainer sebelum memuat artikel
          relatedPostsContainer.innerHTML = '';

          // Loop melalui artikel dan tambahkan ke kontainer
          articles.forEach(article => {
            const postCard = document.createElement('article');
            postCard.classList.add('post-card');
            postCard.setAttribute('data-id', article.id);

            postCard.innerHTML = `
              <img src="${article.image}" alt="${article.title}">
              <h3>${article.title}</h3>
              <p>${article.description.substring(0, 100)}...</p>
              <div class="post-footer">
                <span>${article.author}</span>
                <span>${new Date(article.date).toLocaleDateString()}</span>
              </div>
            `;

            // Tambahkan event listener untuk artikel
            postCard.addEventListener('click', () => {
              alert(`Baca lebih lanjut tentang artikel ID: ${article.id}`);
              // Redirect ke halaman detail artikel (opsional)
              // window.location.href = `/page.html/${article.id}`;
            });

            // Tambahkan elemen ke dalam kontainer
            relatedPostsContainer.appendChild(postCard);
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