
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