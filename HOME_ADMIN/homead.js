const token = localStorage.getItem("token")

document.addEventListener("DOMContentLoaded", () => {
  const API_URL = "https://be-gohealthy-production.up.railway.app/api/"; // Endpoint API
  const API_TOKEN = "your-api-token-here"; // Ganti dengan token API Anda
  const articlesGrid = document.getElementById("quotes-grid"); // Gunakan elemen grid yang sama

  // Function to fetch and render articles
  const loadArticles = async () => {
    try {
      const response = await fetch(`${API_URL}contents`, {
        method: "GET",
        headers: {
          "X-API-TOKEN": token,
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(`Error ${response.status}: ${response.statusText}`);
      }

      const { data } = await response.json(); // Ambil data dari respons

      // Clear the articles grid
      articlesGrid.innerHTML = "";

      // Loop through the articles and render each one
      data.forEach((article) => {
        const articleCard = document.createElement("div");
        articleCard.classList.add("quote-card");

        articleCard.innerHTML = `
          <p class="quote-text"><strong>${article.contentTitle}</strong></p>
          <p>${article.bodyContent.substring(0, 150)}...</p>
          <small>Published at: ${new Date(article.created_at).toLocaleString()}</small>
          <div class="actions">
            <button class="btn edit" data-id="${article.contentId}">EDIT</button>
            <button class="btn delete" data-id="${article.contentId}">HAPUS</button>
          </div>
        `;

        articlesGrid.appendChild(articleCard);
      });
    } catch (error) {
      console.error("Error fetching articles:", error);
      articlesGrid.innerHTML = `<p>Failed to load articles. Please try again later.</p>`;
    }
  };

  // Event listener for delete and edit actions
  articlesGrid.addEventListener("click", (event) => {
    if (event.target.classList.contains("delete")) {
      const articleId = event.target.dataset.id;
      alert(`Article with ID ${articleId} will be deleted.`);
      // Tambahkan logika DELETE API di sini
    }

    if (event.target.classList.contains("edit")) {
      const articleId = event.target.dataset.id;
      alert(`Article with ID ${articleId} will be edited.`);
      // Tambahkan logika EDIT API di sini
    }
  });

  // Load articles on page load
  loadArticles();
});
