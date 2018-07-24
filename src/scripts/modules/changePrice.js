import numberWithSpaces from './numberWithSpaces';

export default function changePrice(productNumItem, productPriceItem, sign) {
    let productNum = parseInt(productNumItem.text());
    if (sign === '+') productNum++;
    if (sign === '-' && productNum > 1) productNum--;
    productNumItem.text(productNum);

    const productPrice = productPriceItem.data('price');
    let sumPrice = productPrice * productNum;
    sumPrice = numberWithSpaces(sumPrice);
    sumPrice += ' р';
    productPriceItem.text(sumPrice);
}