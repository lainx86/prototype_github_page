// Mouse Tracking and 3D Effects

document.addEventListener('DOMContentLoaded', function() {
  const animatedBg = document.getElementById('animated-bg');
  const profile3d = document.querySelector('.profile-3d');
  
  let mouseX = 0;
  let mouseY = 0;
  let currentX = 0;
  let currentY = 0;
  
  // Track mouse position
  document.addEventListener('mousemove', function(e) {
    mouseX = (e.clientX / window.innerWidth - 0.5) * 20;
    mouseY = (e.clientY / window.innerHeight - 0.5) * 20;
  });
  
  // Smooth animation loop
  function animate() {
    currentX += (mouseX - currentX) * 0.1;
    currentY += (mouseY - currentY) * 0.1;
    
    // Apply transform to animated background
    if (animatedBg) {
      const bgElement = animatedBg.querySelector('div');
      if (bgElement) {
        bgElement.style.transform = `translate(${currentX}px, ${currentY}px)`;
      }
    }
    
    // Apply 3D rotation to profile image
    if (profile3d) {
      profile3d.style.transform = `
        perspective(1000px) 
        rotateX(${-currentY * 0.5}deg) 
        rotateY(${currentX * 0.5}deg)
      `;
    }
    
    requestAnimationFrame(animate);
  }
  
  animate();
  
  // Parallax effect for cards
  const cards = document.querySelectorAll('.project-card, .experience-card');
  
  cards.forEach(card => {
    card.addEventListener('mousemove', function(e) {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      
      const rotateX = (y - centerY) / 10;
      const rotateY = (centerX - x) / 10;
      
      card.style.transform = `
        perspective(1000px) 
        rotateX(${rotateX}deg) 
        rotateY(${rotateY}deg)
        scale3d(1.02, 1.02, 1.02)
      `;
    });
    
    card.addEventListener('mouseleave', function() {
      card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
    });
  });
});