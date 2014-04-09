var ul = document.getElementById("answers");
var rightDress;
var nextButton = document.getElementById("next");
var resultText = document.getElementById("result");
var points = document.getElementById("points");
var reset = document.getElementById("reset");


window.onload = function() {
    setNewQuestion(randomDress());

    nextButton.onclick = function() {
        rightDress = null;
        setNewQuestion(randomDress());
    };

    reset.onclick = function() {
        localStorage.setItem("fashion_points", 0);
        points.innerHTML = getPoints();
    };
};

function getPoints() {
    if (localStorage.getItem("fashion_points") === null) {
        setPoints(0);
        return localStorage.getItem("fashion_points");
    } else {
        return localStorage.getItem("fashion_points");
    }
}

function setPoints(pointsNum) {
    localStorage.setItem("fashion_points", pointsNum);
    points.innerHTML = pointsNum;
}

function randomDress() {
    var dressArray = [dress1, dress2, dress3, dress4, dress5];
    dressArray = shuffle(dressArray);
    return dressArray[0];
}

function setNewQuestion(dress) {
    nextButton.style.display = "none";
    resultText.style.display = "none";

    points.innerHTML = getPoints();

    var img = document.getElementById("dress");
    img.setAttribute("src", dress.imageUrl);

    var category = document.getElementById("category");
    category.innerHTML = "Category: " + dress.category;

    ul.innerHTML = "";

    var answers = [];
    answers.push(dress.brand);

    brands = shuffle(brands);

    for(item in brands) {
        if (brands[item] != dress.brand && answers.length < 4) {
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

    var answerEl = document.getElementsByClassName("dress list-group-item");

    rightDress = dress;

    for (var i = 0; i < answerEl.length; i++) {
        answerEl[i].onclick = answerClick;
    }
}

function answerClick(answer) {
    var item = document.getElementById(answer.target.id);

    resultText.style.display = "block";

    if (!item.disabled) {
        if (answer.target.innerHTML == rightDress.brand) {
            item.setAttribute("class", "dress list-group-item list-group-item-success");
            resultText.innerHTML = "Your answer is correct :)"
            var currentResult = getPoints();
            setPoints(parseInt(currentResult) + 1);
        } else {
            item.setAttribute("class", "dress list-group-item list-group-item-danger");
            resultText.innerHTML = "Sorry, wrong answer... :("
        }

        nextButton.style.display = "block";

        item.disabled = true;
    }

    for (var i = 0; i < brands.length; i++) {
        var answer2 = document.getElementById(brands[i]);

        if (answer2) {
            answer2.disabled = true;
        }
    }
}