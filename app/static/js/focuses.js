// 处理热点列表相关

function render_focuses(music_type) {
    $.getJSON("/api/v1/focuses", {"music_type": music_type}, function (data) {
        $.get("/static/templates/focus_item.html", function (focus_template) {
            scroll_load($("#focus_list")[0], data['result'][music_type], focus_template, template_func);
            new ViewPosition('focus').scroll_to();
        });
    });
}

function template_func(item_template, item_data, index) {
    if (index + 1 <= 3) {
        item_template = item_template.replace('class="no"', 'class="no-top"')
    }
    return item_template
        .replace('{link}', item_data['link'])
        .replace('{index}', (index + 1).toString())
        .replace('{title}', item_data['title'])
        .replace('{hot}', item_data['recent_read'].toString())
        .replace('{users}', item_data['related_users'].join(', '));
}
