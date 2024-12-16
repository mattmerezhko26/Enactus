import { fetchSanityData, processSanityData } from './common.js';

document.addEventListener('DOMContentLoaded', () => {
  // Fetch and process data
  async function fetchAndRenderMemberData() {
    try {
      const members = await fetchMemberData();
      renderSwiper(members);
      initSwiper();
    } catch (error) {
      console.error('Error fetching or processing data', error);
    }
  }
  //fetch memebr data from API
  async function fetchMemberData() {
    const query = '*[_type == "member"]';
    const data = await fetchSanityData(query);
    const args = ['firstName', 'lastName', 'position', 'department', 'personImg'];
    return await processSanityData(data, args);
  }

  function renderSwiper(member) {
    let container = document.querySelector('.mySwiper .swiper-wrapper');
    if (!container) {
      console.error('Swiper not found');
      return;
    }
    members.forEach((memeber) => {
      const slide = createSlide(memeber);
      conteiner.appendChild(slide);
    });
  }
  //have to create a slide element for a member
  function createSlide(member) {
    const slide = document.createElement('div');
    slide.classList.add('swiper-slide');

    const link = createLink(member);
    const image = createImage(member.personImg, member.firstName, member.lastName);
    const textContainer = createTextContainer(member.firstName, member.lastName, member.position);

    link.appendChild(image);
    link.appendChild(textContainer);
    slide.appendChild(link);

    return slide;
  }

  // Initialize Swiper instance
  function initSwiper() {
    new Swiper('.mySwiper', {
      slidesPerView: 1, // Default number of slides visible
      spaceBetween: 15,
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
      autoplay: {
        delay: 2000,
        disableOnInteraction: false,
      },
      // Responsive breakpoints to adjust slidesPerView
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
  }
});
