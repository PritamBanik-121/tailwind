
const menuBtn = document.getElementById('menu-btn');
const navLinks = document.getElementById('nav-links');

// Toggle nav on menu button click
menuBtn.addEventListener('click', () => {
  navLinks.classList.toggle('hidden');
});

// Close nav when a link is clicked (on small screens)
navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    if (window.innerWidth < 640) {
      navLinks.classList.add('hidden');
    }
  });
});

// Close nav when clicking outside on small screens
document.addEventListener('click', function (event) {
  if (
    window.innerWidth < 640 &&
    !navLinks.classList.contains('hidden') &&
    !navLinks.contains(event.target) &&
    event.target !== menuBtn &&
    !menuBtn.contains(event.target)
  ) {
    navLinks.classList.add('hidden');
  }
});
document.addEventListener("DOMContentLoaded", function () {
  var typed = new Typed("#auto-type",{
    strings : [
    "Fat Loss",
    "Weightlifting",
    "Running",
    "Physical Fitness",
    "Strength Training",
    "Weight Gain"
  ],
    typeSpeed: 50,
    backSpeed: 50,
    backDelay: 1000,
    loop: true

  });
});

      // let cards = document.querySelectorAll(".card");

      // let stackArea = document.querySelector(".services");

      // function rotateCards() {
      //   let angle = 0;
      //   cards.forEach((card, index) => {
      //     if (card.classList.contains("away")) {
      //       card.style.transform = `translateY(-120vh) rotate(-48deg)`;
      //     } else {
      //       card.style.transform = ` rotate(${angle}deg)`;
      //       angle = angle - 10;
      //       card.style.zIndex = cards.length - index;
      //     }
      //   });
      // }

      // rotateCards();

 var swiper = new Swiper(".mySwiper", {
      spaceBetween: 30,
      centeredSlides: true,
      autoplay: {
        delay: 2500,
        disableOnInteraction: false,
      },
      pagination: {
        el: ".swiper-pagination",
        clickable: true,
      },
      navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
      },
    });

    var video = document.querySelector(".video");
    var circle = document.querySelector(".circle");

    video.addEventListener("mouseenter", function () {
      gsap.to(circle,{
        scale:1,
        opacity:1
      })
    });
    video.addEventListener("mouseleave", function () {
      gsap.to(circle,{
        scale:0,
        opacity:0
      })
    });

    video.addEventListener("mousemove",function(dets){
      gsap.to(circle,{
        left:dets.x,
        top:dets.y
      })
    })

    function goToNews(id) {
  window.location.href = `card.html?id=${id}`;
}

class SymmetricCarousel {
  constructor() {
    this.container = document.getElementById('carouselInner');
    this.cards = [...document.querySelectorAll('.carousel-card')];
    this.dots = [...document.querySelectorAll('#indicatorDots div')];
    this.currentIndex = 0;
    this.totalCards = this.cards.length;
    this.isAnimating = false;
    
    // Swipe handling
    this.startX = 0;
    this.currentX = 0;
    this.isDragging = false;
    this.threshold = 50;
    
    // Auto-play functionality
    this.autoPlayInterval = null;
    this.autoPlayDelay = 3000; // 3 seconds
    this.isAutoPlaying = true;
    this.pauseTimeout = null;
    
    this.init();
  }

  init() {
    this.setupSwipeEvents();
    this.setupAutoPlay();
    this.updateCarousel();
    this.startAutoPlay();
  }

  setupSwipeEvents() {
    // Touch events
    this.container.addEventListener('touchstart', (e) => this.handleStart(e), { passive: false });
    this.container.addEventListener('touchmove', (e) => this.handleMove(e), { passive: false });
    this.container.addEventListener('touchend', (e) => this.handleEnd(e));

    // Mouse events
    this.container.addEventListener('mousedown', (e) => this.handleStart(e));
    this.container.addEventListener('mousemove', (e) => this.handleMove(e));
    this.container.addEventListener('mouseup', (e) => this.handleEnd(e));
    this.container.addEventListener('mouseleave', (e) => this.handleEnd(e));

    // Prevent default behaviors
    this.container.addEventListener('dragstart', (e) => e.preventDefault());
    this.container.addEventListener('selectstart', (e) => e.preventDefault());
  }

  setupAutoPlay() {
    // Pause auto-play when user hovers over carousel
    this.container.addEventListener('mouseenter', () => this.pauseAutoPlay());
    this.container.addEventListener('mouseleave', () => this.resumeAutoPlayDelayed());
    
    // Pause auto-play when user touches/interacts
    this.container.addEventListener('touchstart', () => this.pauseAutoPlay());
    
    // Optional: Pause when page is not visible
    document.addEventListener('visibilitychange', () => {
      if (document.hidden) {
        this.pauseAutoPlay();
      } else {
        this.resumeAutoPlayDelayed();
      }
    });
  }

  startAutoPlay() {
    if (this.autoPlayInterval) return;
    
    this.autoPlayInterval = setInterval(() => {
      if (this.isAutoPlaying && !this.isDragging && !this.isAnimating) {
        this.goToNext();
      }
    }, this.autoPlayDelay);
  }

  pauseAutoPlay() {
    this.isAutoPlaying = false;
    if (this.autoPlayInterval) {
      clearInterval(this.autoPlayInterval);
      this.autoPlayInterval = null;
    }
    if (this.pauseTimeout) {
      clearTimeout(this.pauseTimeout);
      this.pauseTimeout = null;
    }
  }

  resumeAutoPlay() {
    this.isAutoPlaying = true;
    this.startAutoPlay();
  }

  resumeAutoPlayDelayed(delay = 2000) {
    if (this.pauseTimeout) {
      clearTimeout(this.pauseTimeout);
    }
    
    this.pauseTimeout = setTimeout(() => {
      this.resumeAutoPlay();
    }, delay);
  }

  handleStart(e) {
    if (this.isAnimating) return;
    
    this.isDragging = true;
    this.startX = this.getEventX(e);
    
    // Pause auto-play during user interaction
    this.pauseAutoPlay();
    
    // Disable transitions during drag
    this.cards.forEach(card => {
      card.style.transition = 'none';
    });
    
    e.preventDefault();
  }

  handleMove(e) {
    if (!this.isDragging || this.isAnimating) return;
    
    this.currentX = this.getEventX(e);
    const deltaX = this.currentX - this.startX;
    
    // Apply drag effect to cards
    this.applyDragEffect(deltaX);
    
    e.preventDefault();
  }

  handleEnd(e) {
    if (!this.isDragging) return;
    
    this.isDragging = false;
    const deltaX = this.currentX - this.startX;
    
    // Re-enable transitions
    this.cards.forEach(card => {
      card.style.transition = '';
    });
    
    // Determine swipe direction and threshold
    if (Math.abs(deltaX) > this.threshold) {
      if (deltaX > 0) {
        this.goToPrevious();
      } else {
        this.goToNext();
      }
    } else {
      this.snapBack();
    }
    
    // Resume auto-play after user interaction
    this.resumeAutoPlayDelayed();
  }

  applyDragEffect(deltaX) {
    const dragStrength = deltaX / 200; // Normalize drag distance
    
    this.cards.forEach((card, index) => {
      const position = this.getCardPosition(index);
      const baseTransform = this.getTransformForPosition(position);
      
      // Apply drag offset
      const dragOffset = dragStrength * 100;
      const newTransform = baseTransform.replace(/translateX\(([^)]+)\)/, (match, translateX) => {
        const currentTranslateX = parseFloat(translateX.replace(/[^\d.-]/g, ''));
        return `translateX(${currentTranslateX + dragOffset}px)`;
      });
      
      card.style.transform = newTransform;
    });
  }

  getEventX(e) {
    return e.type.includes('mouse') ? e.clientX : e.touches[0].clientX;
  }

  goToNext() {
    if (this.isAnimating) return;
    
    this.currentIndex = (this.currentIndex + 1) % this.totalCards;
    this.updateCarousel();
  }

  goToPrevious() {
    if (this.isAnimating) return;
    
    this.currentIndex = (this.currentIndex - 1 + this.totalCards) % this.totalCards;
    this.updateCarousel();
  }

  snapBack() {
    this.updateCarousel();
  }

  getCardPosition(cardIndex) {
    // Calculate relative position from current center
    let relativePosition = cardIndex - this.currentIndex;
    
    // Handle infinite scroll wrapping for symmetrical layout
    if (relativePosition > this.totalCards / 2) {
      relativePosition -= this.totalCards;
    } else if (relativePosition < -this.totalCards / 2) {
      relativePosition += this.totalCards;
    }
    
    return relativePosition;
  }

  getTransformForPosition(position) {
    switch (position) {
      case 0:
        return 'translate(-50%, -50%) scale(1.15)';
      case -1:
        return 'translate(calc(-50% - 200px), -50%) scale(0.85)';
      case -2:
        return 'translate(calc(-50% - 350px), -50%) scale(0.7)';
      case -3:
        return 'translate(calc(-50% - 450px), -50%) scale(0.6)';
      case 1:
        return 'translate(calc(-50% + 200px), -50%) scale(0.85)';
      case 2:
        return 'translate(calc(-50% + 350px), -50%) scale(0.7)';
      case 3:
        return 'translate(calc(-50% + 450px), -50%) scale(0.6)';
      default:
        return 'translate(-50%, -50%) scale(0.5)';
    }
  }

  getClassForPosition(position) {
    switch (position) {
      case 0:
        return 'center';
      case -1:
        return 'left-1';
      case -2:
        return 'left-2';
      case -3:
        return 'left-3';
      case 1:
        return 'right-1';
      case 2:
        return 'right-2';
      case 3:
        return 'right-3';
      default:
        return 'hidden';
    }
  }

  updateCarousel() {
    this.isAnimating = true;
    
    // Update each card's position and class
    this.cards.forEach((card, index) => {
      const position = this.getCardPosition(index);
      const newClass = this.getClassForPosition(position);
      
      // Remove all position classes
      card.classList.remove('center', 'left-1', 'left-2', 'left-3', 'right-1', 'right-2', 'right-3', 'hidden');
      
      // Add new position class
      card.classList.add(newClass);
      
      // Clear any inline transform from dragging
      card.style.transform = '';
    });
    
    // Update dots
    this.updateDots();
    
    // Reset animation flag after transition completes
    setTimeout(() => {
      this.isAnimating = false;
    }, 700);
  }

  updateDots() {
    this.dots.forEach((dot, index) => {
      if (index === this.currentIndex) {
        dot.classList.remove('bg-gray-400');
        dot.classList.add('bg-orange-600');
      } else {
        dot.classList.remove('bg-orange-600');
        dot.classList.add('bg-gray-400');
      }
    });
  }

  // Public methods for external control
  setAutoPlayDelay(delay) {
    this.autoPlayDelay = delay;
    if (this.isAutoPlaying) {
      this.pauseAutoPlay();
      this.resumeAutoPlay();
    }
  }

  toggleAutoPlay() {
    if (this.isAutoPlaying) {
      this.pauseAutoPlay();
    } else {
      this.resumeAutoPlay();
    }
  }
}

// Initialize carousel when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  window.carousel = new SymmetricCarousel();
});
