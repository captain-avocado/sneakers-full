import 'ion-rangeslider/css/ion.rangeSlider.css';
// import 'ion-rangeslider/css/ion.rangeSlider.skinHTML5.css';
import 'ion-rangeslider/js/ion.rangeSlider.min.js';

// import Glide, { Breakpoints } from '@glidejs/glide/dist/glide.modular.esm';
// '@glidejs/glide/dist/glide.modular.esm';

import Glide from '@glidejs/glide';
// const Glide = require('@glidejs/glide');

import triggerPopup from './modules/triggerPopup';
import changePrice from './modules/changePrice';
import checkAll from './modules/checkAll';
//запрос при попадании на страницу: авторизован ли пользователь?


//список товаров
const goods = [
    {
        id: 'articul-1',
        company: 'Nike',
        model: 'ez1',
        colors: ['grey', 'orange'],
        price: 10290,
        descr: 'TexttexteeetfefTexttexteeetfefTexttexteeetfefTexttexteeetfef',
        sizes: [39, 40, 42],
        images: [
            'https://images.unsplash.com/photo-1559311745-a57f6233488e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1717&q=80',
            'https://images.unsplash.com/photo-1559255394-044328bfa8b5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=670&q=80',
            'https://images.unsplash.com/photo-1559261514-64081d3526cf?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=802&q=80',
        ],
    },
    {
        id: 'articul-2',
        company: 'Nikesss',
        model: 'ez1efef -2',
        colors: ['grey', 'orange'],
        price: 11290,
        descr: 'fir',
        sizes: [40, 41, 42],
        images: ['https://images.unsplash.com/photo-1559311745-a57f6233488e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1717&q=80'],
    },
];

//возвращает дом-элемент колор радио-кнопку
const renderColor = (color) => {
    const node = document.createElement('li');
    node.classList.add('sneaker-colors__item');
    node.innerHTML = `<label class="label">
                        <input class="radio radio_sneaker" type="radio" name="sneaker-colors-1">
                            <div class="color-fake" data-color="${color}"></div>
                      </label>`;
    return node;
};

const renderSize = (size) => {
    const node = document.createElement('li');
    node.classList.add('categories__item');
    node.classList.add('category');
    node.classList.add('categories__item_modal-sizes');
    node.innerHTML = `<label class="category__label label">
                        <input class="category__radio radio radio_modal-sizes" type="radio" checked="" name="modal-sizes">
                        <div class="category__radio-fake radio-fake radio-fake_modal-sizes"></div>
                        <div class="category__name">${size}</div>
                      </label>`;
    return node;
};

const renderGlideItem = (img) => {
    const node = document.createElement('li');
    node.classList.add('glide__slide_modal');
    node.classList.add('glide__slide');
    node.innerHTML = `<img src="${img}"/>`;
    return node;
};

const renderImgMainItem = (img) => {
    const node = document.createElement('li');
    node.classList.add('glide__slide');
    node.classList.add('glide__slide_preview');
    node.innerHTML = `<img src="${img}" />`;
    return node;
};

const renderImgItem = (img) => {
    const node = document.createElement('li');
    node.classList.add('modal__preview-item');
    node.innerHTML = `<div class="modal__preview-inner"><img class="modal__preview-img" src="${img}"></div>`;
    return node;
};

const renderGoodDetail = (good) => {
    const {
        id,
        company,
        model,
        colors,
        price,
        descr,
        sizes,
        images,
    } = good;

    const modal = document.querySelector('.modal');
    modal.querySelector('.modal__code-nums').innerText = id;
    modal.querySelector('.product-text__company').innerText = company;
    modal.querySelector('.product-text__name').innerText = model;
    modal.querySelector('.modal__product-price-nums').innerText = price;
    modal.querySelector('.modal__descr').innerText = descr;

    const colorList = modal.querySelector('ul.sneaker-colors.select-modal__list');
    console.log(colorList);
    colors.forEach((color) => {
        const colorNode = renderColor(color);
        colorList.appendChild(colorNode);
    });

    const sizeList = modal.querySelector('ul.select-modal__list.categories.categories_modal-sizes');
    sizes.forEach((size) => {
        const sizeNode = renderSize(size);
        sizeList.appendChild(sizeNode);
    });

    const glideList = modal.querySelector('.glide--modal ul');
    const imgMainList = modal.querySelector('ul.glide__slides.glide__slides_preview');
    const imgList = modal.querySelector('ul.modal__preview-gallery');
    images.forEach((img) => {
        const glideNode = renderGlideItem(img);
        glideList.appendChild(glideNode);

        const imgMainNode = renderImgMainItem(img);
        imgMainList.appendChild(imgMainNode);

        const imgNode = renderImgItem(img);
        imgList.appendChild(imgNode);
    });


};

renderGoodDetail(goods[0]);

//вычислить общее кол-во товаров
//сохранить текущее кол-во товаров на странице
//вычислить необходимое кол-во страниц
//отрендерить пагинацию
//отобразить первую страницу

//при изменении кол-ва товаров на странице повторить действия

// const goodsNum = 120;
// if (goodsNum <= 0) console.log('error');
// const pageNumSwitchers = document.querySelectorAll('.page-num');
// let goodsPageNum = parseInt(document.querySelector('.page-num.active a').innerText);
// let pageNum = (goodsNum % goodsPageNum)
//     ? Math.floor(goodsNum / goodsPageNum) + 1
//     : (goodsNum / goodsPageNum);
// console.log(pageNum);

// const renderPageNums = (pageNum) => {
//     const list = document.createElement('ul');
//     list.classList.add('pagination__pages');
//     list.classList.add('pages');

//     for (let i = 0; i < pageNum; i++) {
//         const item = document.createElement('li');
//         item.classList.add('pagination__icon');
//         item.classList.add('pages__item');
//         if (i > 4) {
//             item.classList.add('hidden');
//         }
//         item.innerHTML = `
//             <a class="pages__link" href="#"><span class="pages__text">${i + 1}</span></a>
//         `;

//         list.appendChild(item);
//     }
//     console.log(list);
//     const parent = document.querySelector('.pagination');
//     const siblings = parent.childNodes;
//     parent.insertBefore(list, siblings[1]);
// };

// renderPageNums(pageNum);

//возвращает дом-элемент товара
const renderGood = ({ id, company, model, colors, price }) => {
    const node = document.createElement('li');
    node.classList.add('goods__item');
    node.innerHTML = `<div class="product" id="${id}">
            <div class="product__sale"></div>
            <div class="product__top-row">
                <div class="product__text product-text">
                    <div class="product-text__company">${company}</div>
                    <div class="product-text__name">${model}</div>
                </div><a class="product__like-link" href="#">
                    <svg class="product__like">
                        <use xlink: href="images/sprite.svg#cart"></use>
                      </svg></a><a class="product__like-link product__like-link_fav" href="#">
                <svg class="product__like">
                    <use xlink: href="images/sprite.svg#like-icon"></use>
                      </svg></a>
                  </div> <img class="product__img" src="images/1.png">
            <ul class="sneaker-colors product__sneaker-colors"></ul>
                            <div class="product__bottom-row product-buy"><a class="product-buy__btn btn btn_more modal-trigger" href="#">Подробнее</a>
                                <div class="product-buy__price">${price} р</div>
                            </div>
                </div>`;

    const colorList = node.querySelector('ul.product__sneaker-colors');
    colors.forEach((color) => {
        const colorNode = renderColor(color);
        colorList.appendChild(colorNode);
    });
    return node;
};

//рендер всех товаров
const renderGoodsList = () => {
    goods.forEach((item) => {
        const stringItem = renderGood(item);
        document.querySelector('.goods').appendChild(stringItem);
    });
};

renderGoodsList();

// регистрация-авторизация переходы
$('#reg').fadeOut();
$('#lk').fadeOut();

$('#to-reg').on('click', (e) => {
    e.preventDefault();
    $('#auth').fadeOut(100);
    setTimeout(() => {
        $('#reg').fadeIn(100);
    }, 100);
});

$('#to-auth').on('click', (e) => {
    e.preventDefault();
    $('#reg').fadeOut(100);
    setTimeout(() => {
        $('#auth').fadeIn(100);
    }, 100);
});

$('#exit-lk').on('click', (e) => {
    e.preventDefault();
    $('#lk').fadeOut(100);
    setTimeout(() => {
        $('#auth').fadeIn(100);
    }, 100);
});

$('#submit-auth').on('click', (e) => {
    e.preventDefault();
    $('#auth').fadeOut(100);
    setTimeout(() => {
        $('#lk').fadeIn(100);
    }, 100);
});

//------

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

glideBtn.on('transitionend', function () {
    if (glideInfo.hasClass('non-active')) {
        glideName.text(glideData[mainGlide.index].name);
        glidePrice.text(glideData[mainGlide.index].price);
    }
});

mainGlide.on('run', function () {
    $('.glide').find('.info').addClass('non-active');
});

mainGlide.on('run.after', function () {
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

modalGlide.on('run', function () {
    previewGlide.go(`=${modalGlide.index}`);
});

previewGlide.on('run', function () {
    modalGlide.go(`=${previewGlide.index}`);
});

const previewSlide = $('.glide__slide_preview');
previewSlide.on('click', function (e) {
    const reqIndex = $(e.currentTarget).index();
    modalGlide.go(`=${reqIndex}`);
    previewGlide.go(`=${reqIndex}`);
});

const previewGalleryItem = $('.modal__preview-item');
previewGalleryItem.on('click', function (e) {
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

fromInput.on('input', function () {
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

toInput.on('input', function () {
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
        success: function (data) {

            $('.goods').fadeOut(500, function () {

                $('.product').each(function (index, element) {
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

prevBtn.on('click', function (e) {
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

nextBtn.on('click', function (e) {
    // console.log(curPage);

    e.preventDefault();
    // console.log(e.currentTarget);
    if (curPage < 5) {

        if (window.innerWidth <= 760) {
            if (curPage === 3 || curPage === 2) {
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

$('.pages__item').on('click', function (e) {

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
        setTimeout(function () {
            target.parent().find('.filter__content').addClass('no-bottom-border');
        }, 550);
    } else {
        target.parent().find('.filter__content').removeClass('no-bottom-border');
    }
}

$('.title').on('click', togglePopup);

triggerPopup('.city', '.city-popup');
triggerPopup('.btn_close', '.cart-popup');
triggerPopup('.icons__link_avatar', '.auth-popup');
triggerPopup('.icons__link_cart', '.cart-popup');

$('.city-content__item').on('click', function (e) {
    const choosedItem = $(e.currentTarget);

    $('.modal-filter__name_city').removeClass('is-highlighted');
    $('.modal-filter__svg_city').removeClass('is-highlighted');


    $('.city-content__item.active').removeClass('active');
    choosedItem.addClass('active');
    $('.set-city').text(choosedItem.find('.city-content__name').text());
    if ($('.set-city').hasClass('set-icon')) {
        const value = 'images/sprite.svg#' + choosedItem.find('.city-content__name').data('name');
        const icon = document.querySelector('.modal-filter__svg_city use');
        icon.setAttributeNS('http://www.w3.org/1999/xlink', 'href', value);
    }
});

$('.modal-menu__city').on('click', function () {
    $('.modal-city').toggleClass('is-active');
});

$('.modal-city__close-link').on('click', function (e) {
    e.preventDefault();
    e.stopPropagation();
    $('.modal-city').toggleClass('is-active');
    $('.modal-filter__name_city').toggleClass('is-highlighted');
    $('.modal-filter__svg_city').toggleClass('is-highlighted');
});

$('.cart-num__plus').on('click', function (e) {
    e.preventDefault();
    const target = $(e.currentTarget);
    const productNumItem = target.siblings('.cart-num__cur-num');
    const productPriceItem = target.closest('.cart-popup__item').find('.cart-product__price');
    changePrice(productNumItem, productPriceItem, '+');
});

$('.cart-num__minus').on('click', function (e) {
    e.preventDefault();
    const target = $(e.currentTarget);
    const productNumItem = target.siblings('.cart-num__cur-num');
    const productPriceItem = target.closest('.cart-popup__item').find('.cart-product__price');
    changePrice(productNumItem, productPriceItem, '-');
});

$('.icons__link_search').on('click', function (e) {
    e.preventDefault();
    $('.header__right').addClass('active');
    $('.input-search').toggleClass('active');
    $(e.currentTarget).addClass('active');
    const inputSearch = $('.input-search');
    let hasUsed = false;
    if (!inputSearch.hasClass('used')) {
        hasUsed = true;
        setTimeout(function () {
            inputSearch.addClass('used');
            inputSearch.focus();
        }, 250);
    } else if (!hasUsed) {
        inputSearch.removeClass('used');
        hasUsed = false;
    }

});

$(document).on('click', function (e) {
    const target = e.target;
    const search = $('.input-search');
    const searchIcon = $('.icons__link_search');
    // console.log('efef');
    if (!$(target).is(search) && !$(target).parents().is(search) && !$(target).is(searchIcon) && !$(target).parents().is(searchIcon) && $(search).hasClass('active')) {
        // $(search).fadeOut(2000, function (){
        // $(search).removeClass('active');

        $('.header__right').removeClass('active');
        search.removeClass('active');
        setTimeout(function () {
            searchIcon.removeClass('active');
        }, 250);
        // searchIcon.removeClass('active');
        // });
    }
});


$('.brands').find('.radio_brands').on('change', function (e) {
    if ($(e.currentTarget).closest('.category').first().index() !== 0) {
        $('.brands').first().find('.category').first().find('.radio_brands').prop('checked', false);
    } else {
        let radio = $('.brands').find('.radio_brands');
        radio = radio.not(radio.first());
        radio.prop('checked', false);
    }
});

checkAll('.brands', '.category', '.radio_brands');
checkAll('.categories-list', '.category', '.radio_category');
checkAll('.colors', '.colors__item', '.colors__checkbox');
checkAll('.sizes', '.sizes__item', '.sizes__radio');

const menu = $('.menu');
const menuFixed = $('.menu-fixed');
const startScroll = menu.offset().top + menu.outerHeight();
$(window).on('scroll', function () {
    if (window.scrollY >= startScroll) {
        menuFixed.addClass('fixed');
    } else {
        menuFixed.removeClass('fixed');
    }
});

$('.input-search').blur(function () {

    // check if the input has any value (if we've typed into it)
    if ($(this).val())
        $(this).addClass('used');
    else
        $(this).removeClass('used');
});


const modal = document.querySelector('.modal');
const triggers = $('.modal-trigger');
// var closeButton = document.querySelector(".close-button");


const bodyScrollLock = require('body-scroll-lock');
const disableBodyScroll = bodyScrollLock.disableBodyScroll;
const enableBodyScroll = bodyScrollLock.enableBodyScroll;
const targetElement = document.querySelector('.modal__content');


function toggleModal() {
    modal.classList.toggle('active');


    if ($(modal).hasClass('active')) {
        disableBodyScroll(targetElement);
    } else {
        enableBodyScroll(targetElement);
    }
}


function windowOnClick(event) {
    if (event.target === modal) {
        toggleModal();
    }
}

triggers.on('click', function (e) {
    e.preventDefault();
    toggleModal();
});

window.addEventListener('click', windowOnClick);

$('.reset-btn').on('click', function (e) {
    e.preventDefault();
    const target = $(e.currentTarget);
    let inputList;
    if (window.innerWidth <= 760) {
        // console.log(target);
        inputList = target.siblings('.modal-filters__list').find('ul.filter__content');
        // console.log(inputList);

    } else {
        inputList = target.closest('.filters').find('.filter__content');
    }
    $(inputList).each(function () {
        const textPlace = $(this).closest('.modal-filter').find('.modal-filter__choosed');
        // console.log($(this));
        // console.log(textPlace);

        const inputs = $(this).find('input');
        const firstInput = inputs.first();
        firstInput.prop('checked', true);
        const text = firstInput.siblings('.filter-item-name').text();
        textPlace.text(text);
        if ($(this).hasClass('colors')) {
            textPlace.text('Все цвета');
        }
        if ($(this).hasClass('trands')) {
            inputs.prop('checked', false);
            textPlace.text('');
        } else {
            inputs.not(firstInput).prop('checked', false);
        }
    });
    const priceText = 'От 500 руб до 5000';
    $('.modal-filter__choosed_price').text(priceText);
    fromInput.val(500);
    toInput.val(5000);
    $('#price-slider').data('ionRangeSlider').update({
        from: 500,
        to: 5000,
    });
});

const hamburger = $('.hamburger');
const modalMenu = $('.modal-menu');
hamburger.on('click', function (e) {
    e.preventDefault();
    hamburger.addClass('is-active');
    $('#close-menu').removeClass('hidden');
    modalMenu.addClass('is-active');

    if (modalMenu.hasClass('is-active')) {
        disableBodyScroll(modalMenu);
    } else {
        enableBodyScroll(modalMenu);
    }

});

$('#close-menu').on('click', function (e) {
    e.preventDefault();
    modalMenu.removeClass('is-active');
    $('#close-menu').addClass('hidden');
    hamburger.removeClass('is-active');
    if (modalMenu.hasClass('is-active')) {
        disableBodyScroll(modalMenu);
    } else {
        enableBodyScroll(modalMenu);
    }

});

const openFiltersBtn = $('.open-filters');
const modalFilters = $('.modal-filters');
const resetBtn = $('.reset');
openFiltersBtn.on('click', function (e) {
    e.preventDefault();
    openFiltersBtn.toggleClass('is-active');
    modalFilters.toggleClass('is-active');
    resetBtn.toggleClass('is-active');

    if (modalFilters.hasClass('is-active')) {
        disableBodyScroll(modalFilters);
    } else {
        enableBodyScroll(modalFilters);
    }
});


if (window.innerWidth <= 760) {
    $('.filter__content').addClass('is-modal');
}

$('.modal-filter__icon, .modal-filter__text').on('click', function (e) {


    const modalFilterList = $('.modal-filters__list');
    const prevActiveItem = modalFilterList.find('.is-modal-active');
    if (prevActiveItem.length) {
        prevActiveItem.removeClass('is-modal-active');
    }

    const target = $(e.currentTarget);
    const itemIndex = target.parent().index();
    console.log(itemIndex);
    // console.log(itemIndex);


    let name = target.parent().find('.modal-filter__name');
    let icon = target.parent().find('.modal-filter__icon');
    let svg = target.parent().find('.modal-filter__svg');

    name.toggleClass('is-highlighted');
    icon.toggleClass('is-highlighted');
    svg.toggleClass('is-highlighted');

    if (!prevActiveItem.closest('.modal-filter').is(target.parent())) {
        $('.modal-filters__item').each(function (index) {
            if (index !== itemIndex) {
                console.log($(this));
                $(this).find('.modal-filter__icon').addClass('grey');
                $(this).find('.modal-filter__svg').addClass('grey');
                $(this).find('.modal-filter__name').addClass('grey');
                $(this).find('.modal-filter__choosed').addClass('grey');
            } else {
                $(this).find('.modal-filter__icon').removeClass('grey');
                $(this).find('.modal-filter__svg').removeClass('grey');
                $(this).find('.modal-filter__name').removeClass('grey');
                $(this).find('.modal-filter__choosed').removeClass('grey');
            }
        });
        const filterType = target.parent().data('filter-type') + '-content';
        const filterContent = $(`.filter__content.${filterType}`);
        if (!filterContent.find($('.close-icon')).length) {
            $('.close-icon').clone().removeClass('hidden').addClass('filters-icon').appendTo(filterContent);
            $('.filters-icon a').on('click', function (ev) {
                name = target.parent().find('.modal-filter__name');
                icon = target.parent().find('.modal-filter__icon');
                svg = target.parent().find('.modal-filter__svg');

                name.removeClass('is-highlighted');
                icon.removeClass('is-highlighted');
                svg.removeClass('is-highlighted');

                $('.modal-filters__item').each(function (index) {
                    if (index !== itemIndex) {
                        $(this).find('.modal-filter__icon').removeClass('grey');
                        $(this).find('.modal-filter__svg').removeClass('grey');
                        $(this).find('.modal-filter__name').removeClass('grey');
                        $(this).find('.modal-filter__choosed').removeClass('grey');
                    }
                });
                ev.preventDefault();
                setTimeout(function () {
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
            // console.log(target.parent());
        }
        setTimeout(function () {
            filterContent.toggleClass('is-modal-active');
        }, 10);
    } else {
        $('.modal-filters__item').each(function (index) {
            $(this).find('.modal-filter__icon').removeClass('grey');
            $(this).find('.modal-filter__svg').removeClass('grey');
            $(this).find('.modal-filter__name').removeClass('grey');
            $(this).find('.modal-filter__choosed').removeClass('grey');
        });
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






$(document).on('scroll', function () {
    if (window.scrollY > 0) {
        $('.scroll-up').addClass('is-active');
    } else {
        $('.scroll-up').removeClass('is-active');
    }
});

$('.scroll-up').on('click', function (e) {
    e.preventDefault();
    if (!$('.open-filters').hasClass('is-active')) {
        $('html, body').animate({
            scrollTop: 0,
        }, 500);
    }
});


$('.radio').on('click', function (e) {

    const target = $(e.target);
    const filterContent = target.closest('ul');
    const checkedInput = filterContent.find('input:checked');
    const checkedInputNames = checkedInput.siblings('.filter-item-name');

    // console.log(checkedInputNames);
    // console.log($(checkedInputNames[0]).text());
    let border = 2;
    if (filterContent.hasClass('trands')) border = 1;
    let text = '';
    let flag = false;
    for (let i = 0; i < checkedInputNames.length; i++) {
        if (i === border) {
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


$('.content-list__link').on('click', function (e) {
    e.preventDefault();
    const target = $(e.currentTarget);
    const targetItem = target.parent();
    targetItem.closest('ul').find('.active').removeClass('active');
    targetItem.addClass('active');
});
