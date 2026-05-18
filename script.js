// 🎯 Ganti tanggal target sesuai kebutuhan (format: YYYY-MM-DDTHH:MM:SS)
// Contoh: 20 Mei 2026 jam 00:00
const TARGET_DATE = new Date("2026-05-20T00:00:00").getTime();

// 🎵 Audio control
const bgMusic = document.getElementById("bg-music");
const musicToggle = document.getElementById("music-toggle");
let isPlaying = false;

musicToggle.addEventListener("click", () => {
  if (isPlaying) {
    bgMusic.pause();
    musicToggle.textContent = "🔇 Putar Musik";
  } else {
    bgMusic.play().catch(e => {
      console.log("Autoplay dicegah browser, user interaction diperlukan");
      alert("🎵 Klik OK untuk memutar musik latar");
      bgMusic.play();
    });
    musicToggle.textContent = "🔊 Musik Sedang Diputar";
  }
  isPlaying = !isPlaying;
});

// ⏰ Countdown logic
function updateCountdown() {
  const now = new Date().getTime();
  const distance = TARGET_DATE - now;

  if (distance < 0) {
    // Countdown selesai → tampilkan reveal
    document.getElementById("countdown").style.display = "none";
    document.getElementById("reveal-section").classList.remove("hidden");
    
    // Auto play music jika belum
    if (!isPlaying) {
      bgMusic.play().catch(() => {});
      musicToggle.textContent = "🔊 Musik Sedang Diputar";
      isPlaying = true;
    }
    return;
  }

  const days = Math.floor(distance / (1000 * 60 * 60 * 24));
  const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((distance % (1000 * 60)) / 1000);

  document.getElementById("days").textContent = String(days).padStart(2, '0');
  document.getElementById("hours").textContent = String(hours).padStart(2, '0');
  document.getElementById("minutes").textContent = String(minutes).padStart(2, '0');
  document.getElementById("seconds").textContent = String(seconds).padStart(2, '0');
}

// Update setiap detik
setInterval(updateCountdown, 1000);
updateCountdown(); // Jalankan langsung saat load

// ✨ Efek partikel hearts (opsional, ringan)
document.addEventListener("DOMContentLoaded", () => {
  // Tambahkan floating hearts secara acak
  setInterval(() => {
    if (Math.random() > 0.7) {
      createHeart();
    }
  }, 800);
});

function createHeart() {
  const heart = document.createElement("div");
  heart.innerHTML = "💕";
  heart.style.cssText = `
    position: fixed;
    bottom: -20px;
    left: ${Math.random() * 100}vw;
    font-size: ${12 + Math.random() * 16}px;
    animation: floatUp ${3 + Math.random() * 3}s linear forwards;
    pointer-events: none;
    z-index: 0;
    opacity: 0.8;
  `;
  document.body.appendChild(heart);
  
  setTimeout(() => heart.remove(), 6000);
}

// Tambahkan keyframes untuk animasi heart via JS
const style = document.createElement("style");
style.textContent = `
  @keyframes floatUp {
    to {
      transform: translateY(-120vh) rotate(${Math.random() * 720 - 360}deg);
      opacity: 0;
    }
  }
`;
document.head.appendChild(style);