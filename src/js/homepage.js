import { fetchSanityData, getMemberData, convertSanityAssetRefToUrl, addClasses } from './common.js';

document.addEventListener('DOMContentLoaded', () => {
  async function getAndRenderIndex() {
    try {
      const intro = await fetchSanityData('*[_type == "orgIntro"]');
      renderEnactusIntro(intro[0]);
      renderAboutUs(intro[1]);
      const members = await getMemberData();
      renderSwiper(members);
      initSwiper();
    } catch (error) {
      console.error('Error fetching or processing data', error);
    }
  }

  function renderEnactusIntro(intro) {
    const { video, desc, groupImg } = intro;
    const enactusContainer = document.querySelector('.enactus');

    renderVideoOrImg(enactusContainer, video, groupImg);
    const span = document.createElement('span');
    addClasses(span, ['col-md-6', 'p-0']);
    span.textContent = desc;
    enactusContainer.appendChild(span);
  }

  function renderAboutUs(intro) {
    const { desc, groupImg, video } = intro;
    const aboutUsContainer = document.querySelector('.about');
    const div = document.createElement('div');
    addClasses(div, ['row', 'justify-content-between', 'm-0']);
    const p = document.createElement('p');
    addClasses(p, ['p-0']);
    const span = document.createElement('span');
    addClasses(span, ['col-md-6', 'p-0']);
    const secondParaphraseEnd = desc.indexOf('.', desc.indexOf('.') + 1);

    if (secondParaphraseEnd !== -1) {
      const firstPart = desc.slice(0, secondParaphraseEnd + 1).trim();
      const secondPart = desc.slice(secondParaphraseEnd + 2).trim();

      p.textContent = firstPart;
      span.textContent = secondPart;
      aboutUsContainer.appendChild(p);
      aboutUsContainer.appendChild(div);
      div.appendChild(span);
    } else {
      console.log("The string doesn't have a second '.' character.");
    }
    renderVideoOrImg(div, video, groupImg);
  }

  // Determine whether to render an img tag or an iframe for a YouTube video, video is preferred
  function renderVideoOrImg(container, video, img) {
    if (video) {
      const iframe = document.createElement('iframe');
      addClasses(iframe, ['col-md-5', 'p-0']);
      iframe.src = video;
      container.appendChild(iframe);
    } else if (img) {
      const image = document.createElement('img');
      addClasses(image, ['col-md-5', 'p-0']);
      image.src = convertSanityAssetRefToUrl(img?.asset?._ref) || '';
      image.alt = 'group image';
      container.appendChild(image);
    } else {
      console.log('No video or image found');
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
    link.href = `meetOurTeam.html#${member.department.toLowerCase().replace(/\s+/g, '-')}`;
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
      lazy: true,
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
      loop: true,
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

  getAndRenderIndex();
});
