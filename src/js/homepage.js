import { fetchSanityData, processSanityData } from './common.js';
document.addEventListener('DOMContentLoaded', () => {
  // Fetch and process data
  async function getData() {
    try{
    const data = await fetchSanityData('*[_type == "department"]');
    const args = ['title', 'description'];
    const formatData = await processSanityData(data, args);
    //here we have to call the function to render elements dinamically
    renderDynamicContent(formatData);
    } catch(error){
      console.error("Error fetching or pocessing data",error);
    }

    
  }
  function renderDynamicContent(departments){
    let container = document.querySelector('.mySwiper .swiper-wrapper');
    if(!container){
      console.error("Swiper not found");
      return;
    }
    departments.forEach((item) =>{
      //here we have to create slides
      const slide = document.createElement('div');
      slide.classList.add('swiper-slide');
      //addign image
      const img = document.createElement('img');
      img.src = item.imageUrl;
      img.alt = item.title;
      //trying to add an overlay for div and description
      const overlay = document.createElement('div');
      const title = document.createElement('h1');
      const description = document.createElement('p');
      //additional just in case
      title.textContent = item.title || "No title";
      description.textContent = item.description || "No description";
      overlay.appendChild(title);
      overlay.appendChild(description);
      slide.appendChild(img);//appending elements to slide
      slide.appendChild(overlay);
      container.appendChild(slide);


    });
  }


  getData();

  // Swiper
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
});
