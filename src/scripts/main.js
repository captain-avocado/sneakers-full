import 'ion-rangeslider/css/ion.rangeSlider.css';
import 'ion-rangeslider/css/ion.rangeSlider.skinHTML5.css';
import 'ion-rangeslider/js/ion.rangeSlider.min.js';

import Glide from '@glidejs/glide';

import triggerPopup from './modules/triggerPopup';
import changePrice from './modules/changePrice';
import checkAll from './modules/checkAll';


const mainGlide = new Glide('.glide', {
    type: 'carousel',
    startAt: 0,
    perView: 1,
    gap: 0,
    autoplay: 5000,
    hoverpause: true,
    animationDuration: 500,
    animationTimingFunc: 'ease-in-out',
}).mount();

const glideInfo = $('.glide__info');
const glideName = glideInfo.find('.info__text');
const glidePrice = glideInfo.find('.info__price');
const glideBtn = glideInfo.find('.info__btn');

const glideData = [
    { name: 'Nike Epic React Flyknit iD', price: '11 990р' },
    { name: 'Vans SK8-HI', price: '4 790р' },
    { name: 'Nike Metcon 4 iD', price: '10 490р' },
];

glideBtn.on('transitionend', function() {
    if (glideInfo.hasClass('non-active')) {
        glideName.text(glideData[mainGlide.index].name);
        glidePrice.text(glideData[mainGlide.index].price);
    }
});

mainGlide.on('run', function() {
    $('.glide').find('.info').addClass('non-active');
});

mainGlide.on('run.after', function() {
    $('.glide').find('.info').removeClass('non-active');
});

new Glide('.glide--modal', {
    type: 'carousel',
    startAt: 0,
    perView: 1,
    gap: 0,
    // autoplay: 5000,
    hoverpause: true,
    animationDuration: 500,
    animationTimingFunc: 'linear',
}).mount();

new Glide('.glide--preview', {
    type: 'slider',
    startAt: 0,
    perView: 3,
    gap: 30,
    // autoplay: 5000,
    hoverpause: true,
    animationDuration: 500,
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

$('.title').on('click', function(e) {
    e.preventDefault();
    $(e.currentTarget).toggleClass('active');
    $(e.currentTarget).find('i').toggleClass('active');

    if (!$(e.currentTarget).hasClass('active')) {
        setTimeout(function() {
            $(e.currentTarget).parent().find('.filter__content').addClass('no-bottom-border'); 
        }, 550);
    } else {
        $(e.currentTarget).parent().find('.filter__content').removeClass('no-bottom-border'); 
    }
    
    
});

// let offset = $('.city__link').offset().left + 'px';
// console.log($('.city-popup').find('.popup__triangle').css('left', offset));

triggerPopup('.city__link', '.city-popup');
triggerPopup('.btn_close', '.cart-popup');
triggerPopup('.icons__link_avatar', '.auth-popup');
triggerPopup('.icons__link_cart', '.cart-popup');

$('.city-popup__item').on('click', function(e) {
    const choosedItem = $(e.currentTarget);
    $('.city-popup__item.active').removeClass('active');
    choosedItem.addClass('active');
    $('.city__name').text(choosedItem.find('.city-popup__name').text());
});

$('.cart-num__plus').on('click', function(e) {
    e.preventDefault();
    const target = $(e.currentTarget);
    const productNumItem =  target.siblings('.cart-num__cur-num');
    const productPriceItem = target.closest('.cart-popup__item').find('.cart-product__price');
    changePrice(productNumItem, productPriceItem, '+');
});

$('.cart-num__minus').on('click', function(e) {
    e.preventDefault();
    const target = $(e.currentTarget);
    const productNumItem =  target.siblings('.cart-num__cur-num');
    const productPriceItem = target.closest('.cart-popup__item').find('.cart-product__price');
    changePrice(productNumItem, productPriceItem, '-');
});

$('.icons__link_search').on('click', function(e) {
    e.preventDefault();
    $('.header__right').addClass('active');
    $('.input-search').toggleClass('active');
    $(e.currentTarget).addClass('active');
    const inputSearch = $('.input-search');
    let hasUsed = false;
    if (!inputSearch.hasClass('used')) {
        hasUsed = true;
        setTimeout(function(){
            inputSearch.addClass('used');
            inputSearch.focus();
        }, 550);
    } else if (!hasUsed) {
        inputSearch.removeClass('used');
        hasUsed = false;
    }

});

$(document).on('click', function(e) {
    const target = e.target;
    const search = $('.input-search');
    const searchIcon = $('.icons__link_search');
    // console.log('efef');
    if (!$(target).is(search) && !$(target).parents().is(search) &&!$(target).is(searchIcon) && !$(target).parents().is(searchIcon) && $(search).hasClass('active')) {
        // $(search).fadeOut(2000, function (){
        // $(search).removeClass('active');
        
        $('.header__right').removeClass('active');
        search.removeClass('active');
        setTimeout(function(){
            searchIcon.removeClass('active');
        }, 350);
        // searchIcon.removeClass('active');
        // });
    }
});


$('.brands').find('.radio_brands').on('change', function(e) {
    if ($(e.currentTarget).closest('.category').first().index() !== 0) {
        $('.brands').first().find('.category').first().find('.radio_brands').prop('checked', false);
    } else {
        let radio = $('.brands').find('.radio_brands');
        radio = radio.not(radio.first());
        radio.prop('checked', false);
    }
});

checkAll('.brands', '.category', '.radio_brands');
checkAll('.colors', '.colors__item', '.colors__checkbox');
checkAll('.sizes', '.sizes__item', '.sizes__radio');

const menu = $('.menu');
const menuFixed = $('.menu-fixed');
const startScroll = menu.offset().top + menu.outerHeight();
$(window).on('scroll', function() {
    if (window.scrollY >= startScroll) {
        menuFixed.addClass('fixed');
    } else {
        menuFixed.removeClass('fixed');
    }
});

$('.input-search').blur(function() {

    // check if the input has any value (if we've typed into it)
    if ($(this).val())
        $(this).addClass('used');
    else
        $(this).removeClass('used');
});


var modal = document.querySelector('.modal');
var triggers = $('.modal-trigger');
// var closeButton = document.querySelector(".close-button");

function toggleModal() {
    modal.classList.toggle('active');
}

function windowOnClick(event) {
    if (event.target === modal) {
        toggleModal();
    }
}

triggers.on('click', function(e) {
    e.preventDefault();
    toggleModal();
});
window.addEventListener('click', windowOnClick);

