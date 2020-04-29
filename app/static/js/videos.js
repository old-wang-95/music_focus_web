// 处理视频列表相关

function render_videos(music_type) {
    $.getJSON("/api/v1/videos", {"music_type": music_type}, function (data) {
        $.get("/static/templates/video_item.html", function (video_template) {
            scroll_load($("#video_list")[0], data['result'][music_type], video_template, template_func);
            scroll_to_view_position(get_url_param("music_type") + '_video', 100);
        });
    });
}

function template_func(item_template, item_data, index) {
    return item_template
        .replace('{url}', item_data['url'])
        .replace('{cover_path}', item_data['cover_path'])
        .replace('{user_name}', item_data['user_name'])
        .replace('{display_view_cnt}', item_data['display_view_cnt']);
}
