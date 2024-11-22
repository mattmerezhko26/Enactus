document.addEventListener('DOMContentLoaded', () => {
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

  // Scroll to top button
  const toTopButton = document.getElementById('toTopBtn');

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
