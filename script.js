window.addEventListener('load', () => {
  setTimeout(() => {
    const main = document.getElementById('main');
    main.classList.remove('hidden');
    requestAnimationFrame(() => {
      main.style.opacity = '1';
    });
  }, 2500);
});
