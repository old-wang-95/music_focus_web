function load_album() {
    let album_id = new URLSearchParams(window.location.search).get('id') || 1;
    $.get("/static/templates/album.html", function (album_template) {
        $.getJSON("/static/config/lizhi_albums.json", function (albums_data) {
            let current_album_data = {};
            jQuery.each(albums_data, function (i, album_data) {
                console.log(album_data);
                if (album_data['id'] === album_id) {
                    current_album_data = album_data;
                }
            });
            document.getElementById("album").innerHTML = album_template
                .replace("{bandcamp_id}", current_album_data["bandcamp_id"])
                .replace("{en_name}", current_album_data["en_name"])
                .replace("{name}", current_album_data["name"]);
        })
    });
}
