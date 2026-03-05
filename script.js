// ── Mobile menu toggle ──────────────────────────────────────────────────────
let menuIcon = document.querySelector('#menu-icon');
let navbar = document.querySelector('.navbar');

menuIcon.onclick = () => {
  menuIcon.classList.toggle('bx-x');
  navbar.classList.toggle('active');
};

// ── Video Modal ─────────────────────────────────────────────────────────────
const videoModal = document.getElementById('videoModal');
const videoFrame = document.getElementById('videoFrame');

/**
 * Converts various video URL formats into embeddable URLs.
 * Supports YouTube (watch, youtu.be, shorts) and Facebook video links.
 */
function getEmbedUrl(url) {
  // YouTube: https://www.youtube.com/watch?v=ID
  let yt = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/shorts\/)([^&?/]+)/);
  if (yt) return `https://www.youtube.com/embed/${yt[1]}?autoplay=1&rel=0`;

  // Facebook: https://www.facebook.com/watch/?v=ID  or /videos/ID
  let fb = url.match(/facebook\.com\/(?:watch\/?\?v=|.*\/videos\/)(\d+)/);
  if (fb) return `https://www.facebook.com/plugins/video.php?href=${encodeURIComponent(url)}&autoplay=true`;

  // If already an embed URL or unknown, use as-is
  return url;
}

function openVideoModal(url) {
  videoFrame.src = getEmbedUrl(url);
  videoModal.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeVideoModal() {
  videoModal.classList.remove('active');
  videoFrame.src = ''; // stop video playback
  document.body.style.overflow = '';
}

// Close when clicking outside the modal content
function closeVideoModalOutside(event) {
  if (event.target === videoModal) closeVideoModal();
}

// Close with Escape key
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') closeVideoModal();
});