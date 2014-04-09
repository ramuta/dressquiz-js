var ul = document.getElementById("answers");
var rightDress;
var nextButton = document.getElementById("next");
var resultText = document.getElementById("result");
var points = document.getElementById("points");
var reset = document.getElementById("reset");
var worker = new Worker("js/worker.js");
var dressArray = [];
var productsArray = [];


window.onload = function() {
    callWorker();  // call worker to get some images from ShopStyle API

    setInterval(callWorker, 5000);

    nextButton.onclick = function() {
        rightDress = null;
        setNewQuestion(randomDress());
    };

    reset.onclick = function() {
        localStorage.setItem("fashion_points", 0);
        points.innerHTML = getPoints();
    };
};

function callWorker() {
    var arrayLength = dressArray.length;
    console.log("dressArray: " + arrayLength);
    console.log("productsArray: " + productsArray.length);
    if (arrayLength < 12) {
        console.log("manjši kot 10");
        worker.postMessage("getItems");

        worker.onmessage = function(event) {
            parseShopStyleJson(event.data);
            console.log(arrayLength);
            if (arrayLength == 0) {
                setNewQuestion(randomDress());
            }
        }
    }
}

function parseShopStyleJson(responseText) {
    var json = JSON.parse(responseText);
    var category = json.metadata.category.name;

    productsArray = json.products;
    console.log(category);

    for (var i = 0; i < productsArray.length; i++) {
        if (productsArray[i].brand && productsArray[i].image.sizes.Original.url) {
            var dress = new Dress(
                productsArray[i].id,
                productsArray[i].brand.name,
                productsArray[i].image.sizes.Original.url,
                category
            );

            dressArray.push(dress);
        }
    }
}

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

    /* show the element in DOM that will display the result */
    resultText.style.display = "block";

    /* first check if answering is disabled, then check if answer is correct or not */
    if (!item.disabled) {
        if (answer.target.innerHTML == rightDress.brand) {
            item.setAttribute("class", "dress list-group-item list-group-item-success");
            resultText.innerHTML = "Your answer is correct :)"
            var currentResult = getPoints();
            setPoints(parseInt(currentResult) + 1);
        } else {
            item.setAttribute("class", "dress list-group-item list-group-item-danger");
            resultText.innerHTML = "Sorry, wrong answer... :( The right answer is " + rightDress.brand + ".";
        }

        /* delete dress from dressArray */
        dressArray = dressArray.filter(function(dress){
            return dress.id !== rightDress.id;
        });

        /* show button */
        nextButton.style.display = "block";

        /* disable answering for the element in DOM that user clicked on */
        item.disabled = true;
    }

    /* disable answering for other elements in DOM too (the ones that user didn't click on) */
    for (var i = 0; i < brands.length; i++) {
        var answer2 = document.getElementById(brands[i]);

        if (answer2) {
            answer2.disabled = true;
        }
    }
}