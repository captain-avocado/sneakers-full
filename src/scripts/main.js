import 'ion-rangeslider/css/ion.rangeSlider.css';
import 'ion-rangeslider/css/ion.rangeSlider.skinHTML5.css';
import 'ion-rangeslider/js/ion.rangeSlider.min.js';

// import Glide, { Breakpoints } from '@glidejs/glide/dist/glide.modular.esm';
// '@glidejs/glide/dist/glide.modular.esm';

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

const modalGlide = new Glide('.glide--modal', {
    type: 'slider',
    startAt: 0,
    perView: 1,
    gap: 0,
    hoverpause: true,
    animationDuration: 500,
    animationTimingFunc: 'linear',
    touchDistance: false,
    swipeThreshold: false,
    breakpoints: {
        760: {
            dragDistance: false,
            touchDistance: false,
        },
    },
}).mount();

const previewGlide = new Glide('.glide--preview', {
    type: 'slider',
    startAt: 0,
    perView: 3,
    // focusAt: 'center',
    // gap: 30,
    // autoplay: 5000,
    hoverpause: true,
    animationDuration: 500,
    animationTimingFunc: 'linear',
    touchDistance: false,
    swipeThreshold: false,
    
    breakpoints: {
        760: {
            dragDistance: false,
            touchDistance: false,
        },
    },
}).mount();

modalGlide.on('run', function() {
    previewGlide.go(`=${modalGlide.index}`);
});

previewGlide.on('run', function() {
    modalGlide.go(`=${previewGlide.index}`);
});

const previewSlide = $('.glide__slide_preview');
previewSlide.on('click', function(e) {
    const reqIndex = $(e.currentTarget).index();
    modalGlide.go(`=${reqIndex}`);
    previewGlide.go(`=${reqIndex}`);
});

const previewGalleryItem = $('.modal__preview-item');
previewGalleryItem.on('click', function(e) {
    const reqIndex = $(e.currentTarget).index();
    modalGlide.go(`=${reqIndex}`);
    previewGlide.go(`=${reqIndex}`);
});

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
        if (window.innerWidth <= 760) {
            const priceText = `От ${data.from} руб до ${data.to}`;
            $('.modal-filter__choosed_price').text(priceText);
        }
    },
});

fromInput.on('input', function() {
    const fromValue = parseInt(fromInput.val());
    const toValue = parseInt(toInput.val());

    if (fromInput.val() !== '' && toInput.val() !== '' && fromValue < toValue) {

        $('#price-slider').data('ionRangeSlider').update({
            from: fromInput.val(),
        });
        if (window.innerWidth <= 760) {
            const priceText = `От ${fromInput.val()} руб до ${toInput.val()}`;
            $('.modal-filter__choosed_price').text(priceText);
        }
    }

    
});

toInput.on('input', function() {
    const fromValue = parseInt(fromInput.val());
    const toValue = parseInt(toInput.val());

    if (fromInput.val() !== '' && toInput.val() !== '' && fromValue < toValue) {
       
        $('#price-slider').data('ionRangeSlider').update({
            to: toInput.val(),
        });
        if (window.innerWidth <= 760) {
            const priceText = `От ${fromInput.val()} руб до ${toInput.val()}`;
            $('.modal-filter__choosed_price').text(priceText);
        }
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

        if (window.innerWidth <= 760) {
            if (curPage === 3 || curPage === 4) {
                $('.pages__item').eq(curPage).addClass('hidden');
                $('.pages__item').eq(curPage - 3).removeClass('hidden');
            }
        }
        $('.pages__item').eq(curPage - 1).removeClass('active');
        curPage--;
        $('.pages__item').eq(curPage - 1).addClass('active');

        updateProducts(curPage);
    }
    if (window.innerWidth <= 760) {
        if (curPage === 1) {
            $('.pages').children().eq(2).css('border-right', '1px solid #ececec');
        } else {
            $('.pages').children().eq(2).css('border-right', '');
        }
    }
});

nextBtn.on('click', function(e) {
    console.log(curPage);

    e.preventDefault();
    console.log(e.currentTarget);
    if (curPage < 5) {

        if (window.innerWidth <= 760) {
            if (curPage === 3 || curPage === 2)  {
                $('.pages__item').eq(curPage + 1).removeClass('hidden');
                $('.pages__item').eq(curPage - 2).addClass('hidden');
            }
        }

        $('.pages__item').eq(curPage - 1).removeClass('active');
        curPage++;
        $('.pages__item').eq(curPage - 1).addClass('active');
        // updateProducts(curPage);
    }
    if (curPage === 1) {
        $('.pages').children().eq(2).css('border-right', '1px solid #ececec');
    } else {
        $('.pages').children().eq(2).css('border-right', '');
    }
});

$('.pages__item').on('click', function(e) {

    e.preventDefault();
    const curItem = $(e.currentTarget);
    const activeItem = $('.pages').children().eq(curPage - 1);

    if (activeItem.index() !== curItem.index()) {
        activeItem.removeClass('active');
        curItem.addClass('active');
        const prevCurPage = curPage;
        curPage = curItem.index() + 1;

        if (curPage === 1) {
            $('.pages').children().eq(2).css('border-right', '1px solid #ececec');
        } else {
            $('.pages').children().eq(2).css('border-right', '');
        }

        //
        if (curPage !== 1 && curPage !== 5) {
            const leftSibling = $('.pages__item').eq(curPage - 2);
            const rightSibling = $('.pages__item').eq(curPage);

            $('.pages__item').addClass('hidden');
            $('.pages').children().eq(curPage - 1).removeClass('hidden');
            leftSibling.removeClass('hidden');
            rightSibling.removeClass('hidden');
        }
        


        //
        updateProducts(curPage);
    }
    
});

function togglePopup(e) {
    e.preventDefault();
    const target = $(e.currentTarget);
    if (window.innerWidth <= 1200) {
        const prevActiveItem = target.closest('.filters').find('.title.active');
        if (prevActiveItem.length && !target.is(prevActiveItem)) {
            prevActiveItem.removeClass('active');
            prevActiveItem.find('i').removeClass('active');
        }
    }
    target.toggleClass('active');
    target.find('i').toggleClass('active');

    if (!target.hasClass('active')) {
        setTimeout(function() {
            target.parent().find('.filter__content').addClass('no-bottom-border'); 
        }, 550);
    } else {
        target.parent().find('.filter__content').removeClass('no-bottom-border'); 
    }
}

$('.title').on('click', togglePopup);

triggerPopup('.city__link', '.city-popup');
triggerPopup('.btn_close', '.cart-popup');
triggerPopup('.icons__link_avatar', '.auth-popup');
triggerPopup('.icons__link_cart', '.cart-popup');

$('.city-content__item').on('click', function(e) {
    const choosedItem = $(e.currentTarget);
    $('.city-content__item.active').removeClass('active');
    choosedItem.addClass('active');
    $('.set-city').text(choosedItem.find('.city-content__name').text());
    if ($('.set-city').hasClass('set-icon')) {
        const value = 'images/sprite.svg#' + choosedItem.find('.city-content__name').data('name');
        const icon = document.querySelector('.modal-filter__svg_city use');
        icon.setAttributeNS('http://www.w3.org/1999/xlink', 'href', value);
    }
});

$('.modal-menu__city').on('click', function() {
    $('.modal-city').toggleClass('is-active');
});

$('.modal-city__close-link').on('click', function(e) {
    e.preventDefault();
    e.stopPropagation();
    $('.modal-city').toggleClass('is-active');
    $('.modal-filter__name_city').toggleClass('is-highlighted');
    $('.modal-filter__svg_city').toggleClass('is-highlighted');
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
        }, 250);
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
        }, 250);
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


const modal = document.querySelector('.modal');
const triggers = $('.modal-trigger');
// var closeButton = document.querySelector(".close-button");

function toggleModal() {
    modal.classList.toggle('active');

    $('html').toggleClass('active');
    document.body.classList.toggle('active');
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

$('.reset').on('click', function(e) {
    e.preventDefault();
    const target = $(e.currentTarget);
    let inputList;
    if (window.innerWidth <= 760) {
        console.log(target);
        inputList = target.siblings('.modal-filters__list').find('ul.filter__content');
        console.log(inputList);

    } else {
        inputList = target.closest('.filters').find('ul.filter__content');
    }
    $(inputList).each(function() {
        const inputs = $(this).find('input');
        const firstInput = inputs.first();
        firstInput.prop('checked', true);
        inputs.not(firstInput).prop('checked', false);
    });
});

const hamburger = $('.hamburger');
const modalMenu = $('.modal-menu');
hamburger.on('click', function(e) {
    e.preventDefault();
    // if (!$('.open-filters').hasClass('is-active')) {
    hamburger.toggleClass('is-active');
    modalMenu.toggleClass('is-active');
    $('body').toggleClass('active');
});

const openFiltersBtn = $('.open-filters');
openFiltersBtn.on('click', function(e) {
    e.preventDefault();
    openFiltersBtn.toggleClass('is-active');
    $('.modal-filters').toggleClass('is-active');
    $('body').toggleClass('active');
});


if (window.innerWidth <= 760) {
    $('.filter__content').addClass('is-modal');
}

$('.modal-filter__icon, .modal-filter__text').on('click', function(e) {
    
    const modalFilterList = $('.modal-filters__list');
    const prevActiveItem = modalFilterList.find('.is-modal-active');
    if (prevActiveItem.length) {
        prevActiveItem.removeClass('is-modal-active');
    }

    const target = $(e.currentTarget);

    let name = target.parent().find('.modal-filter__name');
    let icon = target.parent().find('.modal-filter__icon');
    let svg = target.parent().find('.modal-filter__svg');
    
    name.toggleClass('is-highlighted');
    icon.toggleClass('is-highlighted');
    svg.toggleClass('is-highlighted');

    if (!prevActiveItem.closest('.modal-filter').is(target.parent())) {
    
        const filterType = target.parent().data('filter-type') + '-content';
        const filterContent = $(`.filter__content.${filterType}`);
        if (!filterContent.find($('.close-icon')).length) {
            $('.close-icon').clone().removeClass('hidden').addClass('filters-icon').appendTo(filterContent);
            $('.filters-icon a').on('click', function(ev) {
                name = target.parent().find('.modal-filter__name');
                icon = target.parent().find('.modal-filter__icon');
                svg = target.parent().find('.modal-filter__svg');
                
                name.removeClass('is-highlighted');
                icon.removeClass('is-highlighted');
                svg.removeClass('is-highlighted');
                ev.preventDefault();
                setTimeout(function() {
                    filterContent.removeClass('is-modal-active');        
                }, 10);
            });
        }

        name = prevActiveItem.closest('.modal-filter').find('.modal-filter__name');
        icon = prevActiveItem.closest('.modal-filter').find('.modal-filter__icon');
        svg = prevActiveItem.closest('.modal-filter').find('.modal-filter__svg');
        name.toggleClass('is-highlighted');
        icon.toggleClass('is-highlighted');
        svg.toggleClass('is-highlighted');
        
        if (!target.parent().find('.filter__content').length) {
            filterContent.appendTo(target.parent());
            console.log(target.parent());
        }
        setTimeout(function() {
            filterContent.toggleClass('is-modal-active');  
        }, 10);
    }
});

// const modalFilter = $('.modal-filter');
// const modalFilterList = $('.modal-filters__list');
// modalFilter.on('click', function(e) {

//     console.log(e.target);
//     console.log(e.currentTarget);

//     const prevActiveItem = modalFilterList.find('.is-modal-active');
//     if (prevActiveItem.length) {
//         prevActiveItem.removeClass('is-modal-active');
//     }
//     const target = $(e.currentTarget);

//     let name = target.find('.modal-filter__name');
//     let icon = target.find('.modal-filter__icon');
//     let svg = target.find('.modal-filter__svg');

//     name.toggleClass('is-highlighted');
//     icon.toggleClass('is-highlighted');
//     svg.toggleClass('is-highlighted');

//     if (!prevActiveItem.closest('.modal-filter').is(target)) {
        
//         name = prevActiveItem.closest('.modal-filter').find('.modal-filter__name');
//         icon = prevActiveItem.closest('.modal-filter').find('.modal-filter__icon');
//         svg = prevActiveItem.closest('.modal-filter').find('.modal-filter__svg');
//         name.toggleClass('is-highlighted');
//         icon.toggleClass('is-highlighted');
//         svg.toggleClass('is-highlighted');

//         const filterType = target.data('filter-type') + '-content';
//         const filterContent = $(`.filter__content.${filterType}`);
//         if (!filterContent.find($('.close-icon')).length) {
//             $('.close-icon').clone().removeClass('hidden').addClass('filters-icon').appendTo(filterContent);
//             $('.filters-icon a').on('click', function(ev) {
//                 ev.preventDefault();
//                 setTimeout(function() {
//                     filterContent.removeClass('is-modal-active');        
//                 }, 10);
//             });
//         }
    
//         if (!target.find('.filter__content').length) {
//             filterContent.appendTo(target);
//         }
//         setTimeout(function() {
//             filterContent.toggleClass('is-modal-active');  
//         }, 10);
//     }
// });






$(document).on('scroll', function(){
    if (window.scrollY > 0) {
        $('.scroll-up').addClass('is-active');
    } else {
        $('.scroll-up').removeClass('is-active');
    }
});

$('.scroll-up').on('click', function(e) {
    e.preventDefault();
    if (!$('.open-filters').hasClass('is-active')) {
        $('html, body').animate({
            scrollTop: 0,
        }, 500);
    }
});


$('.radio').on('click', function(e) {
   
    const target = $(e.target);
    const filterContent = target.closest('ul');
    const checkedInput = filterContent.find('input:checked');
    const checkedInputNames = checkedInput.siblings('.filter-item-name');

    console.log(checkedInputNames);
    console.log($(checkedInputNames[0]).text());
    
    let text = '';
    let flag = false;
    for (let i = 0; i < checkedInputNames.length; i++) {
        if (i === 2) {
            text += ` и еще ${checkedInputNames.length - i}`;
            flag = true;
            break;
        }
        text += $(checkedInputNames[i]).text() + ', ';
    }
    if (!flag) {
        text = text.substring(0, text.length - 2);
    }
    const textPlace = filterContent.siblings('.modal-filter__text').find('.modal-filter__choosed');
    textPlace.text('');
    textPlace.text(text);



});

