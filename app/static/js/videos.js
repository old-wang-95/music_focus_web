// 处理视频列表相关

function render_videos() {
    $.getJSON("/api/v1/videos", function (data) {
        $.get("/static/templates/video_item.html", function (video_template) {
            let video_html_list = [];
            $.each(data['result']['rock'], function (i, video_data) {
                let item_html = video_template
                    .replace('{url}', video_data['url']);
                video_html_list.push(item_html);
            });
            document.getElementById('video_list').innerHTML = video_html_list.join('\n');
        });
    });
}