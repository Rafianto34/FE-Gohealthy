document.addEventListener("DOMContentLoaded", function () {
  const token = localStorage.getItem("token");
  const saveButton = document.querySelector(".add-button"); // Menggunakan class "add-button"
  const BASE_URL = "https://be-gohealthy-production.up.railway.app/api/";

  saveButton.addEventListener("click", (e) => {
    e.preventDefault(); // Hindari reload halaman

    const scheduleName = document.getElementById("scheduleName").value;
    const scheduleDescription = document.getElementById("scheduleDescription").value;
    const scheduleTime = document.getElementById("scheduleTime").value;
    const scheduleType = document.getElementById("scheduleType").value;

    if (scheduleName && scheduleDescription && scheduleTime && scheduleType) {
      const data = {
        scheduleName :scheduleName,
        scheduleDescription : scheduleDescription,
        scheduleTime: scheduleTime,
        scheduleType: scheduleType,
      };

      console.log("Data yang dikirim:", data); // Debugging
      saveSchedule(data); // Simpan data ke backend
    } else {
      Swal.fire({
        icon: "warning",
        title: "Warning",
        text: "Harap isi semua field!",
      });
    }
  });

  const saveSchedule = async (data) => {
    try {
      const response = await fetch(`${BASE_URL}schedule`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-API-TOKEN": token,
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        Swal.fire({
          icon: "success",
          title: "Jadwal berhasil tersimpan!",
          showConfirmButton: false,
          timer: 1500,
        }).then(() => {
          window.location.href = '/schedule'; // Redirect to dashboard
        });
      } else {
        const errorResult = await response.json();
        Swal.fire({
          icon: "error",
          title: "Error",
          text: errorResult.errors || "Failed to add schedule.",
        });
      }
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "An error occurred while adding schedule.",
      });
      console.error("Error:", err);
    }
  };
});
