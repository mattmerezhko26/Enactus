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
  async function fetchOrgIntro() {
    const query = `*[_type == "orgIntro"][0]{
      title,
      logo { asset -> { url } },
      groupImg { asset -> { url } },
      video
    }`;
    const data = await fetchSanityData(query);
    return processSanityData(data);
  }
  function renderOrdInfo(data){
    //select DOM elements
    const introTitle = document.querySelector('.info h2');
    const introLogo = document.querySelector('.enactus .logo-img');
    const introGroupImg = document.querySelector('.enactus .group-img');
    const introVideo = document.querySelector('.enactus .video-link');

    //here we have to update title(optional)
    if(introTitle){
      introTitle.textContent = data.title || "Organization name";
    }
    //updating logo image
    if(introLogo && data.logo && data.logo.url){
      introLogo.src = data.logo.url;
      introLogo.alt = 'Organization Logo';
    }
    //updating group image
    if(introGroupImg && data.groupImg && data.groupImg.url){
      introGroupImg.src = data.groupImg.url;
      introGroupImg.alt = "Organization Group Image";
    }
    if(introVideo && data.video){
      introVideo.href = data.video;
      introVideo.textContent = "Organization video";

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
    link.href = `meetOurTeam.html#${member.department}`;
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
  fetchAndRenderOrgInfo();
});
