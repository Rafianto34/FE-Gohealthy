document.addEventListener('DOMContentLoaded', () => {
  const articles = [
    {
      id: 1,
      title: 'Artikel 1',
      content: 'Sistem Imun Pada Tubuh Berperan Krusial Dalam Menjaga Kesehatan Secara Menyeluruh Dengan..',
      author: 'ADMIN',
      date: 'July 16, 2024',
    },
    {
      id: 2,
      title: 'Artikel 2',
      content: 'Manfaat Pola Makan Sehat untuk Meningkatkan Imun Tubuh Secara Optimal..',
      author: 'ADMIN',
      date: 'August 10, 2024',
    },
    {
      id: 3,
      title: 'Artikel 3',
      content: 'Tips Berolahraga di Rumah untuk Menjaga Kebugaran di Masa Pandemi..',
      author: 'ADMIN',
      date: 'September 5, 2024',
    },
  ];

  const articlesGrid = document.getElementById('articles-grid');

  // Function to render articles
  const renderArticles = () => {
    articlesGrid.innerHTML = ''; // Clear the grid
    articles.forEach((article) => {
      const articleCard = document.createElement('div');
      articleCard.classList.add('article-card');
      articleCard.setAttribute('data-id', article.id); // Add data-id for easy reference

      articleCard.innerHTML = `
        <h4 class="article-title">${article.title}</h4>
        <p class="article-content">${article.content}</p>
        <div class="article-footer">
          <span class="author">${article.author}</span>
          <span class="date">${article.date}</span>
          <div class="actions">
            <button class="btn delete" data-id="${article.id}">HAPUS</button>
            <button class="btn edit" data-id="${article.id}">EDIT</button>
          </div>
        </div>
      `;

      articlesGrid.appendChild(articleCard);
    });
  };

  // Initial rendering of articles
  renderArticles();

  // Event listener for delete and edit actions
  articlesGrid.addEventListener('click', (event) => {
    if (event.target.classList.contains('delete')) {
      const articleId = parseInt(event.target.dataset.id, 10); // Get the ID of the article
      // Remove article from the array
      const articleIndex = articles.findIndex((article) => article.id === articleId);
      if (articleIndex !== -1) {
        articles.splice(articleIndex, 1); // Remove article from the array
        renderArticles(); // Re-render the articles
        alert(`Artikel dengan ID ${articleId} berhasil dihapus.`);
      }
    }

    if (event.target.classList.contains('edit')) {
      const articleId = parseInt(event.target.dataset.id, 10);
      alert(`Artikel dengan ID ${articleId} akan diedit.`);
      window.location.href = '../ARTIKELADMIN/editart.html';
    }
  });
});
