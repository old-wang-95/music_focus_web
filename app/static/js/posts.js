// 处理微博列表相关

function render_posts(music_type) {
    $.getJSON("/api/v1/posts", {"music_type": music_type}, function (data) {
        $.get("/static/templates/post_item.html", function (post_template) {
            scroll_load($("#weibo_list")[0], data['result'][music_type], post_template, template_func,
                scroll_to_view_position_callback);
        });
    });
}

function template_func(item_template, item_data, index) {
    return item_template
        .replace('{id}', item_data['id'])
        .replace('{image_path}', item_data['image_path']);
}

function scroll_to_view_position_callback() {
    scroll_to_view_position(get_url_param("music_type") + '_post', 300);
}