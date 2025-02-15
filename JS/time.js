function updateDateTime() {
	let now = new Date();

	// Ambil tanggal
	let days = ["Minggu", "Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu"];
	let months = ["Januari", "Februari", "Maret", "April", "Mei", "Juni", "Juli", "Agustus", "September", "Oktober", "November", "Desember"];

	let dayName = days[now.getDay()];
	let date = now.getDate();
	let month = months[now.getMonth()];
	let year = now.getFullYear();

	// Format waktu
	let hours = now.getHours().toString().padStart(2, "0");
	let minutes = now.getMinutes().toString().padStart(2, "0");
	let seconds = now.getSeconds().toString().padStart(2, "0");

	// Set teks di elemen
	document.getElementById("date").innerText = `${dayName}, ${date} ${month} ${year}`;
	document.getElementById("time").innerText = `${hours}:${minutes}:${seconds}`;
}

// Panggil fungsi pertama kali
updateDateTime();

// Update setiap 1 detik
setInterval(updateDateTime, 1000);
