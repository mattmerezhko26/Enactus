import { fetchSanityData, processSanityData, getMemberData, convertSanityAssesRefToUrl } from './common.js';

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
    const introLogo = document.querySelector('.enactus .logo-img');
    const introGroupImg = document.querySelector('.enactus .group-img');

    // Assuming projectId and dataset are available from your environment or the data
    const projectId = 'td08n1oq';
    const dataset = 'production';

    // Update logo image
    introLogo &&
      (introLogo.src =
        convertSanityAssesRefToUrl(data?.logo?.asset?._ref, projectId, dataset) || 'images/default-logo.png');

    // Update group image
    introGroupImg &&
      (introGroupImg.src =
        convertSanityAssesRefToUrl(data?.groupImg?.asset?._ref, projectId, dataset) || 'images/default-group.png');
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
  function createImage(image, firstName, lastName) {
    const img = document.createElement('img');
    const projectId = 'td08n1oq';
    const dataset = 'production';
    img.src = convertSanityAssesRefToUrl(image?.asset?._ref, projectId, dataset) || 'images/default-image.png';
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
    renderOrgInfo(data);  // Call renderOrgInfo after data is fetched
    const descElement = document.querySelector('.org-desc');
    if (descElement && data?.desc) {
      descElement.textContent = data.desc;
    }
    const logoElement = document.querySelector('.logo-img');
    if (logoElement && data?.logo?.asset?._ref) {
      logoElement.src =
        convertSanityAssesRefToUrl(data?.logo?.asset?._ref, projectId, dataset) || 'images/default-logo.png';
    }
  });
});
