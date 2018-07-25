export default function checkAll(inputList, inputItem, input) {
    $(inputList).find(input).on('change', function(e) {
        if ($(e.currentTarget).closest(inputItem).first().index() !== 0) {
            $(inputList).first().find(inputItem).first().find(input).prop('checked', false);
        } else {
            let radio = $(inputList).find(input);
            radio = radio.not(radio.first());
            radio.prop('checked', false);
        }
    });
}