var dress1 = new Dress(1,
    "Zara",
    "http://resources.shopstyle.com/pim/7b/28/7b2894c203529b0956cdd6b760629d4a.jpg"
);

window.onload = function() {
    var img = document.getElementById("dress");
    img.setAttribute("src", dress1.imageUrl);
};