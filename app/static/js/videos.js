// 处理视频列表相关

function render_videos() {
    let max_num = 50;
    $.getJSON("/api/v1/videos", function (data) {
        $.get("/static/templates/video_item.html", function (video_template) {
            let video_html_list = [];
            $.each(data['result']['rock'], function (i, video_data) {
                if (i < max_num) {
                    let item_html = video_template
                        .replace('{url}', video_data['url'])
                        .replace('{cover_path}', video_data['cover_path'])
                        .replace('{user_name}', video_data['user_name'])
                        .replace('{display_view_cnt}', video_data['display_view_cnt']);
                    video_html_list.push(item_html);
                }
            });
            document.getElementById('video_list').innerHTML = video_html_list.join('\n');
        });
    });
}