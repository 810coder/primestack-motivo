(function ($) {
    "use strict";

    // Set full height on elements with .js-fullheight
    var fullHeight = function () {
        $(".js-fullheight").css("height", $(window).height());
        $(window).resize(function () {
            $(".js-fullheight").css("height", $(window).height());
        });
    };
    fullHeight();

    // Owl Carousel Setup
    var carousel = function () {
        $(".home-slider").owlCarousel({
            loop: true,
            autoplay: true,
            margin: 0,
            animateOut: "fadeOut",
            animateIn: "fadeIn",
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

    // Add 'active' class to the current menu item
    var setActiveMenuLink = function () {
        var currentPage = window.location.pathname.split("/").pop();
        $("#primary-menu a").each(function () {
            var href = $(this).attr("href");
            if (href === currentPage || href === "") {
                $(this).addClass("active");
            }
        });
    };
    setActiveMenuLink();

    // Count Up Animation (for all .countup elements)
    var countUp = function () {
        var counters = document.querySelectorAll(".countup");
        if (!counters.length) return;

        counters.forEach(function (counter) {
            var target = parseInt(counter.getAttribute("data-target")) || 0; // final number
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
