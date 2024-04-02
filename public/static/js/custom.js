


document.addEventListener('DOMContentLoaded', function() {
    "use strict";

    /* Slick Slider Main Banner Script */
    var mainBanner = document.querySelector('.main_banner');
    if (mainBanner) {
        new Glider(mainBanner, {
            slidesToShow: 1,
            dots: true,
            draggable: true,
            arrows: true,
            scrollLock: true,
            responsive: [{
                breakpoint: 768,
                settings: {
                    slidesToShow: 1,
                    draggable: true,
                }
            }]
        });
    }

    /* Featured Slider Script */
    var featuredSlider = document.querySelector('.featured_slider');
    if (featuredSlider) {
        new Glider(featuredSlider, {
            slidesToShow: 1,
            dots: true,
            draggable: true,
            arrows: true,
            scrollLock: true,
            responsive: [{
                breakpoint: 768,
                settings: {
                    slidesToShow: 1,
                    draggable: true,
                }
            }]
        });
    }

    /* Ticker Script */
    window.addEventListener('scroll', function() {
        var absoluteTicker = document.querySelector('.absolute_ticker');
        if (!absoluteTicker) return;
        if (window.scrollY > 400) {
            absoluteTicker.style.display = 'block';
        } else {
            absoluteTicker.style.display = 'none';
        }
    });

    /* SLICK SLIDER MULTIPUL SCRIPT */
    var resultSlider = document.querySelector('.result_slider');
    if (resultSlider) {
        new Glider(resultSlider, {
            slidesToShow: 6,
            centerMode: true,
            centerPadding: '0px',
            responsive: [{
                    breakpoint: 1680,
                    settings: {
                        arrows: false,
                        centerMode: true,
                        centerPadding: '0px',
                        slidesToShow: 3
                    }
                },
                {
                    breakpoint: 481,
                    settings: {
                        arrows: false,
                        centerMode: false,
                        centerPadding: '0px',
                        slidesToShow: 1
                    }
                }
            ]
        });
    }

    /* Back to Top Script */
    window.addEventListener('scroll', function() {
        var goUp = document.querySelector('.go-up');
        if (!goUp) return;
        if (window.scrollY > 400) {
            goUp.style.display = 'block';
        } else {
            goUp.style.display = 'none';
        }
    });

    var goUp = document.querySelector('.go-up');
    if (goUp) {
        goUp.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    /* COUNTDOWN Script */
    var countdown = document.querySelector('.countdown');
    if (countdown) {
        // Your countdown initialization code here
    }

    /* ROSTER SLIDER Script */
    var rosterSlider = document.querySelector('.roster');
    if (rosterSlider) {
        new Glider(rosterSlider, {
            slidesToShow: 4,
            slidesToScroll: 4,
            dots: true,
            autoplay: true,
            autoplaySpeed: 2000,
            responsive: [{
                    breakpoint: 1024,
                    settings: {
                        slidesToShow: 3,
                        slidesToScroll: 3,
                        infinite: true,
                        dots: true
                    }
                },
                {
                    breakpoint: 600,
                    settings: {
                        slidesToShow: 2,
                        slidesToScroll: 2
                    }
                },
                {
                    breakpoint: 480,
                    settings: {
                        slidesToShow: 1,
                        slidesToScroll: 1
                    }
                }
            ]
        });
    }

    /* PROGRESS BAR Script */
    var progressbars = document.querySelectorAll('.progressbars');
    if (progressbars) {
        progressbars.forEach(function(progressbar) {
            // Your progress bar initialization code here
        });
    }

    /* Counter Script */
    var counters = document.querySelectorAll('.counter');
    if (counters) {
        counters.forEach(function(counter) {
            // Your counter initialization code here
        });
    }

    /* Tool Tip Script */
    var tooltips = document.querySelectorAll('[data-toggle="tooltip"]');
    if (tooltips) {
        tooltips.forEach(function(tooltip) {
            // Your tooltip initialization code here
        });
    }

    /* TICKER SCRIPT */
    var tickers = document.querySelectorAll('.ticker');
    if (tickers) {
        tickers.forEach(function(ticker) {
            // Your ticker initialization code here
        });
    }

    /* DL Responsive Menu */
    var responsiveNavigation = document.getElementById('kode-responsive-navigation');
    if (responsiveNavigation && typeof dlmenu === 'function') {
        Array.from(responsiveNavigation.querySelectorAll('.dl-submenu')).forEach(function(submenu) {
            var parentNav = document.createElement('li');
            parentNav.classList.add('menu-item', 'kode-parent-menu');
            var anchor = submenu.previousElementSibling.cloneNode(true);
            parentNav.appendChild(anchor);
            submenu.insertBefore(parentNav, submenu.firstChild);
        });
        dlmenu();
    }

    /* Line Chart Script */
    var chartContainer = document.getElementById('chartContainer');
    if (chartContainer) {
        // Your line chart initialization code here
    }

    /* Bar Chart Script */
    var chartContainerbar = document.getElementById('chartContainerbar');
    if (chartContainerbar) {
        // Your bar chart initialization code here
    }
});

