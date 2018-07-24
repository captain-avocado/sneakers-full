export default function triggerPopup(popupTrigger, popup) {
    $(popupTrigger).on('click', function(e) {
        e.preventDefault();
        $(popup).fadeToggle(200);
    });
}