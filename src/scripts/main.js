// import search from './modules/search';
// search();

// import 'jquery-ui';

import 'ion-rangeslider/css/ion.rangeSlider.css';
import 'ion-rangeslider/css/ion.rangeSlider.skinHTML5.css';
import 'ion-rangeslider/js/ion.rangeSlider.min.js';

// import 'owl.carousel/dist/assets/owl.carousel.min.css';
// import 'owl.carousel/dist/assets/owl.theme.default.min.css';
// import 'owl.carousel';

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
