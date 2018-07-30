export default function triggerPopup(popupTrigger, popup) {

    let offset = $(popupTrigger).offset().left;
    let dir = 'left';
    if (popup !== '.city-popup') {
        dir = 'right';
        offset = window.innerWidth - offset;
        offset -= 10;

    } else {
        console.log(offset);
        offset += 10;
        // console.log(offset);

    }
    offset -= 15;

    offset += 'px';
    $(popup).find('.popup__triangle').css(dir, offset);

    
    $(popupTrigger).on('click', function(e) {
        e.preventDefault();
        $(e.currentTarget).find('.icon').toggleClass('active');
        $(popup).fadeToggle(200, function() {
            $(popup).toggleClass('active');
        });
    });

    $(document).on('click', function(e) {
        const target = e.target;
  
        if (!$(target).is(popup) && !$(target).parents().is(popup) && $(popup).hasClass('active')) {
            $(popupTrigger).find('.icon').removeClass('active');
            $(popup).fadeOut(200, function (){
                $(popup).removeClass('active');
            });
        }
    });
}