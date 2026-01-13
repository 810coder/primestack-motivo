(function ($) {
  'use strict';

  // Set full height on elements with .js-fullheight
  var fullHeight = function () {
    $('.js-fullheight').css('height', $(window).height());
    $(window).resize(function () {
      $('.js-fullheight').css('height', $(window).height());
    });
  };
  fullHeight();

  // Owl Carousel Setup
  var carousel = function () {
    $('.home-slider').owlCarousel({
      loop: true,
      autoplay: true,
      margin: 0,
      animateOut: 'fadeOut',
      animateIn: 'fadeIn',
      nav: true,
      dots: true,
      autoplayHoverPause: false,
      items: 1,
      navText: [
        "<span class='ion-ios-arrow-back'></span>",
        "<span class='ion-ios-arrow-forward'></span>",
      ],
      responsive: {
        0: { items: 1 },
        600: { items: 1 },
        1000: { items: 1 },
      },
    });
  };
  carousel();

  (function updateLabelFromFilename() {
    // 1. Get the last part of the URL path (e.g., "about-us.html")
    const path = window.location.pathname;
    const filename = path.split('/').pop();

    // 2. Remove the .html extension and replace dashes/underscores with spaces
    let cleanName = filename.replace(/\.html$/i, '').replace(/[-_]/g, ' ');

    // 3. Fallback to 'HOME' if the filename is empty (like on the root domain)
    if (cleanName === '' || cleanName === 'index') {
      cleanName = 'HOME';
    }

    // 4. Update the element
    const labelElement = document.getElementById('current-page-label-tag');
    if (labelElement) {
      labelElement.textContent = cleanName.toUpperCase();
    }
  })();

  // Add 'active' class to the current menu item
  var setActiveMenuLink = function () {
    var currentPage = window.location.pathname.split('/').pop();
    $('#primary-menu a').each(function () {
      var href = $(this).attr('href');
      if (href === currentPage || href === '') {
        $(this).addClass('active');
      }
    });
  };
  setActiveMenuLink();

  // Count Up Animation (for all .countup elements)
  var countUp = function () {
    var counters = document.querySelectorAll('.countup');
    if (!counters.length) return;

    counters.forEach(function (counter) {
      var target = parseInt(counter.getAttribute('data-target')) || 0; // final number
      var start = 0;
      var duration = 2000; // total animation time in ms
      var started = false;

      var animate = function () {
        var current = start;
        var stepTime = duration / (target - start);
        var timer = setInterval(function () {
          counter.textContent = current;
          if (current === target) {
            clearInterval(timer);
          } else {
            current++;
          }
        }, stepTime);
      };

      var observer = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting && !started) {
            started = true;
            animate();
          }
        });
      });

      observer.observe(counter);
    });
  };
  countUp();
})(jQuery);
