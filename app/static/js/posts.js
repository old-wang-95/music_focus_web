// 处理微博列表相关

function render_posts() {
    let max_num = 50;
    $.getJSON("/api/v1/posts", function (data) {
        $.get("/static/templates/post_item.html", function (post_template) {
            let post_html_list = [];
            $.each(data['result']['rock'], function (i, post_data) {
                if (i < max_num) {
                    let item_html = post_template
                        .replace('{id}', post_data['id'])
                        .replace('{image_path}', post_data['image_path']);
                    post_html_list.push(item_html);
                }
            });
            document.getElementById('weibo_list').innerHTML = post_html_list.join('\n');
        });
    });
}