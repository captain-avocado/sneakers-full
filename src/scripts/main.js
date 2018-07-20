// import search from './modules/search';
// search();

// import 'jquery-ui';

import 'ion-rangeslider/css/ion.rangeSlider.css';
import 'ion-rangeslider/css/ion.rangeSlider.skinHTML5.css';
import 'ion-rangeslider/js/ion.rangeSlider.min.js';

// import 'owl.carousel/dist/assets/owl.carousel.min.css';
// import 'owl.carousel/dist/assets/owl.theme.default.min.css';
// import 'owl.carousel';


import Glide from '@glidejs/glide';

new Glide('.glide', {
    type: 'carousel',
    startAt: 0,
    perView: 1,
    gap: 0,
    // autoplay: 5000,
    hoverpause: true,
    animationDuration: 800,
    animationTimingFunc: 'linear',
}).mount();

$('#price-slider').ionRangeSlider({
    min: 0,
    max: 20000,
    from: 1000,
    to: 9000,
    type: 'int',
    grid_margin: false,
    hide_min_max: true,
    hide_from_to: true,
});


$('#sort-btn').on('click', function(e) {
    e.preventDefault();
    console.log('er');
    $('#sort-content').toggleClass('active');
});
