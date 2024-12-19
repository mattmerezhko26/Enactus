import { fetchSanityData, processSanityData, convertSanityAssetRefToUrl, addClasses } from './common.js';

document.addEventListener('DOMContentLoaded', () => {
  async function getAndRenderProjects() {
    try {
      const projects = await fetchSanityData('*[_type == "project"]');
      renderProject(projects);
      console.log(projects);
    } catch (error) {
      console.error('Error fetching or processing data', error);
    }
  }

  function renderProject(projects) {
    const projectContainer = document.querySelector('.card-box');
    projects.forEach((project) => {
      const { projectName, desc, projectImg } = project;
      const cardItem = document.createElement('div');
      addClasses(cardItem, ['card-item', 'row', 'justify-content-between', 'mb-3']);
      const img = document.createElement('img');
      addClasses(img, ['col-md-6']);
      const imgUrl = projectImg ? convertSanityAssetRefToUrl(projectImg?.asset?._ref) : '';
      img.src = imgUrl;
      img.alt = projectName;
      const div = document.createElement('div');
      addClasses(div, ['col-md-6']);
      const h3 = document.createElement('h3');
      h3.textContent = projectName;
      addClasses(h3, ['card-title']);
      const p = document.createElement('p');
      p.textContent = desc;
      addClasses(p, ['card-text']);
      div.appendChild(h3);
      div.appendChild(p);
      cardItem.appendChild(img);
      cardItem.appendChild(div);
      projectContainer.appendChild(cardItem);
    });
  }
  getAndRenderProjects();
});
