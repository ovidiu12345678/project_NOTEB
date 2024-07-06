document.addEventListener('DOMContentLoaded', function () {
  const leftArrow = document.querySelector('.left-arrow');
  const rightArrow = document.querySelector('.right-arrow');
  const categoryContainer = document.querySelector('.category');
  const categories = document.querySelectorAll('.category-item');
  const indicators = document.querySelectorAll('.category-indicators .indicator');
  let currentIndex = 0;
  let xStart = null;

  function updateCategory(index) {
      if (categoryContainer) {
          categoryContainer.style.transform = `translateX(-${index * 100}%)`;
          updateIndicators();
      }
  }

  function updateIndicators() {
      indicators.forEach((indicator, index) => {
          indicator.classList.toggle('active', index === currentIndex);
      });
  }

  function goToNextCategory() {
      if (currentIndex < categories.length - 1) {
          currentIndex++;
          updateCategory(currentIndex);
      }
  }

  function goToPreviousCategory() {
      if (currentIndex > 0) {
          currentIndex--;
          updateCategory(currentIndex);
      }
  }

  if (leftArrow) {
      leftArrow.addEventListener('click', function () {
          goToPreviousCategory();
      });

      
      leftArrow.addEventListener('touchstart', handleTouchStart, false);
      leftArrow.addEventListener('touchend', handleTouchEnd, false);
  }

  if (rightArrow) {
      rightArrow.addEventListener('click', function () {
          goToNextCategory();
      });

      
      rightArrow.addEventListener('touchstart', handleTouchStart, false);
      rightArrow.addEventListener('touchend', handleTouchEnd, false);
  }

  function handleTouchStart(evt) {
      const firstTouch = evt.touches[0];
      xStart = firstTouch.clientX;
  }

  function handleTouchEnd(evt) {
      if (xStart === null) return;

      const xEnd = evt.changedTouches[0].clientX;
      const xDiff = xStart - xEnd;

      if (Math.abs(xDiff) > 50) { 
          if (xDiff > 0) {
              goToNextCategory();
          } else {
              goToPreviousCategory();
          }
      }

      xStart = null;
  }

  document.addEventListener('wheel', function (event) {
      if (event.deltaY < 0) { 
          goToPreviousCategory();
      } else if (event.deltaY > 0) { 
          goToNextCategory();
      }
  });

  indicators.forEach(indicator => {
      indicator.addEventListener('click', () => {
          currentIndex = parseInt(indicator.getAttribute('data-index'));
          updateCategory(currentIndex);
      });
  });

  
  updateCategory(currentIndex);
});


