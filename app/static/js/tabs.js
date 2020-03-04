// 处理标签栏相关

function load_tabs() {
    $("#tabs").load("/static/html/tabs.html", function () {
            const html_name = window.location.pathname.split("/").pop().split("?")[0];

            // set biz tabs
            if (html_name === "weibo.html") {
                document.getElementById("biz_tabs").getElementsByTagName("li").item(0).classList.add("active");
            } else if (html_name === "focus.html") {
                document.getElementById("biz_tabs").getElementsByTagName("li").item(1).classList.add("active");
            } else if (html_name === "lizhi.html" || html_name === "album.html") {
                document.getElementById("biz_tabs").innerHTML = '';
            }
            // set music tabs
            if (html_name === "lizhi.html" || html_name === "album.html") {
                document.getElementById("music_tabs").getElementsByTagName("li").item(3).classList.add("active");
            } else {
                document.getElementById("music_tabs").getElementsByTagName("li").item(0).classList.add("active");
            }
        }
    );
}


function click_music_type(cur_obj) {
    const music_type = cur_obj.getElementsByTagName('a').item(0).textContent;
    if (music_type === "民谣" || music_type === "嘻哈" || music_type === "流行") {
        alert(music_type + "暂未开通, 敬请期待!");
    }
}