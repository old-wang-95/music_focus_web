function load_albums() {
    $.getJSON("/static/config/lizhi_albums.json", function (albums_data) {
        $.get("/static/templates/album_item.html", function (album_template) {
            let album_html_list = [];
            $.each(albums_data, function (i, album_data) {
                let album_html = album_template
                    .replace('{id}', album_data['id'])
                    .replace('{image}', album_data['image'])
                    .replace('{name}', album_data['name']);
                album_html_list.push(album_html);
            });
            document.getElementById('album_list').innerHTML = album_html_list.join('\n');
        });
    });
}
