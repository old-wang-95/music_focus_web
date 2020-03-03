// 处理热点列表相关

function render_focuses(data) {
    // gen inner html
    let top_item_template = "" +
        "<a class=\"list-group-item\" href=\"{link}\">\n" +
        "    <h5 class=\"text-left\">\n" +
        "        <span class=\"no-top\">{index}</span>\n" +
        "            &nbsp\n" +
        "        <span class=\"focus\">{title}</span>\n" +
        "            &nbsp\n" +
        "        <span class=\"hot\">{hot}</span>\n" +
        "    </h5>\n" +
        "    <h5 class=\"text-right\">\n" +
        "        <span class=\"users\">{users}</span>\n" +
        "    </h5>\n" +
        "</a>";
    let item_template = "" +
        "<a class=\"list-group-item\" href=\"{link}\">\n" +
        "    <h5 class=\"text-left\">\n" +
        "        <span class=\"no\">{index}</span>\n" +
        "            &nbsp\n" +
        "        <span class=\"focus\">{title}</span>\n" +
        "            &nbsp\n" +
        "        <span class=\"hot\">{hot}</span>\n" +
        "    </h5>\n" +
        "    <h5 class=\"text-right\">\n" +
        "        <span class=\"users\">{users}</span>\n" +
        "    </h5>\n" +
        "</a>";
    let items = [];
    for (let i in data['result']['rock']) {
        i = parseInt(i);
        let item_data = data['result']['rock'][i];
        let item_html;
        console.log(i+1);
        if (i + 1 <= 3) {
            item_html = top_item_template.replace('{link}', item_data['link']).replace('{index}', (i + 1).toString()).replace('{title}', item_data['title']).replace('{hot}', item_data['recent_read'].toString()).replace('{users}', item_data['related_users'].join(', '));
        } else {
            item_html = item_template.replace('{link}', item_data['link']).replace('{index}', (i + 1).toString()).replace('{title}', item_data['title']).replace('{hot}', item_data['recent_read'].toString()).replace('{users}', item_data['related_users'].join(',&nbsp'));
        }

        items.push(item_html);
    }

    // replace
    document.getElementById('focus_list').innerHTML = items.join('\n');
}