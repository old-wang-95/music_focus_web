function load_tabs() {
    $("#tabs").load("html/tabs.html", set_biz_tabs_active);
}

function set_biz_tabs_active() {
    const html_name = window.location.pathname.split("/").pop();
    if (html_name === "weibo.html") {
        document.getElementById("biz_tabs").getElementsByTagName("li").item(0).classList.add("active");
    } else if (html_name === "focus.html") {
        document.getElementById("biz_tabs").getElementsByTagName("li").item(1).classList.add("active");
    }
}

function click_music_type(cur_obj) {
    const music_type = cur_obj.getElementsByTagName('a').item(0).textContent;
    if (music_type === "民谣" || music_type === "嘻哈" || music_type === "流行") {
        alert(music_type + "暂未开通, 敬请期待!");
    }
}