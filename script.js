// Simple example script to demonstrate interaction
document.addEventListener('DOMContentLoaded', () => {
  const distroGrid = document.getElementById('distroGrid');

  distroGrid.addEventListener('click', (event) => {
    // If the clicked element or its parent has .card
    const card = event.target.closest('.card');
    if (card) {
      const titleElem = card.querySelector('.card-title');
      if (titleElem) {
        console.log("Card clicked:", titleElem.textContent);
      }
    }
  });
});
