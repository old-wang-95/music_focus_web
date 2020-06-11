function load_bottom() {
    $('#bottom_buttons').load('/static/templates/bottom_buttons.html');
    register_feedback();
    register_subscribe();
    load_icp();
}


/* share相关 */
function share() {
    $.get('/static/templates/share_mask.html', function (share_mask_html) {
        $("body").append(share_mask_html);
    });
}

function dismiss_share() {
    $(".share_mask").remove();
}


/* feedback相关 */
function register_feedback() {
    $.get('/static/templates/feedback.html', function (feedback_html) {
        $("body").append(feedback_html);
        $('#feedback').on('show.bs.modal', function () {
            let $this = $(this);
            let $modal_dialog = $this.find('.modal-dialog');
            $this.css('display', 'block');
            $modal_dialog.css({'margin-top': Math.max(0, ($(window).height() - $modal_dialog.height()) / 2)});

        });
    })
}

function submit_feedback() {
    let wx_id = $("#wx_id")[0].value;
    let feedback_content = $("#feedback_content")[0].value;
    if (feedback_content.trim() === '') {
        alert("反馈内容不能为空！");
        return
    }
    let data = {
        'name': wx_id.trim(),
        'content': feedback_content.trim()
    };
    $.post('/api/v1/feedback', data);
    $("#feedback").modal("hide");
}


/* subscribe相关 */
function register_subscribe() {
    $.get('/static/templates/subscribe.html', function (subscribe_html) {
        $("body").append(subscribe_html);
        $('#subscribe').on('show.bs.modal', function () {
            let $this = $(this);
            let $modal_dialog = $this.find('.modal-dialog');
            $this.css('display', 'block');
            $modal_dialog.css({'margin-top': Math.max(0, ($(window).height() - $modal_dialog.height()) / 2)});
        });
    })
}

/* 添加备案信息 */
function load_icp() {
    $.get('/static/templates/icp.html', function (icp) {
        $("body").append(icp);
    })
}