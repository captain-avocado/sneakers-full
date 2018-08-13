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
        console.log(target);
        const filterContent = target.closest('ul');
        const checkedInput = filterContent.find('input:checked');
        const checkedInputNames = checkedInput.siblings('.filter-item-name');

        console.log(checkedInputNames);
        console.log($(checkedInputNames[0]).text());
        
        let text = '';
        for (let i = 0; i < checkedInputNames.length; i++) {
            text += $(checkedInputNames[i]).text() + ', ';
        }
        text = text.substring(0, text.length - 2);
        const textPlace = filterContent.siblings('.modal-filter__text').find('.modal-filter__choosed');
        textPlace.text('');
        textPlace.text(text);
    });
}