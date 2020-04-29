function scroll_load(list_element, list_data, item_template, template_func) {
    list_element.innerHTML = '';
    let index = 0;
    render_items(10);
    $(document).scroll(function () {
        if ($("body").height() - $(document).scrollTop() - $(window).height() < 300) {  // 滑动到距底部300像素时再加载
            render_items(5);
        }
    });

    function render_items(item_size) {
        while (list_data.length > 0 && item_size > 0) {
            let item_data = list_data.shift();
            let item_html = template_func(item_template, item_data, index);
            let item_element = document.createElement("div");
            item_element.innerHTML = item_html;
            list_element.appendChild(item_element);
            item_size--;
            index++;
        }
    }
}

function scroll_to_view_position(cookie_prefix, interval = 100, scroll_times = 10) {
    let is_success = new ViewPosition(cookie_prefix).scroll_to();
    if (!is_success) {
        $(document).scrollTop(20000);  // 滑到当前最底
        setTimeout(function () {
            if (scroll_times > 0) {
                scroll_to_view_position(cookie_prefix, interval, scroll_times - 1);
            }
        }, interval);
    }
}

class ViewPosition {
    constructor(cookie_prefix = '') {
        this._cookie_key = cookie_prefix + '_view_position';
    }

    save(ele, expires_second) {
        $.cookie(this._cookie_key, XpathUtil.get_xpath(ele), {expires: expires_second / 60 / 60 / 24})
    }

    get() {
        let xpath = $.cookie(this._cookie_key);
        return this.has() ? XpathUtil.get_ele(xpath) : null
    }

    has() {
        return typeof $.cookie(this._cookie_key) !== 'undefined'
    }

    scroll_to() {
        let ele = this.get();
        if (ele !== null) {
            $(ele)[0].scrollIntoView();
        }
        // session内找到了访问记录，但是因为懒加载没找到之前的元素，返回false，表示滑动失败
        return !(this.has() && ele === null);
    }

}

class XpathUtil {
    static get_xpath(element) {
        if (element.tagName === 'HTML')
            return '/HTML[1]';
        if (element === document.body)
            return '/HTML[1]/BODY[1]';

        let ix = 0;
        let siblings = element.parentNode.childNodes;
        for (let i = 0; i < siblings.length; i++) {
            let sibling = siblings[i];
            if (sibling === element)
                return XpathUtil.get_xpath(element.parentNode) + '/' + element.tagName + '[' + (ix + 1) + ']';
            if (sibling.nodeType === 1 && sibling.tagName === element.tagName)
                ix++;
        }
    }

    static get_ele(xpath) {
        return document.evaluate(xpath, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
    }
}

function get_url_param(name) {
    let regex = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
    let result = window.location.search.substr(1).match(regex);
    if (result != null) return decodeURI(result[2]);
    return null;
}
