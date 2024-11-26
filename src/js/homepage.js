let swiper;

function initializeSwiper() {
  
  if (swiper) {
    swiper.destroy(true, true);
  }
  swiper = new Swiper(".mySwiper", {
    slidesPerView: window.innerWidth < 768 ? 2 : 4, 
    spaceBetween: 15,
    autoplay: window.innerWidth >= 768 ? {
      delay: 2000,
      disableOnInteraction: false,
    } : false,
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
  });
}

initializeSwiper();
window.addEventListener('resize', initializeSwiper);