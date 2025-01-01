function updateForm() {
    const category = document.getElementById('category').value;
    const dynamicFields = document.getElementById('dynamic-fields');
  }
  
  document.getElementById('add-btn').addEventListener('click', function () {
    const category = document.getElementById('category').value;
    const date = document.getElementById('date-input').value;
    const time = document.getElementById('time-input').value;
    const judul = document.getElementById('judul').value;
    const catatan = document.getElementById('catatan').value;
  
    // Collect dynamic fields
    const dynamicInputs = document.querySelectorAll('#dynamic-fields input');
    const dynamicData = {};
    dynamicInputs.forEach(input => {
      dynamicData[input.id] = input.value;
    });
  
    console.log('Category:', category);
    console.log('Date:', date);
    console.log('Time:', time);
    console.log('Judul:', judul);
    console.log('Dynamic Data:', dynamicData);
    console.log('Catatan:', catatan);
  
    alert('Data berhasil ditambahkan!');
  });
  