import { fetchSanityData, convertSanityAssetRefToUrl, addClasses } from './common.js';

document.addEventListener('DOMContentLoaded', () => {
  async function fetchAndRenderProjectData() {
    try {
      const projects = await fetchSanityData('*[_type == "project"]');
      console.log(projects[1]);
      if (!Array.isArray(projects) || projects.length === 0) {
        throw new Error('Invalid or empty project data received');
      }

      renderProjects(projects);
    } catch (err) {
      console.error('Error in project data processing:', err);
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
    const { projectName, overview, projectImg, detail } = project;
    const textContainer = createProjectTextContainer(projectName, overview);
    const cardItem = document.createElement('div');
    addClasses(cardItem, ['card-item', 'row', 'justify-content-between', 'mb-3']);

    const img = createProjectImage(projectName, projectImg);
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

  function createProjectTextContainer(projectName, overview) {
    const container = document.createElement('div');
    addClasses(container, ['col-md-6']);

    const title = document.createElement('h3');
    title.textContent = projectName;
    addClasses(title, ['card-title']);
    container.appendChild(title);

    if (Array.isArray(overview)) {
      overview.forEach((block) => {
        const blockElement = createBlockElement(block);
        if (blockElement) container.appendChild(blockElement);
      });
    }

    return container;
  }

  function createBlockElement(block) {
    if (!block || !Array.isArray(block.children) || block.children.length === 0) return null;

    const tagMap = {
      normal: 'p',
      h3: 'h3',
      h4: 'h4',
      strong: 'strong',
      em: 'em',
      number: 'ol',
      bullet: 'ul',
    };

    const tagName = tagMap[block.style] || 'p';
    const blockElement = document.createElement(tagName);
    if (block.listItem) {
      const list = document.createElement(tagMap[block.listItem]);
      const li = document.createElement('li');
      block.children.forEach(child => {
        const ele = tagMap[child.marks] ? document.createElement(tagMap[child.marks]) : document.createTextNode(child.text);
        ele.textContent = child.text;
        li.appendChild(ele);
      });
      list.appendChild(li);
      blockElement.appendChild(list);
    } else {
      block.children.forEach(child => {
        const ele = tagMap[child.marks] ? document.createElement(tagMap[child.marks]) : document.createElement('span');
        ele.textContent = child.text;
        blockElement.appendChild(ele);
      });
    }
    return blockElement;
  }

  fetchAndRenderProjectData();
});
