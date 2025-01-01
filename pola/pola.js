const saveButton = document.getElementById("save-button");
const historyList = document.querySelector(".history-list");
const BASE_URL = "https://be-gohealthy-production.up.railway.app/api/";

// Fungsi untuk memuat riwayat makanan dari backend
const loadHistory = async () => {
  try {
    const token = localStorage.getItem("token");
    if (!token) throw new Error("Unauthorized: Token is missing!");

    const response = await fetch(`${BASE_URL}users/food-consumption`, {
      method: "GET",
      headers: {
        "X-API-TOKEN": token,
      },
    });

    if (!response.ok) {
      const errorResponse = await response.json();
      throw new Error(errorResponse.errors || "Gagal memuat data!");
    }

    const historyData = await response.json();
    console.log("History data received:", historyData); // Log data received
    displayHistory(historyData.data);
  } catch (error) {
    console.error("Load history error:", error.message);
    Swal.fire({
      icon: "error",
      title: "Error",
      text: error.message,
    });
  }
};

// Fungsi untuk menyimpan riwayat makanan ke backend
const saveHistory = async (data) => {
  try {
    const token = localStorage.getItem("token");
    if (!token) throw new Error("Unauthorized: Token is missing!");

    const response = await fetch(`${BASE_URL}food-consumption`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-API-TOKEN": token,
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const errorResponse = await response.json();
      throw new Error(errorResponse.errors || "Gagal menyimpan data!");
    }

    const responseData = await response.json();
    console.log("Data berhasil disimpan:", responseData);

    loadHistory(); // Reload history after saving

    // Tampilkan animasi sukses menggunakan SweetAlert2
    Swal.fire({
      icon: "success",
      title: "Data berhasil disimpan!",
      showConfirmButton: false,
      timer: 2000,
    });
  } catch (error) {
    console.error("Save history error:", error.message);
    Swal.fire({
      icon: "error",
      title: "Error",
      text: error.message,
    });
  }
};

// Fungsi untuk mengirim permintaan DELETE ke backend
const deleteHistory = async (foodId) => {
  try {
    const token = localStorage.getItem("token");
    if (!token) throw new Error("Unauthorized: Token is missing!");

    const response = await fetch(`${BASE_URL}food-consumption/${foodId}`, {
      method: "DELETE",
      headers: {
        "X-API-TOKEN": token,
      },
    });

    if (!response.ok) {
      throw new Error("Failed to delete history");
    }

    const result = await response.json();
    if (result.data !== "OK") {
      throw new Error("Failed to delete history");
    }

    loadHistory(); // Reload history after deletion
  } catch (error) {
    console.error("Delete history error:", error.message);
    Swal.fire({
      icon: "error",
      title: "Error",
      text: error.message,
    });
  }
};

// Fungsi untuk menampilkan riwayat makanan
const displayHistory = (history) => {
  console.log("Displaying history:", history); // Log data to be displayed
  historyList.innerHTML = "";

  history.forEach((item) => {
    const historyItem = document.createElement("div");
    historyItem.classList.add("history-item");
    historyItem.innerHTML = `
      <div>
        <p><strong>${item.foodName}:</strong> ${item.calories} kal (x${
      item.quantity
    })</p>
        <p>Total Kalori: ${item.calories * item.quantity} kal</p>
        <span>${new Date(item.consumptionDate).toLocaleDateString()}</span>
      </div>
      <div class="buttons">
        <button class="edit-button" data-id="${item.foodId}">Edit</button>
        <button class="delete-button" data-id="${item.foodId}">Delete</button>
      </div>
    `;
    historyList.appendChild(historyItem);
  });

  // Tambahkan event listener untuk tombol edit dan delete
  document.querySelectorAll(".edit-button").forEach((button) => {
    button.addEventListener("click", handleEdit);
  });

  document.querySelectorAll(".delete-button").forEach((button) => {
    button.addEventListener("click", async function () {
      const foodId = this.getAttribute("data-id");
      deleteHistory(foodId); // Call delete function directly
    });
  });
};

// Fungsi untuk menangani klik tombol edit
const handleEdit = async (e) => {
  const foodId = e.target.getAttribute("data-id");

  try {
    const token = localStorage.getItem("token");
    if (!token) throw new Error("Unauthorized: Token is missing!");

    const response = await fetch(`${BASE_URL}food-consumption/${foodId}`, {
      method: "GET",
      headers: {
        "X-API-TOKEN": token,
      },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch history");
    }

    const { data: item } = await response.json();

    const { value: formValues } = await Swal.fire({
      title: "Edit Food Consumption",
      html:
        `<input id="swal-input1" class="swal2-input" placeholder="Nama konsumsi" value="${item.foodName}">` +
        `<input id="swal-input2" class="swal2-input" placeholder="Kalori" type="number" value="${item.calories}">` +
        `<input id="swal-input3" class="swal2-input" placeholder="Tanggal konsumsi" type="date" value="${
          new Date(item.consumptionDate).toISOString().split("T")[0]
        }">` +
        `<input id="swal-input4" class="swal2-input" placeholder="Quantity" type="number" value="${item.quantity}">`,
      focusConfirm: false,
      preConfirm: () => {
        return [
          document.getElementById("swal-input1").value,
          document.getElementById("swal-input2").value,
          document.getElementById("swal-input3").value,
          document.getElementById("swal-input4").value,
        ];
      },
    });

    if (formValues) {
      const [foodName, calories, consumptionDate, quantity] = formValues;

      const data = {
        foodName,
        calories: parseFloat(calories),
        consumptionDate: new Date(consumptionDate).toISOString(),
        quantity: parseInt(quantity, 10),
      };

      const updateResponse = await fetch(
        `${BASE_URL}food-consumption/${foodId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            "X-API-TOKEN": token,
          },
          body: JSON.stringify(data),
        }
      );

      if (!updateResponse.ok) {
        const errorResponse = await updateResponse.json();
        throw new Error(errorResponse.errors || "Gagal mengubah data!");
      }

      const responseData = await updateResponse.json();
      console.log("Data berhasil diubah:", responseData);

      loadHistory(); // Reload history after editing

      // Tampilkan animasi sukses menggunakan SweetAlert2
      Swal.fire({
        icon: "success",
        title: "Data berhasil diubah!",
        showConfirmButton: false,
        timer: 2000,
      });
    }
  } catch (error) {
    console.error("Edit history error:", error.message);
    Swal.fire({
      icon: "error",
      title: "Error",
      text: error.message,
    });
  }
};

// Fungsi untuk menampilkan custom alert
const showAlert = (message) => {
  Swal.fire({
    icon: "error",
    title: "Error",
    text: message,
  });
};

// Event listener untuk tombol simpan
saveButton.addEventListener("click", (e) => {
  e.preventDefault();

  const date = document.getElementById("date").value;
  const food = document.getElementById("food").value;
  const calories = document.getElementById("calories").value;
  const quantity = document.getElementById("quantity").value;

  if (date && food && calories && quantity) {
    const data = {
      foodName: food,
      calories: parseFloat(calories),
      consumptionDate: new Date(date).toISOString(),
      quantity: parseInt(quantity, 10),
    };

    // Simpan data ke API
    saveHistory(data);

    // Reset form
    document.querySelector("form").reset();
  } else {
    Swal.fire({
      icon: "warning",
      title: "Warning",
      text: "Harap isi semua field!",
    });
  }
});

// Load history saat halaman pertama kali dimuat
document.addEventListener("DOMContentLoaded", loadHistory);
