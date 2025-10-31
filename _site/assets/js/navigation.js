// Navigation JavaScript

document.addEventListener("DOMContentLoaded", function () {
  const nav = document.querySelector("nav");
  const mobileMenuBtn = document.getElementById("mobile-menu-btn");
  const mobileMenu = document.getElementById("mobile-menu");
  const navLinks = document.querySelectorAll(".nav-link");

  // Mobile Menu Toggle
  if (mobileMenuBtn && mobileMenu) {
    mobileMenuBtn.addEventListener("click", function (e) {
      e.stopPropagation();
      mobileMenu.classList.toggle("hidden");
    });

    // Close mobile menu when clicking on a link
    const mobileLinks = mobileMenu.querySelectorAll("a");
    mobileLinks.forEach((link) => {
      link.addEventListener("click", function () {
        mobileMenu.classList.add("hidden");
      });
    });

    // Close mobile menu when clicking outside
    document.addEventListener("click", function (e) {
      if (!nav.contains(e.target)) {
        mobileMenu.classList.add("hidden");
      }
    });
  }

  // Subtle scroll effect - just add class, navbar stays visible
  window.addEventListener("scroll", function () {
    const currentScroll = window.pageYOffset;

    if (currentScroll > 50) {
      nav.classList.add("scrolled");
    } else {
      nav.classList.remove("scrolled");
    }
  });

  // Update active navigation based on scroll (for single page)
  const sections = document.querySelectorAll("section[id]");

  function updateActiveNav() {
    let current = "";

    sections.forEach((section) => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;
      if (window.scrollY >= sectionTop - 150) {
        current = section.getAttribute("id");
      }
    });

    navLinks.forEach((link) => {
      link.classList.remove("active");
      const href = link.getAttribute("href");

      // Check if it's a hash link
      if (href && href.startsWith("#")) {
        if (href === `#${current}`) {
          link.classList.add("active");
        }
      } else if (href) {
        // Check if current page matches
        const currentPath = window.location.pathname;
        if (
          currentPath === href ||
          (currentPath === "/" && href === "/") ||
          (currentPath.endsWith("/") && currentPath === href + "/")
        ) {
          link.classList.add("active");
        }
      }
    });
  }

  // Update on scroll for single page
  if (sections.length > 0) {
    window.addEventListener("scroll", updateActiveNav);
    updateActiveNav();
  }

  // Set active for current page (multi-page)
  const currentPath = window.location.pathname;
  navLinks.forEach((link) => {
    const href = link.getAttribute("href");
    if (
      href === currentPath ||
      (currentPath === "/" && href === "/") ||
      (currentPath.endsWith("/") && currentPath === href + "/")
    ) {
      link.classList.add("active");
    }
  });

  // Smooth scroll for hash links
  navLinks.forEach((link) => {
    const href = link.getAttribute("href");
    if (href && href.startsWith("#")) {
      link.addEventListener("click", function (e) {
        e.preventDefault();
        const target = document.querySelector(href);
        if (target) {
          const offsetTop = target.offsetTop - 120;
          window.scrollTo({
            top: offsetTop,
            behavior: "smooth",
          });
        }
      });
    }
  });
});
