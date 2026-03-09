window.addEventListener('DOMContentLoaded', () => {
  const supportsHover = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
  if (!supportsHover) return;

  const links = Array.from(document.querySelectorAll('.project-link[data-hover-video]'));
  if (!links.length) return;

  links.forEach((link) => {
    const videoSrc = link.getAttribute('data-hover-video');
    if (!videoSrc) return;

    const video = document.createElement('video');
    video.className = 'project-link-hover-video';
    video.src = videoSrc;
    video.muted = true;
    video.loop = true;
    video.playsInline = true;
    video.preload = 'metadata';
    video.setAttribute('aria-hidden', 'true');
    link.appendChild(video);

    link.addEventListener('mouseenter', () => {
      video.currentTime = 0;
      const playPromise = video.play();
      if (playPromise && typeof playPromise.catch === 'function') {
        playPromise.catch(() => {});
      }
    });

    link.addEventListener('mouseleave', () => {
      video.pause();
      video.currentTime = 0;
    });
  });
});
