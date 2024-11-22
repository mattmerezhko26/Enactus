const swiper = new Swiper(".mySwiper", {
  slidesPerView: 4,
  spaceBetween: 15,
  // scrollbar: {
  //     el: ".swiper-scrollbar",
  //     hide: false,
  // },
  autoplay: {
      delay: 2000,
      disableOnInteraction: false,
  },
  // pagination: {
  //     el: ".swiper-pagination",
  //     clickable: true,
  // },
  navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
  },
});