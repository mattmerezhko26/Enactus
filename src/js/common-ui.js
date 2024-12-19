function createNavbar() {
  return `
    <div class="container-fluid">
      <a href="index.html" class="navbar-brand"><img src="./images/Enactus-Gray-200x88.png"
          alt="enactus seneca logo" /></a>
      <button class="navbar-toggler border-0" type="button" data-bs-toggle="collapse"
        data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false"
        aria-label="Toggle navigation">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-list"
          viewBox="0 0 16 16">
          <path fill-rule="evenodd"
            d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5" />
        </svg>
      </button>
      <div class="collapse navbar-collapse flex-grow-0" id="navbarSupportedContent">
        <ol class="navbar-nav">
          <li class="nav-item"><a href="index.html">Home</a></li>
          <li class="nav-item"><a href="projects.html">Projects</a></li>
          <li class="nav-item"><a href="meetOurTeam.html">Meet Our Team</a></li>
          <li class="nav-item"><a href="#footer">Contact Us</a></li>
        </ol>
      </div>
    </div>
  `;
}

function createToTopBtn() {
  return `
      TOP
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-up"
        viewBox="0 0 16 16">
        <path fill-rule="evenodd"
          d="M8 15a.5.5 0 0 0 .5-.5V2.707l3.146 3.147a.5.5 0 0 0 .708-.708l-4-4a.5.5 0 0 0-.708 0l-4 4a.5.5 0 1 0 .708.708L7.5 2.707V14.5a.5.5 0 0 0 .5.5" />
      </svg>`;
}

function createFooter() {
  return `<div class="row align-items-center">
      <div class="col-md-4 col-sm-12">
        <p><a href="/">Enactus Seneca</a></p>
        <p>1750 Finch Ave E, North York, ON M2J 2X5</p>
      </div>
      <div class="col-md-4 col-sm-12 d-block text-center ">
        <a href="https://www.facebook.com/enactusseneca/" target="_blank">facebook</a>
        <a href="https://www.instagram.com/enactussenecapolytechnic/" target="_blank">instagram</a>
        <a href="https://www.linkedin.com/company/enactus-senecapolytechnic/" target="_blank">linkedin</a>
        <p>© 2024 Enactus Seneca all rights reserved</p>
      </div>
    </div>`;
}

document.addEventListener('DOMContentLoaded', () => {
  // create navbar
  const navbar = document.getElementById('navbar');
  navbar.innerHTML = createNavbar();
  // Navbar toggler
  const navbarToggler = document.querySelector('.navbar-toggler');
  const navbarCollapse = document.querySelector('#navbarSupportedContent');

  navbarToggler.setAttribute('aria-expanded', 'true');
  navbarToggler.addEventListener('click', (e) => {
    e.preventDefault();
    const isExpanded = navbarCollapse.classList.contains('show');

    navbarCollapse.classList.toggle('show');
    navbarToggler.classList.toggle('collapsed');

    navbarToggler.setAttribute('aria-expanded', !isExpanded);
  });

  // create footer
  const footer = document.getElementById('footer');
  footer.innerHTML = createFooter();

  // Scroll to top button
  const toTopButton = document.getElementById('toTopBtn');
  toTopButton.innerHTML = createToTopBtn();

  toTopButton.addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  });

  window.addEventListener('scroll', () => {
    const scrollHeight = document.documentElement.scrollHeight;
    const innerHeight = window.innerHeight;
    const scrollY = window.scrollY;
    toTopButton.classList.toggle('d-flex', innerHeight + scrollY >= scrollHeight - 10);
  });
});
