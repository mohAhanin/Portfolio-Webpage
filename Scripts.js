// Mobile menu functionality
document.addEventListener('DOMContentLoaded', function() {
  // Create hamburger button if it doesn't exist
  if (!document.querySelector('.hamburger-btn')) {
    const nav = document.querySelector('nav');
    const hamburgerBtn = document.createElement('div');
    hamburgerBtn.className = 'hamburger-btn';
    
    // Create three bars for the hamburger icon
    for (let i = 0; i < 3; i++) {
      const bar = document.createElement('span');
      hamburgerBtn.appendChild(bar);
    }
    
    nav.appendChild(hamburgerBtn);
  }

  // Get the navigation menu and hamburger button elements
  const navMenu = document.querySelector('nav ul');
  const hamburgerBtn = document.querySelector('.hamburger-btn');

  // Toggle the visibility of the navigation menu on click
  hamburgerBtn.addEventListener('click', () => {
    navMenu.classList.toggle('show');
    
    // Optional: Toggle a class on the hamburger button to animate it
    hamburgerBtn.classList.toggle('active');
  });

  // Close the menu when a link is clicked
  const navLinks = document.querySelectorAll('nav ul li a');
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      navMenu.classList.remove('show');
      hamburgerBtn.classList.remove('active');
    });
  });

  // Smooth scrolling functionality
  navLinks.forEach(link => {
    link.addEventListener('click', (event) => {
      event.preventDefault();
      const targetId = event.currentTarget.getAttribute('href');
      
      // Only proceed if it's an anchor link
      if (targetId.startsWith('#')) {
        const targetSection = document.querySelector(targetId);
        if (targetSection) {
          const offset = 80; // Adjust this value to change the scroll position
          const scrollPosition = targetSection.offsetTop - offset;
          
          window.scrollTo({
            top: scrollPosition,
            behavior: 'smooth'
          });
        }
      } else {
        // If it's not an anchor link, navigate to the URL normally
        window.location.href = targetId;
      }
    });
  });

  // Add viewport meta tag if missing
  if (!document.querySelector('meta[name="viewport"]')) {
    const meta = document.createElement('meta');
    meta.name = 'viewport';
    meta.content = 'width=device-width, initial-scale=1.0';
    document.head.appendChild(meta);
  }
});

// Optional: Close mobile menu when clicking outside
document.addEventListener('click', (event) => {
  const navMenu = document.querySelector('nav ul');
  const hamburgerBtn = document.querySelector('.hamburger-btn');
  
  if (navMenu.classList.contains('show') && 
      !event.target.closest('nav ul') && 
      !event.target.closest('.hamburger-btn')) {
    navMenu.classList.remove('show');
    hamburgerBtn.classList.remove('active');
  }
});