"use strict";
jQuery(document).ready(function ($) {
    window.debug = window.location.hostname === 'localhost';
    const highResBodyFontSize = '20px';
    const standardBodyFontSize = '15px';
    let screenSizeInfo = {
        x: 0,
        y: 0
    }
    adjustForResolution();

    // var el = jQuery('.navbar-fixed-top');
    // if (el && el[0]) {
    //     el = el[0];
    // }
    // var headerElBg = (el && el.style && el.backgroundColor) ? el.style.backgroundColor : (1,1,1);

    /******************************* FUNCTIONS BY ROB :) **************************/

    function rgbToHex(c) {
        var hex = c.toString(16);
        return hex.length == 1 ? "0" + hex : hex;
    }

    function rgbToHex(r, g, b) {
        return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
    }

    function hexToRgb(hex) {
        var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
        return result ? {
            r: parseInt(result[1], 16),
            g: parseInt(result[2], 16),
            b: parseInt(result[3], 16)
        } : null;
    }

    function isHex(c) {
        var regex = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i;
        return c.match(regex);
    }

    function isRgb(c) {
        var regex = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i;
        return c.match(regex);
    }

    function getFineTime() {
        const now = new Date();
        const m = now.getMinutes();
        const s = now.getSeconds();
        const ms = now.getMilliseconds();
        return m.toString() + ':' + s.toString() + ':' + ms.toString();
    }

    $(window).load(function () {
        $(".loaded").fadeOut();
        $(".preloader").delay(1000).fadeOut("slow");
        if (window.debug) { console.log('window.load', '@: ', getFineTime()); }
    });
    /*---------------------------------------------*
     * Mobile menu
     ---------------------------------------------*/
    $('#navbar-collapse').find('a[href*=#]:not([href=#])').click(function () {
        if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
            var target = $(this.hash);
            target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
            if (target.length) {
                $('html,body').animate({
                    scrollTop: (target.offset().top - 40)
                }, 1000);
                if ($('.navbar-toggle').css('display') != 'none') {
                    $(this).parents('.container').find(".navbar-toggle").trigger("click");
                }
                return false;
            }
        }
    });




    /* ---------------------------------------------------------------------
     For very high screen resolutions
     ---------------------------------------------------------------------= */

    jQuery(window).resize(function () {
        adjustForResolution();
    });
    jQuery(window).hover(function () {
        adjustForResolution();
    });

    function adjustForResolution() {
        const x = window.screen.availWidth;
        const y = window.screen.availHeight;
        if (!(x !== screenSizeInfo.x || y !== screenSizeInfo.y)) {
            console.log('return');
            return;
        }
        console.log('no return');
        screenSizeInfo = {
            x: x,
            y: y
        }
        if (window.debug) {
            console.log('x: ', x, 'y: ', y, '@: ', getFineTime());
        }
        const b = document.querySelector('body');
        if (x > 3500 && y > 1900) {
            b.style.fontSize = highResBodyFontSize;
        }
        else {
            b.style.fontSize = standardBodyFontSize;
        }
    }

    /* ---------------------------------------------------------------------
     Menu fade
     ---------------------------------------------------------------------= */

    jQuery(window).scroll(function () {
        var top = jQuery(document).scrollTop();
        var height = 300;
        var maxO = 0.9;
        var minO = (window.innerWidth > 767 ? 0 : 0.5);
        var el = jQuery('.navbar-fixed-top');
        if (el && el[0]) {
            el = el[0];
        }
        if (top > 5 && top < height) {
            var o = (maxO - (((top / height)) * maxO));
            o = (o < minO ? minO : o);
            el.style.opacity = o;
            $('#mainMenuBg').removeClass('menu-slide-up');
        }
        else if (top > height) {
            el.style.opacity = o;
            $('#mainMenuBg').addClass('menu-slide-up');
        } else {
            el.style.opacity = maxO;
        }
    });

    // scroll Up

    $(window).scroll(function () {
        if ($(this).scrollTop() > 600) {
            $('.scrollup').fadeIn('slow');
        } else {
            $('.scrollup').fadeOut('slow');
        }
    });
    $('.scrollup').click(function () {
        $("html, body").animate({ scrollTop: 0 }, 1000);
        return false;
    });


    //End
});
