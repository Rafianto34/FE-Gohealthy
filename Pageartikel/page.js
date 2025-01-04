const BASE_URL = 'https://be-gohealthy-production.up.railway.app/api';
const token = localStorage.getItem("token");

// Fungsi untuk memuat artikel berdasarkan ID
async function loadArticle() {
  const urlParams = new URLSearchParams(window.location.search);
  const articleId = urlParams.get("id");

  if (!articleId) {
    document.getElementById("article").innerHTML = "<p>Invalid article ID.</p>";
    return;
  }

  try {
    // Use the correct GET endpoint with the contentId
    const response = await fetch(`${BASE_URL}/content/${articleId}`, {
      method: "GET",  // Use GET request
      headers: {
        "Content-Type": "application/json",
        "X-API-TOKEN": token,  // Include token if required
      },
    });

    const data = await response.json();

    if (data.errors) {
      throw new Error("Error fetching article");
    }

    const article = data.data;

    // Memperbarui artikel dengan data yang diperoleh
    document.getElementById("article").innerHTML = `
      <h1>${article.contentTitle}</h1>
      <p class="article-meta">Published at: ${new Date(article.created_at).toLocaleString()}</p>
      <div class="article-content">
        <p>${article.bodyContent}</p>
      </div>
    `;
  } catch (error) {
    console.error("Error fetching article:", error);
    document.getElementById("article").innerHTML = "<p>Failed to load article. Please try again later.</p>";
  }
}

// Panggil fungsi untuk memuat artikel setelah halaman dimuat
document.addEventListener("DOMContentLoaded", loadArticle);
