document.addEventListener("DOMContentLoaded", function () {
  const BASE_URL = "https://be-gohealthy-production.up.railway.app/api/";
  const token = localStorage.getItem("token");
  const historyList = document.getElementById("schedule-container");

  // Cek token login
  if (!token) {
    Swal.fire({
      icon: "error",
      title: "Error",
      text: "Anda belum login.",
    }).then(() => {
      window.location.href = "/login.html";
    });
    return;
  }

  // Fungsi untuk memuat jadwal
  const loadSchedules = async () => {
    try {
      const response = await fetch(`${BASE_URL}users/schedule`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "X-API-TOKEN": token,
        },
      });

      if (!response.ok) {
        throw new Error("Gagal memuat data jadwal!");
      }

      const { data: schedules } = await response.json();
      displaySchedules(schedules);
    } catch (error) {
      console.error("Load schedules error:", error.message);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Gagal memuat data jadwal.",
      });
    }
  };

  // Fungsi untuk menampilkan jadwal
  const displaySchedules = (schedules) => {
    historyList.innerHTML = ""; // Kosongkan elemen terlebih dahulu

    if (schedules.length === 0) {
      historyList.innerHTML = "<p>Tidak ada jadwal yang tersedia.</p>";
      return;
    }

    schedules.forEach((item) => {
      const scheduleItem = document.createElement("div");
      scheduleItem.classList.add("schedule-item");
      scheduleItem.innerHTML = `
        <div>
          <h3>${item.scheduleName}</h3>
          <p>${item.scheduleDescription}</p>
          <p><strong>Waktu:</strong> ${new Date(item.scheduleTime).toLocaleString()}</p>
          <p><strong>Tipe:</strong> ${item.scheduleType}</p>
        </div>
        <div class="buttons">
          <button class="edit-button" data-id="${item.scheduleId}">Edit</button>
          <button class="delete-button" data-id="${item.scheduleId}">Delete</button>
        </div>
      `;
      historyList.appendChild(scheduleItem);
    });

    // Tambahkan event listener untuk tombol edit dan delete
    document.querySelectorAll(".edit-button").forEach((button) => {
      button.addEventListener("click", handleEdit);
    });

    document.querySelectorAll(".delete-button").forEach((button) => {
      button.addEventListener("click", async function () {
        const scheduleId = this.getAttribute("data-id");
        deleteSchedule(scheduleId);
      });
    });
  };

  // Fungsi untuk menghapus jadwal
  const deleteSchedule = async (scheduleId) => {
    try {
      const response = await fetch(`${BASE_URL}schedule/${scheduleId}`, {
        method: "DELETE",
        headers: {
          "X-API-TOKEN": token,
        },
      });

      if (!response.ok) {
        throw new Error("Gagal menghapus jadwal!");
      }

      loadSchedules(); // Muat ulang data setelah penghapusan
    } catch (error) {
      console.error("Delete schedule error:", error.message);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: error.message,
      });
    }
  };

 // Fungsi untuk menangani klik tombol edit
const handleEdit = async (e) => {
  const scheduleId = e.target.getAttribute("data-id");
  
  try {
    // Ambil data schedule yang akan diedit
    const response = await fetch(`${BASE_URL}schedule/${scheduleId}`, {
      method: "GET",
      headers: {
        "X-API-TOKEN": token,
      },
    });

    if (!response.ok) {
      throw new Error("Gagal mengambil data jadwal!");
    }

    const { data: item } = await response.json();

    // Tampilkan form edit menggunakan SweetAlert
    const { value: formValues } = await Swal.fire({
      title: "Edit Jadwal",
      html: `
        <input id="swal-input1" class="swal2-input" placeholder="Nama jadwal" value="${item.scheduleName}">
        <input id="swal-input2" class="swal2-input" placeholder="Deskripsi" value="${item.scheduleDescription}">
        <input id="swal-input3" class="swal2-input" type="datetime-local" value="${new Date(item.scheduleTime).toISOString().slice(0, 16)}">
        <input id="swal-input4" class="swal2-input" placeholder="Tipe Jadwal" value="${item.scheduleType}">
      `,
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

    // Jika ada nilai dari form edit, kirim update ke API
    if (formValues) {
      const [scheduleName, scheduleDescription, scheduleTime, scheduleType] = formValues;

      const data = {
        scheduleName,
        scheduleDescription,
        scheduleTime: new Date(scheduleTime).toISOString(),
        scheduleType,
      };

      // Kirim data update ke API
      const updateResponse = await fetch(`${BASE_URL}schedule/${scheduleId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "X-API-TOKEN": token,
        },
        body: JSON.stringify(data),
      });

      if (!updateResponse.ok) {
        throw new Error("Gagal mengubah data!");
      }

      // Muat ulang jadwal setelah pengeditan
      loadSchedules();
      Swal.fire({
        icon: "success",
        title: "Data berhasil diubah!",
        showConfirmButton: false,
        timer: 2000,
      });
    }
  } catch (error) {
    console.error("Edit schedule error:", error.message);
    Swal.fire({
      icon: "error",
      title: "Error",
      text: error.message,
    });
  }
};  

  // Muat jadwal saat halaman dimuat
  loadSchedules();
});
