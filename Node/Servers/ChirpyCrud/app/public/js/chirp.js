/* global moment */

// When the page loads, grab and display all of our chirps
$.get("/api/all", function(data) {

  if (data.length !== 0) {

    for (var i = 0; i < data.length; i++) {

      var row = $("<div>");
      row.addClass("chirp");

      row.append("<p>" + data[i].author + " chirped.. </p>");
      row.append("<p>" + data[i].body + "</p>");
      row.append("<p>At " + moment(data[i].created_at).format("h:mma on dddd") + "</p>");

      $("#chirp-area").prepend(row);

    }

  }

});

// How to do POST in CRUD applications
// 1) Make a new object, grab the content from the form, put the info inside the object
// 2) Using a POST route insert the new data into the database
// 3) On success of posting to the database, without refreshing the page, change the content of the page
// When user chirps (clicks addBtn)
$("#chirp-submit").on("click", function(event) {
  event.preventDefault();

  // Make a newChirp object
  var newChirp = {
    author: $("#author").val().trim(),
    body: $("#chirp-box").val().trim(),
    created_at: moment().format("YYYY-MM-DD HH:mm:ss")
  };

  console.log(newChirp);

  // Send an AJAX POST-request with jQuery
  $.post("/api/new", newChirp)
    // On success, run the following code
    .done(function() {

      var row = $("<div>");
      row.addClass("chirp");

      row.append("<p>" + newChirp.author + " chirped: </p>");
      row.append("<p>" + newChirp.body + "</p>");
      row.append("<p>At " + moment(newChirp.created_at).format("h:mma on dddd") + "</p>");

      $("#chirp-area").prepend(row);

    });

  // Empty each input box by replacing the value with an empty string
  $("#author").val("");
  $("#chirp-box").val("");
});
