document.addEventListener('DOMContentLoaded', () => {
    const titleInput = document.getElementById('article-title');
    const contentTextarea = document.getElementById('article-content');
    const saveButton = document.getElementById('save-button');
  
    saveButton.addEventListener('click', () => {
      const updatedTitle = titleInput.value.trim();
      const updatedContent = contentTextarea.value.trim();
  
      if (updatedTitle === '' || updatedContent === '') {
        alert('Judul dan konten tidak boleh kosong!');
        return;
      }
  
      // Simpan perubahan (dapat diganti dengan pengiriman ke server)
      console.log('Judul diperbarui:', updatedTitle);
      console.log('Konten diperbarui:', updatedContent);
  
      alert('Artikel berhasil disimpan!');
      window.location.href = '../HOME ADMIN/login.html';
    });
  });
  