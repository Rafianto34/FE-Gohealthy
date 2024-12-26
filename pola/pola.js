const saveButton = document.getElementById('save-button');
const historyList = document.querySelector('.history-list');

saveButton.addEventListener('click', (e) => {
  e.preventDefault();

  const food = document.getElementById('food').value;
  const foodCalories = document.getElementById('food-calories').value;
  const drink = document.getElementById('drink').value;
  const drinkCalories = document.getElementById('drink-calories').value;
  const date = document.getElementById('date').value;

  if (food && foodCalories && drink && drinkCalories && date) {
    const historyItem = document.createElement('div');
    historyItem.classList.add('history-item');
    historyItem.innerHTML = `
      <p><strong>${food}:</strong> ${foodCalories} kal</p>
      <p><strong>${drink}:</strong> ${drinkCalories} kal</p>
      <p>Total: ${+foodCalories + +drinkCalories} kal</p>
      <span>${new Date(date).toLocaleDateString()}</span>
    `;
    historyList.appendChild(historyItem);
  } else {
    alert('Harap isi semua field!');
  }
});
