document.addEventListener("DOMContentLoaded", () => {
  const navbarToggler = document.querySelector(".navbar-toggler");
  const navbarCollapse = document.querySelector("#navbarSupportedContent");

  navbarToggler.setAttribute("aria-expanded", "true");

  navbarToggler.addEventListener("click", () =>{
    const isExpanded = navbarCollapse.classList.contains("show");

    navbarCollapse.classList.toggle("show");
    navbarToggler.classList.toggle("collapsed");

    navbarToggler.setAttribute("aria-expanded", !isExpanded);
  });
});