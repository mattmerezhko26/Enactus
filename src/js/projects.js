import { fetchSanityData, processSanityData, convertSanityAssetRefToUrl, addClasses } from './common.js';

document.addEventListener('DOMContentLoaded', () => {
  async function fetchAndRenderProjectData() {
    try {
      const projects = await fetchSanityData('*[_type == "project"]');
      if (!Array.isArray(projects) || projects.length === 0) {
        throw new Error('Invalid or empty project data received');
      }

      renderProjects(projects);
    } catch (error) {
      console.error('Error in project data processing:', {
        message: error.message,
      });
    }
  }

  function renderProjects(projects) {
    const projectContainer = document.querySelector('.card-box');
    if (!projectContainer) return;

    const fragment = document.createDocumentFragment();
    projects.forEach((project) => {
      fragment.appendChild(createProjectCard(project));
    });
    projectContainer.appendChild(fragment);
  }

  function createProjectCard(project) {
    const { projectName, desc, projectImg } = project;
    const cardItem = document.createElement('div');
    addClasses(cardItem, ['card-item', 'row', 'justify-content-between', 'mb-3']);

    const img = createProjectImage(projectName, projectImg);
    const textContainer = createProjectTextContainer(projectName, desc);

    cardItem.append(img, textContainer);
    return cardItem;
  }

  function createProjectImage(projectName, projectImg) {
    const img = document.createElement('img');
    addClasses(img, ['col-md-6']);
    const imgUrl = projectImg ? convertSanityAssetRefToUrl(projectImg?.asset?._ref) : '';
    Object.assign(img, {
      src: imgUrl,
      alt: `${projectName} project image`,
      loading: 'lazy',
    });
    return img;
  }

  function createProjectTextContainer(projectName, desc) {
    const container = document.createElement('div');
    addClasses(container, ['col-md-6']);

    const title = document.createElement('h3');
    title.textContent = projectName;
    addClasses(title, ['card-title']);

    const description = document.createElement('p');
    description.textContent = desc;
    addClasses(description, ['card-text']);

    container.append(title, description);
    return container;
  }

  fetchAndRenderProjectData();
});
