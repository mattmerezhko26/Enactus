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
    const query = `*[_type == "orgIntro"][0]`; //query to fetch organization intro data
    const args = ['desc', 'logo', 'groupImg', 'video']; //define the required fields
    try {
      // Fetch and process the data
      const introData = await fetchSanityData(query);
      const processedData = await processSanityData([introData], args);

      console.log(processedData);
      return processedData[0];
    } catch (error) {
      console.error('Error fetching organization intro:', error);
      return {};
    }
  }

  // Update organization info
  function renderOrgInfo(data) {
    // Select DOM elements
    const introTitle = document.querySelector('.info h2');
    const introLogo = document.querySelector('.enactus .logo-img');
    const introGroupImg = document.querySelector('.enactus .group-img');
    const introVideo = document.querySelector('.enactus .video-link');

    // Update title (optional)
    introTitle && (introTitle.textContent = data?.title || 'Organization name');

    // Update logo image
    introLogo && (introLogo.src = data?.logo?.url || 'images/default-logo.png');
    introLogo && (introLogo.alt = 'Organization Logo');

    // Update group image
    introGroupImg && (introGroupImg.src = data?.groupImg?.url || 'images/default-group.png');
    introGroupImg && (introGroupImg.alt = 'Organization Group Image');

    // Update video link
    if (introVideo && data?.video) {
      introVideo.href = data.video;
      introVideo.textContent = 'Organization video';
    }
  }

  // Render the swiper with member data
  function renderSwiper(members) {
    const container = document.querySelector('.mySwiper .swiper-wrapper');
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
    const image = createImage(member?.personImg, member?.firstName, member?.lastName);
    const textContainer = createTextContainer(member?.firstName, member?.lastName, member?.position);

    link.appendChild(image);
    link.appendChild(textContainer);
    slide.appendChild(link);

    return slide;
  }

  // Create an anchor link for the slide
  function createLink(member) {
    const link = document.createElement('a');
    link.href = `meetOurTeam.html#${member?.department || ''}`;
    return link;
  }

  // Create an image element
  function createImage(src, firstName, lastName) {
    const img = document.createElement('img');
    img.src = src || 'images/default-image.png';
    img.alt = `${firstName || 'Unknown'} ${lastName || 'Member'} image`;
    return img;
  }

  // Create a text container with the member's name and position
  function createTextContainer(firstName, lastName, position) {
    const textContainer = document.createElement('div');

    const name = document.createElement('p');
    name.textContent = `${firstName || 'Unknown'} ${lastName || 'Member'}`;

    const positionElement = document.createElement('p');
    positionElement.textContent = position || 'Position not available';

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
        576: { slidesPerView: 2 },
        768: { slidesPerView: 3 },
        992: { slidesPerView: 4 },
      },
    });
  }

  // Call functions
  fetchAndRenderMemberData();
  fetchOrgIntro().then((data) => {
    const descElement = document.querySelector('.org-desc');
    if (descElement && data?.desc) {
      descElement.textContent = data.desc;
    }
    const logoElement = document.querySelector('.logo-img');
    if (logoElement && data?.logo?.asset?.url) {
      logoElement.src = data.logo.asset.url;
    }
  });
});
