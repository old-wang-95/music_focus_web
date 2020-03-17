function scroll_load(list_dom, list_data, item_template, template_func) {
    list_dom.innerHTML = '';
    let index = 0;
    render(15);
    $(document).scroll(function () {
        if ($(document).scrollTop() + $(window).height() === $(document).height()) {
            render(5);
        }
    });

    function render(cnt) {
        while (list_data.length > 0 && cnt > 0) {
            let item_data = list_data.shift();
            let item_html = template_func(item_template, item_data, index);
            list_dom.innerHTML += item_html;
            cnt--;
            index++;
        }
    }
}