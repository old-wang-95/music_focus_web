// 处理微博列表相关

function render_posts(data) {
    // gen inner html
    let item_template = "" +
        "<a class=\"list-group-item\" href=\"https://m.weibo.cn/detail/{0}\">\n" +
        "    <img src=\"../static/images/weibo/{1}\" alt=\"微博\" class=\"img-thumbnail\">\n" +
        "</a>";
    let items = [];
    for (let i in data['result']['rock']) {
        i = parseInt(i);
        let item_data = data['result']['rock'][i];
        let item_html = item_template.replace('{0}', item_data['id']).replace('{1}', item_data['image_path']);
        items.push(item_html);
    }

    // replace
    document.getElementById('weibo_list').innerHTML = items.join('\n');
}