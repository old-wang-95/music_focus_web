function load_albums() {
    $.getJSON("/static/config/lizhi_albums.json", function (data) {
        let item_template = "" +
            "<a class=\"list-group-item\" href=\"album.html?id={id}\">\n" +
            "  <div class=\"text-center\">\n" +
            "      <img src=\"../static/images/lizhi/{image}\" alt=\"专辑\" class=\"img-rounded\">\n" +
            "      <h5>{name}</h5>\n" +
            "  </div>\n" +
            "</a>";
        let items = [];
        for (let i in data) {
            i = parseInt(i);
            let item_data = data[i];
            let item_html = item_template.replace('{id}', item_data['id']).replace('{image}', item_data['image']).replace('{name}', item_data['name']);
            items.push(item_html)
        }
        document.getElementById('album_list').innerHTML = items.join('\n')
    });
}
