export default function checkAll(inputList, inputItem, input) {
    $(inputList).find(input).on('change', function(e) {
        if ($(e.currentTarget).closest(inputItem).first().index() !== 0) {
            $(inputList).first().find(inputItem).first().find(input).prop('checked', false);
        } else {
            let radio = $(inputList).find(input);
            radio = radio.not(radio.first());
            radio.prop('checked', false);
        }

        const target = $(e.target);
        const filterContent = target.closest('ul');
        const checkedInput = filterContent.find('input:checked');
    
        if (inputList !== '.colors') {
            
            const checkedInputNames = checkedInput.siblings('.filter-item-name');
            
            let text = '';
            let flag = false;

            let border;
            if (inputList === '.brands') border = 2;
            if (inputList === '.sizes') border = 6;

            for (let i = 0; i < checkedInputNames.length; i++) {
                if (i === border) {
                    text = text.substring(0, text.length - 2);
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


        } else {
            const colorList = $('.modal-filter__color-list');
            colorList.empty();
            for (let i = 0; i < checkedInput.length; i++) {

                if ($(checkedInput[i]).siblings('.colors__all').length) {
                    colorList.text($(checkedInput[i]).siblings('.colors__all').text());
                    break;
                }

                const colorItem = $(checkedInput[i]).siblings('.color-fake');
                colorItem.clone().css('margin-right', '10px').appendTo(colorList);
            }
        }
    });
}