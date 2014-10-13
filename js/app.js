// =================================
// document ready (events for buttons)
$(document).ready( function() {
  $(".source button").click( translateHandler );
});

var translateHandler = function() {
  $(".translations textarea").val("Translating...");

  var english = $(".source textarea").val();

  translatePirate(english);
  translateYoda(english);
  translatePigLatin(english);
  translateDug(english);
};

var translatePirate = function(english) {
  if (!english)
    $(".pirate textarea").val("Type somethin' first ye scurvy dog!");
  else
    $.ajax({
        type: "GET",
        url: "http://pirate-api.herokuapp.com/translation",
        data: {english: english},
        dataType: "jsonp",
      })
      .done( function (result) {
        $(".pirate textarea").val(result['pirate']);
      })
      .fail( function(jqXHR, error, errorThrown) {
        $(".pirate textarea").val( error );
        console.log( error );
      });
};

var translateYoda = function(english) {
  if (!english)
    $(".yoda textarea").val("Empty the input box is, hhhhmmmmmm?");
  else
    $.ajax({
        type: 'GET',
        url: "https://yoda.p.mashape.com/yoda?sentence=" + encodeURIComponent(english),
        headers: {
          "X-Mashape-Key": "54ORZskqN7mshyPkZ34Ia0FuJclvp1voVMfjsn9IZRPpUNA3UI"
        }
      })
      .done( function (result) {
        $(".yoda textarea").val(result);
      })
      .fail( function(jqXHR, error, errorThrown) {
        $(".yoda textarea").val( error );
        console.log( error );
      });
};

var translatePigLatin = function(english) {
  if (!english)
    $(".piglatin textarea").val("Oink!  Oink!");
  else
    $.ajax({
        type: "GET",
        url: "http://pirate-api.herokuapp.com/translation",
        data: {english: english, language: "piglatin"},
        dataType: "jsonp",
      })
      .done( function (result) {
        $(".piglatin textarea").val(result['piglatin']);
      })
      .fail( function(jqXHR, error, errorThrown) {
        $(".piglatin textarea").val( error );
        console.log( error );
      });
};


var translateDug = function(english) {
  if (!english)
    $(".dug textarea").val("I do not like the cone of shame. Please type something in the input box.");
  else
    $.ajax({
        type: "GET",
        url: "http://pirate-api.herokuapp.com/translation",
        data: {english: english, language: "dug"},
        dataType: "jsonp",
      })
      .done( function (result) {
        $(".dug textarea").val(result['dug']);
      })
      .fail( function(jqXHR, error, errorThrown) {
        $(".dug textarea").val( error );
        console.log( error );
      });
};

