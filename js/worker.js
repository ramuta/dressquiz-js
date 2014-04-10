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
    importScripts("secret2.js"); // This is the file where secret_pid is saved. Get this pid on ShopStyle API.
    var url = "http://api.shopstyle.com/api/v2/products?pid="+secret_pid+"&fts="+category+"&offset=0&limit=10"
    var request = new XMLHttpRequest();
    request.open("GET", url);
    request.onload = function() {
        if (request.status == 200) {
            var rspns = request.responseText;
            rspns = rspns.replace(/&/g, '&amp;');
            postMessage(rspns);
        }
    };
    request.send(null);
}