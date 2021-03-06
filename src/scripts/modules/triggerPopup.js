export default function triggerPopup(popupTrigger, popup) {

    
    $(popupTrigger).on('click', function(e) {
        e.preventDefault();
        $(e.currentTarget).find('.icon').toggleClass('active');
        $(popup).fadeToggle(200, function() {
            $(popup).toggleClass('active');
        });

        let offset = $(popupTrigger).offset().left;
        let dir = 'left';
        if (popup !== '.city-popup') {
            offset -= $(popup).offset().left;
            if (window.innerWidth > 1200) offset -= 17;
            else offset += 3;
            offset -= 15;
        } else {
            offset += 10;
            offset -= 15;

        }

        offset += 'px';
        $(popup).find('.popup__triangle').css(dir, offset);

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