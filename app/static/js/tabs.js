// 处理标签栏相关

function load_tabs() {
    $("#tabs").load("/static/templates/tabs.html", function () {
            let html_name = window.location.pathname.split("/").pop();
            let music_type = get_url_param("music_type");

            let biz_tabs = $("#biz_tabs");
            let music_tabs = $("#music_tabs");

            switch (html_name) {
                case "weibo.html":
                    biz_tabs.find("li")[0].classList.add("active");
                    break;
                case "focus.html":
                    biz_tabs.find("li")[1].classList.add("active");
                    break;
                case "video.html":
                    biz_tabs.find("li")[2].classList.add("active");
                    break;
                case "lizhi.html":
                    biz_tabs.attr("hidden", "true");
                    music_tabs.find("li")[3].classList.add("active");
                    return;
                case "album.html":
                    biz_tabs.attr("hidden", "true");
                    music_tabs.find("li")[3].classList.add("active");
                    return;
            }
            switch (music_type) {
                case "rock":
                    music_tabs.find("li")[0].classList.add("active");
                    break;
                case "folk":
                    music_tabs.find("li")[1].classList.add("active");
                    break;
                case "hip-hop":
                    music_tabs.find("li")[2].classList.add("active");
                    break;
                default:
                    window.location = window.location.origin + "/" + html_name + "?music_type=rock";
            }
        }
    );
}


function click_music_type(cur_ele) {
    let music_type = transform_text(cur_ele.getElementsByTagName('a').item(0).textContent);

    let biz_type = "weibo";
    let cur_biz_li = $("#biz_tabs").find("li.active");
    if (cur_biz_li.length !== 0){
         biz_type = transform_text(cur_biz_li[0].innerText);
    }

    window.location = window.location.origin + "/" + biz_type + ".html?music_type=" + music_type;
}


function click_biz_type(cur_ele) {
    let biz_type = transform_text(cur_ele.getElementsByTagName('a').item(0).textContent);
    let music_type = transform_text($("#music_tabs").find("li.active")[0].innerText);
    window.location = window.location.origin + "/" + biz_type + ".html?music_type=" + music_type;
}


function transform_text(cn_text) {
    cn_text = cn_text.replace(' ', '');
    switch (cn_text) {
        case "摇滚":
            return "rock";
        case "民谣":
            return "folk";
        case  "嘻哈":
            return "hip-hop";
        case "动态":
            return "weibo";
        case "热点":
            return "focus";
        case "视频":
            return "video"
    }
}


function get_url_param(name) {
    let regex = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
    let result = window.location.search.substr(1).match(regex);
    if (result != null) return decodeURI(result[2]);
    return null;
}
