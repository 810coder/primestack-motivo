/*==========

Template Name: Beauty & Salon

==========*/

/*====================
----- JS INDEX -----
1.Whole Script Strict Mode Syntax
2.WOW Js 
3.SscrollToTop Js
4.Headewr Sticky Js
5.Toogle Menu Mobile Js
6.Start Clock Script Js
7.pagescroll Js
8.about slide
9.gallery slide
====================*/
jQuery(document).ready(function ($) {
  // Whole Script Strict Mode Syntax
  'use strict';
  var window_size = jQuery(window).width();
  // WOW Js Start
  new WOW().init();
  // WOW Js End

  // SscrollToTop Start
  const backToTop = document.getElementById('backToTop');

  window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
      backToTop.classList.add('visible');
    } else {
      backToTop.classList.remove('visible');
    }
  });

  backToTop.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  });

  let lastScrollY = 0;
  let ticking = false;

  window.addEventListener('scroll', () => {
    lastScrollY = window.scrollY;

    if (!ticking) {
      window.requestAnimationFrame(() => {
        ticking = false;
      });

      ticking = true;
    }
  });

  document.addEventListener('DOMContentLoaded', function () {
    if ('IntersectionObserver' in window) {
      const lazyElements = document.querySelectorAll('.lazy');

      const lazyObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const lazyElement = entry.target;
            lazyObserver.unobserve(lazyElement);
          }
        });
      });

      lazyElements.forEach((lazyElement) => {
        lazyObserver.observe(lazyElement);
      });
    }
  });

  // ScrollToTop End

  // Headewr  Sticky Start
  jQuery(window).scroll(function () {
    var height = jQuery(window).scrollTop();
    if (height > 100) {
      jQuery('.site-header').addClass('sticky-header');
    } else {
      jQuery('.site-header').removeClass('sticky-header');
    }
  });
  // Headewr  Sticky End

  // Toogle Menu Mobile JS Start
  $('.menu-toggle').on('click', function () {
    $('.main-nav-bar').toggleClass('toggled');
  });

  if (window_size <= 991) {
    jQuery('.menu-item').on('click', function () {
      jQuery('#site-navigation').removeClass('toggled');
    });

    jQuery('#menu_quote').on('click', function () {
      jQuery('#site-navigation').removeClass('toggled');
    });
  }
  // Toogle Menu Mobile JS End
});

// Time
// START CLOCK SCRIPT

Number.prototype.pad = function (n) {
  for (var r = this.toString(); r.length < n; r = 0 + r);
  return r;
};

function updateClock() {
  var now = new Date();
  var milli = now.getMilliseconds(),
    sec = now.getSeconds(),
    min = now.getMinutes(),
    hou = now.getHours(),
    mo = now.getMonth(),
    dy = now.getDate(),
    yr = now.getFullYear();
  var months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];
  var tags = ['mon', 'd', 'y', 'h', 'm', 's', 'mi'],
    corr = [months[mo], dy, yr, hou.pad(2), min.pad(2), sec.pad(2), milli];
  for (var i = 0; i < tags.length; i++)
    document.getElementById(tags[i]).firstChild.nodeValue = corr[i];
}

function initClock() {
  updateClock();
  window.setInterval('updateClock()', 1);
}

// END CLOCK SCRIPT

// pagescroll

document.addEventListener('DOMContentLoaded', function () {
  const currentUrl = window.location.href;

  // Get all menu links
  const menuLinks = document.querySelectorAll('.menu-item a');

  menuLinks.forEach((link) => {
    const linkHref = link.href;

    // If the full href of the link matches the current URL (ignoring trailing slashes)
    if (currentUrl.replace(/\/$/, '') === linkHref.replace(/\/$/, '')) {
      // Add 'active' to its parent <li>
      link.parentElement.classList.add('active');
    } else {
      link.parentElement.classList.remove('active');
    }
  });
});

$('[data-fancybox="preview"]').fancybox({
  thumbs: {
    autoStart: true,
  },
});

document.addEventListener('DOMContentLoaded', function () {
  const slideshow = document.getElementById('about-slideshow');

  const images = [
    './assets/images/about1.jpg',
    './assets/images/about2.jfif',
    './assets/images/about3.jfif',
  ];

  let current = 0;

  function changeSlide() {
    slideshow.style.backgroundImage = `url('${images[current]}')`;
    current = (current + 1) % images.length;
  }

  // Start the slideshow
  changeSlide(); // Show the first image immediately
  setInterval(changeSlide, 3000); // Change every 3 seconds
});

// gallery slide

document.addEventListener('DOMContentLoaded', () => {
  const wrapper = document.getElementById('customGalleryWrapper');
  const slides = wrapper.querySelectorAll('.carousel-slide');
  const prevBtn = document.getElementById('customPrevBtn');
  const nextBtn = document.getElementById('customNextBtn');

  let currentIndex = 0;
  let autoSlide;

  function updateSlide(index) {
    wrapper.style.transform = `translateX(-${index * 100}%)`;
  }

  function nextSlide() {
    currentIndex = (currentIndex + 1) % slides.length;
    updateSlide(currentIndex);
  }

  function prevSlide() {
    currentIndex = (currentIndex - 1 + slides.length) % slides.length;
    updateSlide(currentIndex);
  }

  nextBtn.addEventListener('click', () => {
    nextSlide();
    resetAutoSlide();
  });

  prevBtn.addEventListener('click', () => {
    prevSlide();
    resetAutoSlide();
  });

  // Touch support for mobile
  let startX = 0;
  wrapper.addEventListener('touchstart', (e) => {
    startX = e.touches[0].clientX;
  });

  wrapper.addEventListener('touchend', (e) => {
    const endX = e.changedTouches[0].clientX;
    const diff = startX - endX;
    if (diff > 50) {
      nextSlide();
      resetAutoSlide();
    } else if (diff < -50) {
      prevSlide();
      resetAutoSlide();
    }
  });

  // Auto slide every 5 seconds
  function startAutoSlide() {
    autoSlide = setInterval(nextSlide, 5000);
  }

  function resetAutoSlide() {
    clearInterval(autoSlide);
    startAutoSlide();
  }

  // Initialize
  updateSlide(currentIndex);
  startAutoSlide();
});

//   testimony

$('#testimonialCarousel').carousel({
  interval: 5000, // 5 seconds
  pause: 'hover', // pause on mouse hover
});

// text slides
