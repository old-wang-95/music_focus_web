// 处理微博列表相关

function render_posts(music_type) {
    $.getJSON("/api/v1/posts", {"music_type": music_type}, function (data) {
        $.get("/static/templates/post_item.html", function (post_template) {
            let post_html_list = [];
            $.each(data['result'][music_type], function (i, post_data) {
                let item_html = post_template
                    .replace('{id}', post_data['id'])
                    .replace('{image_path}', post_data['image_path']);
                post_html_list.push(item_html);
            });
            $("#weibo_list")[0].innerHTML = post_html_list.join('\n');
        });
    });
}