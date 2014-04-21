test( "hello test", function() {
    ok( 1 == "1", "Passed!" );
});

test( "getPoints returns integer", function() {
    function isInteger(value) {
        if ((undefined === value) || (null === value)) {
            return false;
        }
        return value % 1 == 0;
    }

    equal(isInteger(getPoints()), true, "getPoints returns an integer");
    equal(isInteger(randomDress()), false, "randomDress doesnt return integer");
});

/*
test("title h3", function() {
    equal(find("h3").text(), "What brand is this item?", "naslov je pravi");
});*/