// 处理微博列表相关

function render_posts() {
    $.getJSON("/api/v1/posts", function (data) {
        $.get("/static/templates/post_item.html", function (post_template) {
            let post_html_list = [];
            $.each(data['result']['rock'], function (i, post_data) {
                let item_html = post_template
                    .replace('{id}', post_data['id'])
                    .replace('{image_path}', post_data['image_path']);
                if (post_data['recent_read'] !== 0) {
                    post_html_list.push(item_html);
                }
            });
            document.getElementById('weibo_list').innerHTML = post_html_list.join('\n');
        });
    });
}