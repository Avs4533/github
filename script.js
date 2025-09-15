document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.card button').forEach(btn => {
    btn.addEventListener('click', () => {
      const product = btn.closest('.card').querySelector('h3').textContent;
      alert(`${product} added to cart!`);
    });
  });
});