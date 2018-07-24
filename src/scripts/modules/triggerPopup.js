export default function triggerPopup(popupTrigger, popup) {
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