(function ($) {
  'use strict';

  // 1. Set full height
  var fullHeight = function () {
    $('.js-fullheight').css('height', $(window).height());
    $(window).resize(function () {
      $('.js-fullheight').css('height', $(window).height());
    });
  };
  fullHeight();

  // 2. Owl Carousel Setup
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

  // 3. Add 'active' class to menu & update "You Are Here" text
  var setActiveMenuLink = function () {
    var path = window.location.pathname;
    var currentPage = path.split('/').pop();

    // Default to 'index.html' if path is empty
    if (currentPage === '' || currentPage === '/') {
      currentPage = 'index.html';
    }

    // Highlight the Nav Link
    $('#primary-menu a').each(function () {
      var href = $(this).attr('href');
      if (href === currentPage) {
        $(this).addClass('active');
      }
    });

    // Update "You Are Here" Label
    var setActiveMenuLink = function () {
    var path = window.location.pathname;
    var currentPage = path.split('/').pop();

    if (currentPage === '' || currentPage === '/') {
      currentPage = 'index.html';
    }

    // Highlight Nav Link
    $('#primary-menu a').each(function () {
      var href = $(this).attr('href');
      if (href === currentPage) {
        $(this).addClass('active');
      }
    });

    // Update BOTH "You Are Here" labels
    var pageTitle = currentPage.replace('.html', '').replace(/-/g, ' ');
    if (pageTitle.toLowerCase() === 'index' || pageTitle === '') {
      pageTitle = 'Home';
    }
    
    // Update the standard bar AND the new hanging tag
    $('#current-page-label').text(pageTitle);
    $('#current-page-label-tag').text(pageTitle);
  };

  // 4. Count Up Animation
  var countUp = function () {
    var counters = document.querySelectorAll('.countup');
    if (!counters.length) return;

    counters.forEach(function (counter) {
      var target = parseInt(counter.getAttribute('data-target')) || 0;
      var start = 0;
      var duration = 2000;
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

  // --- MODAL VIDEO LOGIC FOR BOOTSTRAP 4 ---
  $(document).ready(function () {
    var $videoModal = $('#videoModal');
    var modalVideo = document.getElementById('serviceVideo');

    $videoModal.on('shown.bs.modal', function () {
      if (modalVideo) {
        modalVideo.play();
      }
    });

    $videoModal.on('hidden.bs.modal', function () {
      if (modalVideo) {
        modalVideo.pause();
        modalVideo.currentTime = 0;
      }
    });
  });
})(jQuery);
