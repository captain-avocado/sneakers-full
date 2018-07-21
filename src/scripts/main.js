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

const prevBtn = $('.pagination__prev');
const nextBtn = $('.pagination__next');

let curPage = 3;

function updateProducts(curPage) {
    $.ajax({
        url: '../data.json',
        dataType: 'json',
        success: function(data) {                 
    
            $('.goods').fadeOut(500, function() {

                $('.product').each(function(index, element) {
                    // console.log(element, index);
                    const $el = $(element);
                    const curItemData = data.page[curPage - 1].item[index];
                    $el.find('.product__company').text(curItemData.company);
                    $el.find('.product__name').text(curItemData.name);
                    $el.find('.product__img').attr('src', curItemData.imgSrc);
                    $el.find('.product__price').text(curItemData.price);
                });
    
                $('.goods').fadeIn(500);
            });
        },
    });
}

prevBtn.on('click', function(e) {
    e.preventDefault();
    if (curPage > 1) {
        $('.pages__item').eq(curPage - 1).removeClass('active');
        curPage--;
        $('.pages__item').eq(curPage - 1).addClass('active');
        updateProducts(curPage);
    }
});

nextBtn.on('click', function(e) {
    e.preventDefault();
    if (curPage < 5) {
        $('.pages__item').eq(curPage - 1).removeClass('active');
        curPage++;
        $('.pages__item').eq(curPage - 1).addClass('active');
        updateProducts(curPage);
    }
});

$('.pages__item').on('click', function(e) {

    e.preventDefault();
    const curItem = $(e.currentTarget);
    const activeItem = $('.pages').children().eq(curPage - 1);

    if (activeItem.index() !== curItem.index()) {
        activeItem.removeClass('active');
        curItem.addClass('active');
        curPage = curItem.index() + 1;
        updateProducts(curPage);
    }
    
});

