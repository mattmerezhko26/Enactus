import { fetchSanityData, processSanityData, getMemberData, convertSanityAssetRefToUrl, addClasses } from './common.js';

document.addEventListener('DOMContentLoaded', () => {
  async function fetchAndRenderTeamData() {
    try {
      const members = await getMemberData();
      renderTeam(members);
    } catch (error) {
      console.error('Error fetching or processing data', error);
    }
  }

  function renderTeam(members) {
    const teamContainer = document.querySelector('.team-container');
    if (!teamContainer) {
      console.error('Team container not found');
      return;
    }
    members.forEach((member) => {
      const memberCard = createMemberCard(member);
      teamContainer.appendChild(memberCard);
    });
  }

  function createMemberCard(member) {
    const card = document.createElement('div');
    addClasses(card, ['member-card']);
    const image = createImage(member.personImg, member.firstName, member.lastName);
    const textContainer = createTextContainer(member.firstName, member.lastName, member.position);
    card.appendChild(image);
    card.appendChild(textContainer);
    return card;
  }

  // Create an image element for a member
  function createImage(src, firstName, lastName) {
    const img = document.createElement('img');
    img.src = src;
    img.alt = `${firstName} ${lastName} image`;
    addClasses(img, ['member-image']);
    return img;
  }
  // Create a text container with the member's name and position
  function createTextContainer(firstName, lastName, position) {
    const textContainer = document.createElement('div');
    addClasses(textContainer, ['member-text']);
    const name = document.createElement('p');
    name.textContent = `${firstName} ${lastName}`;
    addClasses(name, ['member-name']);
    const positionElement = document.createElement('p');
    positionElement.textContent = position;
    addClasses(positionElement, ['member-position']);
    textContainer.appendChild(name);
    textContainer.appendChild(positionElement);
    return textContainer;
  }

  fetchAndRenderTeamData();
});