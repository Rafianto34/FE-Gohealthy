function updateForm() {
    const category = document.getElementById('category').value;
    const dynamicFields = document.getElementById('dynamic-fields');
  
    if (category === 'makan') {
      dynamicFields.innerHTML = `
        <label for="nama">Nama Makanan</label>
        <input type="text" id="nama" placeholder="Nama Makanan">
  
        <label for="kalori">Total Kalori</label>
        <input type="number" id="kalori" placeholder="Kalori">
      `;
    } else if (category === 'obat') {
      dynamicFields.innerHTML = `
        <label for="jenis-obat">Jenis Obat</label>
        <input type="text" id="jenis-obat" placeholder="Jenis Obat">
  
        <label for="dosis">Dosis Obat</label>
        <input type="text" id="dosis" placeholder="Dosis Obat (misal: 3x sehari)">
      `;
    } else if (category === 'olahraga') {
      dynamicFields.innerHTML = `
        <label for="jarak">Total Jarak</label>
        <input type="text" id="jarak" placeholder="Total Jarak (misal: 5 km)">
  
        <label for="kalori">Total Kalori</label>
        <input type="number" id="kalori" placeholder="Kalori">
      `;
    }
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
  