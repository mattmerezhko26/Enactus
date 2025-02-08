import { getMemberData, addClasses } from './common.js';

document.addEventListener('DOMContentLoaded', () => {
  async function fetchAndRenderTeamData() {
    try {
      const members = await getMemberData();
      if (!Array.isArray(members) || members.length === 0) {
        throw new Error('Invalid or empty member data received');
      }
      
      const groupedMembers = splitAdmin(members);
      if (groupedMembers.length === 0) {
        throw new Error('No departments found in member data');
      }

      await Promise.all(renderDepartments(groupedMembers));
    } catch (error) {
      console.error('Error in team data processing:', {
        message: error.message,
      });
    }
  }

  // Split members into Administration and General Members
  function splitAdmin(members) {
    return Object.values(
      members.reduce((acc, member) => {
        const departmentKey = member.department === 'Administration' ? 'Administration' : 'General Members';
  
        if (!acc[departmentKey]) {
          acc[departmentKey] = {
            departmentName: departmentKey,
            members: [],
          };
        }
  
        acc[departmentKey].members.push(member);
        return acc;
      }, {})
    );
  }

  function renderDepartments(departments) {
    const teamContainer = document.querySelector('.department');
    if (!teamContainer) return;

    const fragment = document.createDocumentFragment();
    departments.forEach(({ departmentName, members }) => {
      const header = document.createElement('h2');
      header.textContent = departmentName === 'Administration' ? 'Executive Members' : 'General Members';

      const departmentBox = document.createElement('div');
      addClasses(departmentBox, ['department-box', 'card-group', 'row']);

      members.forEach((member) => {
        departmentBox.appendChild(createDepartmentBox(member));
      });

      fragment.append(header, departmentBox);
    });

    teamContainer.appendChild(fragment);
  }

  function createDepartmentBox(member) {
    const wrapper = document.createElement('div');
    addClasses(wrapper, ['col-lg-3', 'col-md-4', 'col-sm-12']);
    wrapper.appendChild(createMemberCard(member));
    return wrapper;
  }

  function createMemberCard(member) {
    const { firstName, lastName, personImg, position, personalURL } = member;
    const card = document.createElement('div');
    addClasses(card, ['department-card', 'card', 'border-0', 'align-items-center', 'mx-auto']);

    const img = document.createElement('img');
    addClasses(img, ['card-img']);
    Object.assign(img, {
      src: personImg,
      alt: `${firstName} ${lastName} image`,
      loading: 'lazy',
    });

    const textContainer = createTextContainer(firstName, lastName, position);
    const socialIcons = createSocialLinks(personalURL);

    card.append(img, textContainer, socialIcons);
    return card;
  }

  function createTextContainer(firstName, lastName, position) {
    const container = document.createElement('div');
    addClasses(container, ['card-text']);
    container.innerHTML = `
      <p>${firstName} ${lastName}</p>
      <hr />
      <p>${position}</p>
    `;
    return container;
  }

  function createSocialLinks(personalURL) {
    if (!personalURL) return document.createElement('ol');

    const ol = document.createElement('ol');
    const fragment = document.createDocumentFragment();

    for (const [platform, url] of Object.entries(personalURL)) {
      const li = document.createElement('li');
      const a = document.createElement('a');
      a.href = platform === 'email' ? `mailto:${url}` : url;
      a.innerHTML = getSocialIconSVG(platform);
      li.appendChild(a);
      fragment.appendChild(li);  // No reflow/repaint yet
    }

    ol.appendChild(fragment);  // Single reflow/repaint
    return ol;
  }

  function getSocialIconSVG(iconName) {
    const paths = {
      email:
        'M8.941.435a2 2 0 0 0-1.882 0l-6 3.2A2 2 0 0 0 0 5.4v.314l6.709 3.932L8 8.928l1.291.718L16 5.714V5.4a2 2 0 0 0-1.059-1.765zM16 6.873l-5.693 3.337L16 13.372v-6.5Zm-.059 7.611L8 10.072.059 14.484A2 2 0 0 0 2 16h12a2 2 0 0 0 1.941-1.516M0 13.373l5.693-3.163L0 6.873z',
      linkedin:
        'M0 1.146C0 .513.526 0 1.175 0h13.65C15.474 0 16 .513 16 1.146v13.708c0 .633-.526 1.146-1.175 1.146H1.175C.526 16 0 15.487 0 14.854zm4.943 12.248V6.169H2.542v7.225zm-1.2-8.212c.837 0 1.358-.554 1.358-1.248-.015-.709-.52-1.248-1.342-1.248S2.4 3.226 2.4 3.934c0 .694.521 1.248 1.327 1.248zm4.908 8.212V9.359c0-.216.016-.432.08-.586.173-.431.568-.878 1.232-.878.869 0 1.216.662 1.216 1.634v3.865h2.401V9.25c0-2.22-1.184-3.252-2.764-3.252-1.274 0-1.845.7-2.165 1.193v.025h-.016l.016-.025V6.169h-2.4c.03.678 0 7.225 0 7.225z',
      facebook:
        'M16 8.049c0-4.446-3.582-8.05-8-8.05C3.58 0-.002 3.603-.002 8.05c0 4.017 2.926 7.347 6.75 7.951v-5.625h-2.03V8.05H6.75V6.275c0-2.017 1.195-3.131 3.022-3.131.876 0 1.791.157 1.791.157v1.98h-1.009c-.993 0-1.303.621-1.303 1.258v1.51h2.218l-.354 2.326H9.25V16c3.824-.604 6.75-3.934 6.75-7.951',
      x: 'M12.6.75h2.454l-5.36 6.142L16 15.25h-4.937l-3.867-5.07-4.425 5.07H.316l5.733-6.57L0 .75h5.063l3.495 4.633L12.601.75Zm-.86 13.028h1.36L4.323 2.145H2.865z',
    };

    return `
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
        class="bi bi-${iconName}" viewBox="0 0 16 16">
        <path d="${paths[iconName]}" />
      </svg>
    `;
  }

  fetchAndRenderTeamData();
});
