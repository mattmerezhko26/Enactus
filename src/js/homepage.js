import { fetchSanityData, processSanityData, getMemberData } from './common.js';

document.addEventListener('DOMContentLoaded', () => {
  // Fetch and process data
  async function fetchAndRenderMemberData() {
    try {
      const members = await getMemberData();
      renderSwiper(members);  
      initSwiper();
    } catch (error) {
      console.error('Error fetching or processing data', error);
    }
  }

  // Render the swiper with member data
  function renderSwiper(members) {  
    let container = document.querySelector('.mySwiper .swiper-wrapper');
    if (!container) {
      console.error('Swiper container not found');
      return;
    }
    members.forEach((member) => {  
      const slide = createSlide(member);
      container.appendChild(slide);  
    });
  }

  // Create a slide element for a member
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

  // Create an anchor link for the slide
  function createLink(member) {
    const link = document.createElement('a');
    link.href = `/meetOurTeam.html#${member.department}`;
    return link;
  }

  // Create an image element
  function createImage(src, firstName, lastName) {
    const img = document.createElement('img');
    img.src = src;
    img.alt = `${firstName} ${lastName} image`;
    return img;
  }

  // Create a text container with the member's name and position
  function createTextContainer(firstName, lastName, position) {
    const textContainer = document.createElement('div');

    const name = document.createElement('p');
    name.textContent = `${firstName} ${lastName}`;

    const positionElement = document.createElement('p');
    positionElement.textContent = position;

    textContainer.appendChild(name);
    textContainer.appendChild(positionElement);

    return textContainer;
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

  fetchAndRenderMemberData();
});
