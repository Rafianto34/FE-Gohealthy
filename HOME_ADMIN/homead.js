document.addEventListener("DOMContentLoaded", () => {
  const API_URL = "https://jsonplaceholder.typicode.com/posts"; // API contoh
  const quotesGrid = document.getElementById("quotes-grid");

  // Function to fetch and render quotes
  const loadQuotes = async () => {
    try {
      const response = await fetch(API_URL);
      const quotes = await response.json();

      // Clear the quotes grid
      quotesGrid.innerHTML = "";

      // Loop through the quotes and render each one
      quotes.slice(0, 10).forEach((quote, index) => { // Limiting to 10 quotes for this example
        const quoteCard = document.createElement("div");
        quoteCard.classList.add("quote-card");

        quoteCard.innerHTML = `
          <p class="quote-text">${quote.body}</p>
          <div class="actions">
            <button class="btn edit" data-id="${quote.id}">EDIT</button>
            <button class="btn delete" data-id="${quote.id}">HAPUS</button>
          </div>
        `;

        quotesGrid.appendChild(quoteCard);
      });
    } catch (error) {
      console.error("Error fetching quotes:", error);
    }
  };

  // Event listener for delete and edit actions
  quotesGrid.addEventListener("click", (event) => {
    if (event.target.classList.contains("delete")) {
      const quoteId = event.target.dataset.id;
      alert(`Quote with ID ${quoteId} will be deleted.`);
      // Add DELETE request to API here if needed
    }

    if (event.target.classList.contains("edit")) {
      const quoteId = event.target.dataset.id;
      alert(`Quote with ID ${quoteId} will be edited.`);
      // Add EDIT logic here
    }
  });

  // Load quotes on page load
  loadQuotes();
});
