// Star Wars gif site based on button search

// Beginning array of search options and the creation of them
var srchBtns = [
    "Luke Skywalker",
    "Han Solo",
    "Lando Calrissian",
    "Chewbacca",
    "Yoda",
    "Count Dooku",
    "Darth Vader",
    "Rey",
    "Finn",
    "Poe Dameron",
    "Jyn Erso"
]

for (var i = 0; i < srchBtns.length; i++) {
    var b = $("<button>");
    b.attr("class", "srchBtn")
    b.attr("data-value", srchBtns[i]);
    b.text(srchBtns[i]);
    $("#btnCntnr").append(b);
}

// Functionality when page is ready

$(document).ready(function () {
    $("#addBtn").on("click", function (event) {
        event.preventDefault();

        //Variables for button and it's text
        var btn = $("<button>");
        var text = $("#srchOpt").val().trim();
        var btnText = btn.text(text);
        srchBtns.push(text);

        // Gives button a value of the search option
        btn.attr("class", "srchBtn")
        btn.attr("data-value", text);

        // Appending button text to button
        btn.append(btnText);

        // Attaches button to page
        $("#btnCntnr").append(btn);
        $("#srchOpt").val("");
    });
});


// Registers the click event based on class after element has been added to the page

$(document).on("click", ".srchBtn", function (event) {
    event.preventDefault();
    console.log(this);

    var theme = $(this).attr("data-value");
    var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=xTFrDsrxZIPCwPYTk6rmBA24QxOpfLCB&q=" + theme + "&limit=10&offset=0&rating=R&lang=en";

    $.ajax({
        url: queryURL,
        method: "GET"
    })
        .then(function (response) {
            console.log(response);
            var results = response.data;

            for (var i = 0; i < results.length; i++) {
                var resultsDiv = $("<div>");
                resultsDiv.attr("class", "container ratingBox");
                var p = $("<p>").text("Rating: " + results[i].rating);
                p.attr("class", "ratings");
                var resultsImg = $("<img>");
                resultsImg.attr("src", results[i].images.fixed_height_small_still.url);
                resultsImg.attr("data-animate", results[i].images.fixed_height.url);
                resultsImg.attr("data-still", results[i].images.fixed_height_small_still.url);
                resultsImg.attr("class", "gif");
                resultsImg.attr("data-state", "still");

                resultsDiv.append(p);
                resultsDiv.append(resultsImg);
                $("#gphyBox").prepend(resultsDiv);
            }
        })
})

$(document).on("click", ".gif", function () {
    var state = $(this).attr("data-state");
    if (state === "still") {
        $(this).attr("src", $(this).attr("data-animate"));
        $(this).attr("data-state", "animate");
    } else {
        $(this).attr("src", $(this).attr("data-still"));
        $(this).attr("data-state", "still");
    }
})

