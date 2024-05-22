// Get the navigation menu and hamburger button elements
const navMenu = document.querySelector('nav ul');
const hamburgerBtn = document.querySelector('.hamburger-btn');

// Toggle the visibility of the navigation menu on click
hamburgerBtn.addEventListener('click', () => {
  navMenu.classList.toggle('show');
});

// Add click event listeners to navigation links for smooth scrolling
const navLinks = document.querySelectorAll('nav ul li a');
navLinks.forEach(link => {
  link.addEventListener('click', (event) => {
    event.preventDefault();
    const targetId = event.currentTarget.getAttribute('href');
    const targetSection = document.querySelector(targetId);
    const offset = 80; // Adjust this value to change the scroll position
    const scrollPosition = targetSection.offsetTop - offset;
    window.scrollTo({
      top: scrollPosition,
      behavior: 'smooth'
    });
  });
});

