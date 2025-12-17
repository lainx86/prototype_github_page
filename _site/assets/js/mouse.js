/* Minimalist Mouse Glow Effect - Linear Style */

document.addEventListener('DOMContentLoaded', function () {
  // Create the glow element
  const glow = document.createElement('div');
  glow.className = 'mouse-glow';
  document.body.appendChild(glow);

  // Add styles dynamically
  const style = document.createElement('style');
  style.innerHTML = `
    .mouse-glow {
      pointer-events: none;
      position: fixed;
      top: 0;
      left: 0;
      width: 600px;
      height: 600px;
      background: radial-gradient(circle at center, rgba(99, 102, 241, 0.08), transparent 70%);
      transform: translate(-50%, -50%);
      z-index: 9998; /* Behind nav (9999) but above content */
      opacity: 0;
      transition: opacity 0.5s ease;
    }
  `;
  document.head.appendChild(style);

  let mouseX = 0;
  let mouseY = 0;
  let cursorX = 0;
  let cursorY = 0;

  // Track mouse
  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;

    // Show glow on first movement
    if (glow.style.opacity !== '1') {
      glow.style.opacity = '1';
    }
  });

  // Smooth follow animation
  function animate() {
    // Smooth lerp
    cursorX += (mouseX - cursorX) * 0.1;
    cursorY += (mouseY - cursorY) * 0.1;

    glow.style.left = `${cursorX}px`;
    glow.style.top = `${cursorY}px`;

    requestAnimationFrame(animate);
  }

  animate();

  // Subtle Parallax for Profile (Significantly reduced)

});