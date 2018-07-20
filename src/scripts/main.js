import 'ion-rangeslider/css/ion.rangeSlider.css';
import 'ion-rangeslider/css/ion.rangeSlider.skinHTML5.css';
import 'ion-rangeslider/js/ion.rangeSlider.min.js';

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


const slider = $('#price-slider').data('ionRangeSlider');
const fromInput = $('#price-from');
const toInput = $('#price-to');

$('#price-slider').ionRangeSlider({
    min: 0,
    max: 20000,
    from: 500,
    to: 5000,
    type: 'int',
    grid_margin: false,
    hide_min_max: true,
    hide_from_to: true,
    onChange: function (data) {
        fromInput.val(data.from);
        toInput.val(data.to);
    },
});

fromInput.on('input', function() {
    if (fromInput.val() !== '') {
        slider.update({
            from: fromInput.val(),
        });
    }
});

toInput.on('input', function(){
    if (toInput.val() !== '') {
        slider.update({
            to: toInput.val(),
        });
    }
});



$('#sort-btn').on('click', function(e) {
    e.preventDefault();
    console.log('er');
    $('#sort-content').toggleClass('active');
});
