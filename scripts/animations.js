// Animation related functionality

document.addEventListener('DOMContentLoaded', function() {
  // Initialize animations
  initAnimations();
  
  // Animate skill sections on scroll
  animateOnScroll();
  
  // Add code typing effect to section titles
  addTypingEffect();
});

// Initialize animations
function initAnimations() {
  // Add animation delays to stagger the appearance of elements
  const skillCategories = document.querySelectorAll('.skill-category');
  skillCategories.forEach((category, index) => {
    category.style.animationDelay = `${0.1 * index}s`;
  });
  
  // Add animation to project cards
  const projectCards = document.querySelectorAll('.project-card');
  projectCards.forEach((card, index) => {
    card.style.animationDelay = `${0.2 * index}s`;
  });
  
  // Add animation to experience cards
  const experienceCards = document.querySelectorAll('.experience-card');
  experienceCards.forEach((card, index) => {
    card.style.animationDelay = `${0.2 * index}s`;
  });
}

// Animate elements when scrolled into view
function animateOnScroll() {
  // Identify elements to animate
  const animatedElements = document.querySelectorAll('.section, .project-card, .skill-category, .experience-card');
  
  // Create IntersectionObserver
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      // Add animation class when element is visible
      if (entry.isIntersecting) {
        entry.target.classList.add('animate-in');
        // Stop observing after animation is triggered
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1,  // Trigger when 10% of the element is visible
    rootMargin: '0px 0px -100px 0px'  // Trigger before element is fully in view
  });
  
  // Start observing elements
  animatedElements.forEach(element => {
    observer.observe(element);
  });
}

// Add typing effect to section titles
function addTypingEffect() {
  const sectionTitles = document.querySelectorAll('.section-title');
  
  sectionTitles.forEach(title => {
    title.addEventListener('mouseover', function() {
      this.classList.add('typing');
    });
    
    title.addEventListener('mouseout', function() {
      this.classList.remove('typing');
    });
  });
}

// Add terminal-like text effect to specific elements
function addTerminalEffect() {
  const terminalElements = document.querySelectorAll('.project-title, .position-title');
  
  terminalElements.forEach(element => {
    const text = element.textContent;
    element.textContent = '';
    
    let i = 0;
    const interval = setInterval(() => {
      if (i < text.length) {
        element.textContent += text.charAt(i);
        i++;
      } else {
        clearInterval(interval);
      }
    }, 50);
  });
}

// Matrix-like background effect for header (subtle)
function createMatrixEffect() {
  const header = document.querySelector('.header');
  const canvas = document.createElement('canvas');
  canvas.className = 'matrix-canvas';
  
  // Position canvas absolute in the background
  canvas.style.cssText = `
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: -1;
    opacity: 0.05; // Very subtle effect
  `;
  
  header.appendChild(canvas);
  
  const ctx = canvas.getContext('2d');
  canvas.width = header.offsetWidth;
  canvas.height = header.offsetHeight;
  
  // Characters to display (using 0s and 1s for simplicity)
  const characters = '01';
  const fontSize = 10;
  const columns = canvas.width / fontSize;
  
  // Array to track the y position of each column
  const drops = [];
  for (let i = 0; i < columns; i++) {
    drops[i] = 1;
  }
  
  // Drawing the characters
  function draw() {
    // Slightly translucent black background to create fade effect
    ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // Green text
    const isDarkMode = document.body.classList.contains('dark-mode');
    ctx.fillStyle = isDarkMode ? '#58a6ff' : '#0366d6';
    ctx.font = `${fontSize}px monospace`;
    
    // Draw characters
    for (let i = 0; i < drops.length; i++) {
      // Random character
      const text = characters.charAt(Math.floor(Math.random() * characters.length));
      ctx.fillText(text, i * fontSize, drops[i] * fontSize);
      
      // Randomly reset some drops to the top
      if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
        drops[i] = 0;
      }
      
      // Move drops down
      drops[i]++;
    }
  }
  
  // Call draw every 33ms (approximately 30fps)
  const interval = setInterval(draw, 33);
  
  // Stop animation when not in viewport to save resources
  window.addEventListener('scroll', () => {
    const headerRect = header.getBoundingClientRect();
    if (headerRect.bottom < 0 || headerRect.top > window.innerHeight) {
      clearInterval(interval);
    } else {
      setInterval(draw, 33);
    }
  });
}

// Initialize matrix effect with a delay to ensure other elements are loaded
setTimeout(() => {
  createMatrixEffect();
}, 1000);

// Add hovercard effects to project cards
function addHoverCardEffects() {
  const cards = document.querySelectorAll('.project-card, .experience-card');
  
  cards.forEach(card => {
    card.addEventListener('mousemove', e => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      // Calculate rotation based on mouse position
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      
      const rotateY = ((x - centerX) / centerX) * 5; // max 5deg rotation
      const rotateX = ((centerY - y) / centerY) * 5;
      
      // Apply the transform
      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    });
    
    card.addEventListener('mouseleave', () => {
      // Reset transform on mouse leave
      card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0)';
    });
  });
}

// Initialize hover card effects
addHoverCardEffects();