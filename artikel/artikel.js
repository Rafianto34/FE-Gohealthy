const BASE_URL = 'https://be-gohealthy-production.up.railway.app/api';
const token = localStorage.getItem("token");

// Ambil elemen kontainer artikel terkait
const relatedPostsContainer = document.getElementById('related-posts');

// Fungsi untuk memuat artikel terkait
async function loadRelatedPosts() {
  try {
    const response = await fetch(`${BASE_URL}/contents`, {
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

    // Kosongkan kontainer sebelum memuat artikel
    relatedPostsContainer.innerHTML = '';

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

      // Tambahkan artikel ke dalam kontainer
      relatedPostsContainer.appendChild(articleCard);
    });

  } catch (error) {
    console.error("Error fetching articles:", error);
    relatedPostsContainer.innerHTML = "<p>Failed to load articles. Please try again later.</p>";
  }
}

// Panggil fungsi untuk memuat data setelah halaman dimuat
document.addEventListener("DOMContentLoaded", loadRelatedPosts);
