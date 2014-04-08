var dress1 = new Dress(1,
    "Zara",
    "http://resources.shopstyle.com/pim/7b/28/7b2894c203529b0956cdd6b760629d4a.jpg"
);

var ul = document.getElementById("answers");

var answerEl = [];

window.onload = function() {
    var img = document.getElementById("dress");
    img.setAttribute("src", dress1.imageUrl);

    answers = [];
    answers.push(dress1.brand);

    brands = shuffle(brands);

    for(item in brands) {
        if (brands[item] != dress1.brand && answers.length < 4) {
            answers.push(brands[item]);
        }
    }

    answers = shuffle(answers);

    for (answer in answers) {
        var a = document.createElement("a");
        a.setAttribute("class", "dress list-group-item");
        a.setAttribute("id", answers[answer]);
        a.disabled = false;
        a.innerHTML = answers[answer];
        ul.appendChild(a);
    }

    answerEl = document.getElementsByClassName("dress list-group-item");

    for (var i = 0; i < answerEl.length; i++) {
        answerEl[i].onclick = answerClick;
    }
};

function answerClick(answer) {
    var item = document.getElementById(answer.target.id);

    if (!item.disabled) {
        if (answer.target.innerHTML == dress1.brand) {
            item.setAttribute("class", "dress list-group-item list-group-item-success");
            console.log("JAAA");
        } else {
            item.setAttribute("class", "dress list-group-item list-group-item-danger");
            console.log("NO!");
        }

        item.disabled = true;
    }

    for (var i = 0; i < brands.length; i++) {
        var answer2 = document.getElementById(brands[i]);

        if (answer2) {
            answer2.disabled = true;
        }
    }
}