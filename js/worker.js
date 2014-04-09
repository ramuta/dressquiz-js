onmessage = function(event) {
    if (event.data == "getItems") {
        console.log("worker got message");
        importScripts("categories.js");
        importScripts("utils.js");
        categories = shuffle(categories);
        getItemsJson(categories[0]);
    }
};

function getItemsJson(category) {
    var url = "http://api.shopstyle.com/api/v2/products?pid="+ss_pid+"&fts="+category+"&offset=0&limit=10"
    var request = new XMLHttpRequest();
    request.open("GET", url);
    request.onload = function() {
        if (request.status == 200) {
            var rspns = request.responseText;
            postMessage(rspns);
        }
    };
    request.send(null);
}