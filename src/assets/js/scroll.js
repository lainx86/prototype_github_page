// Scroll Animations

document.addEventListener('DOMContentLoaded', function() {
  // Navbar stays visible - no hide/show effect
  
  // Parallax effect for hero section
  const heroContent = document.querySelector('.hero-content');
  
  if (heroContent) {
    window.addEventListener('scroll', function() {
      const scrolled = window.pageYOffset;
      const parallax = scrolled * 0.5;
      const opacity = 1 - (scrolled / 500);
      
      if (scrolled < 600) {
        heroContent.style.transform = `translateY(${parallax}px)`;
        heroContent.style.opacity = opacity;
      }
    });
  }
  
  // Scroll progress indicator (optional)
  function updateScrollProgress() {
    const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (winScroll / height) * 100;
    
    document.documentElement.style.setProperty('--scroll-progress', scrolled + '%');
  }
  
  window.addEventListener('scroll', updateScrollProgress);
  updateScrollProgress();
  
  // Intersection Observer for fade-in animations
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
  };
  
  const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);
  
  // Observe all cards
  const cards = document.querySelectorAll('.project-card, .experience-card');
  cards.forEach(card => {
    card.classList.add('reveal');
    observer.observe(card);
  });
  
  // Smooth reveal for sections
  const sections = document.querySelectorAll('.fade-in-section');
  sections.forEach(section => {
    observer.observe(section);
  });
});