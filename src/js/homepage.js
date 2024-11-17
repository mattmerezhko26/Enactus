import { fetchSanityData, processSanityData } from './common.js';
document.addEventListener('DOMContentLoaded', () => {
  // Fetch and process data
  async function getData() {
    const data = await fetchSanityData('*[_type == "department"]');
    const args = ['title', 'description'];
    const formatData = await processSanityData(data, args);
    console.log(formatData);
  }
  getData();
  
  // Swiper
  new Swiper('.mySwiper', {
    slidesPerView: 1,
    spaceBetween: 15,
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
    autoplay: {
      delay: 2000,
      disableOnInteraction: false,
    },
    breakpoints: {
      576: {
        slidesPerView: 2,
      },
      768: {
        slidesPerView: 3,
      },
      992: {
        slidesPerView: 4,
      },
    },
  });
});
