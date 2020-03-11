function load_bottom() {
    $('#bottom_buttons').load('/static/templates/bottom_buttons.html');
}

function share() {
    $.get('/static/templates/share_mask.html', function (share_mask_html) {
        $("body").prepend(share_mask_html);
    });
}

function dismiss_share() {
    $(".share_mask").remove();
}

function feedback() {

}

function subscribe() {

}
