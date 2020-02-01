function set_biz_tabs_active() {
    const html_name = window.location.pathname.split("/").pop();
    if (html_name === "weibo.html") {
        document.getElementById("biz_tabs").getElementsByTagName("li").item(0).classList.add("active");
    } else if (html_name === "focus.html") {
        document.getElementById("biz_tabs").getElementsByTagName("li").item(1).classList.add("active");
    }
}
