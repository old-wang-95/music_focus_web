// 处理通用的逻辑

function http_get(route, callback) {
    let request = new XMLHttpRequest();
    request.onreadystatechange = function () {
        if (this.readyState === 4 && this.status === 200) {
            callback(JSON.parse(this.responseText));
        }
    };
    request.open("GET", route, true);
    request.send();
}
