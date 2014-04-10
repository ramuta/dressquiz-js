function getItemsJson(category) {
    var url = "http://api.shopstyle.com/api/v2/products?pid="+secret_pid+"&fts="+category+"&offset=0&limit=10"
    var request = new XMLHttpRequest();
    request.open("GET", url);
    request.onload = function() {
        if (request.status == 200) {
            var rspns = request.responseText;
            rspns = rspns.replace(/&/g, '&amp;');
            return rspns;
        }
    };
    request.send(null);
}