window.addEventListener('DOMContentLoaded', () => {
  const supportsHover = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
  if (!supportsHover) return;

  const triggers = Array.from(document.querySelectorAll('.logo-hover-trigger'));
  if (!triggers.length) return;

  const preview = document.createElement('img');
  preview.className = 'cursor-logo-preview';
  preview.alt = '';
  preview.setAttribute('aria-hidden', 'true');
  document.body.appendChild(preview);

  let activeTrigger = null;

  const updatePosition = (event) => {
    if (!activeTrigger) return;
    const x = event.clientX + 18;
    const y = event.clientY + 18;
    preview.style.transform = `translate(${x}px, ${y}px)`;
  };

  const showPreview = (trigger, event) => {
    const srcFromAttr = trigger.getAttribute('data-logo-src');
    if (srcFromAttr) {
      preview.src = srcFromAttr;
      preview.style.display = 'block';
      document.body.classList.add('cursor-logo-active');
      activeTrigger = trigger;
      updatePosition(event);
      return;
    }

    const targetId = trigger.getAttribute('data-logo-target');
    const figure = targetId
      ? document.getElementById(targetId)
      : trigger.closest('.project-logo-container');
    const logo = figure ? figure.querySelector('img') : null;
    if (!logo) return;

    preview.src = logo.getAttribute('src') || '';
    preview.style.display = 'block';
    document.body.classList.add('cursor-logo-active');
    activeTrigger = trigger;
    updatePosition(event);
  };

  const hidePreview = () => {
    activeTrigger = null;
    preview.style.display = 'none';
    preview.removeAttribute('src');
    document.body.classList.remove('cursor-logo-active');
  };

  triggers.forEach((trigger) => {
    trigger.addEventListener('mouseenter', (event) => showPreview(trigger, event));
    trigger.addEventListener('mousemove', updatePosition);
    trigger.addEventListener('mouseleave', hidePreview);
  });

  window.addEventListener('blur', hidePreview);
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) hidePreview();
  });
});
