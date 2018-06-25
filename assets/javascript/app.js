$(document).ready(function () {
    var topics = ["Dog", "Cat", "Bird", "Whale", "Fish", "Dolphin", "Cow", "Bear", "Lion", "Monkey"];

    function makeButtons() {
        $("#buttonContainer").empty();
        for (var i = 0; i < topics.length; i++) {
            var button = $("<button>");
            button.attr("class", "animalButton");
            button.attr("animalType", topics[i]);
            button.text(topics[i]);
            $("#buttonContainer").append(button);
        }
    }

    $("#submit").on("click", function (event) {
        event.preventDefault();
        var animal = $("#searchTerm").val().trim();
        topics.push(animal);
        $("#searchTerm").val("");
        makeButtons();
    });


    function makeGifs() {
            var animal = $(this).attr("animalType");
            var url = "https://api.giphy.com/v1/gifs/search?q=" + animal + "&api_key=1TXRbCxeJtYKtlEcExz1Ift93INFAfMD";
            $.ajax({
                url: url,
                method: "GET"
            }).then(function (response) {
                console.log(response);
                var results = response.data;
                for (var i = 0; i < 10; i++) {
                    var animalDiv = $("<div>");
                    var p = $("<p>");
                    p.html("Rating: " + results[i].rating);
                    var animalImage = $("<img>");
                    animalImage.attr("src", results[i].images.fixed_height_still.url);
                    animalImage.attr("still", results[i].images.fixed_height_still.url);
                    animalImage.attr("animated", results[i].images.fixed_height.url);
                    animalImage.attr("class", "image");
                    animalDiv.prepend(p);
                    animalDiv.append(animalImage);
                    $("#gifArea").prepend(animalDiv);
                }
                $("img").on("click", function () {
                    var state = $(this).attr("class");
                    if (state === "image") {
                        $(this).attr("src", $(this).attr("animated"));
                        $(this).attr("class", "gif");
                    } else {
                        $(this).attr("src", $(this).attr("still"));
                        $(this).attr("class", "image")
                    }
                });
            });
    }

    makeButtons();
    $(document).on("click", ".animalButton", makeGifs);
});