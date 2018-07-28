export default function triggerPopup(popupTrigger, popup) {

    let offset = $(popupTrigger).offset().left;
    let dir = 'left';
    if (popup !== '.city-popup') {
        dir = 'right';
        offset = window.innerWidth - offset;
        offset -= $(popupTrigger).width() + $(popup).find('.popup__triangle').width()/2;
    } else {
        offset -= $(popup).find('.popup__triangle').width()/2;
    }
    offset +=15;
    offset += 'px';
    $(popup).find('.popup__triangle').css(dir, offset);

    
    $(popupTrigger).on('click', function(e) {
        e.preventDefault();
        $(popup).fadeToggle(200, function() {
            $(popup).toggleClass('active');
        });
    });

    $(document).on('click', function(e) {
        const target = e.target;
  
        if (!$(target).is(popup) && !$(target).parents().is(popup) && $(popup).hasClass('active')) {
            $(popup).fadeOut(200, function (){
                $(popup).removeClass('active');
            });
        }
    });
}