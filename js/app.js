// =================================
// Array of all translators
var translators = [
  new Translator("pirate", "Type somethin' first ye scurvy dog!"),
  new Translator("yoda", "Empty the input box is, hhhhmmmmmm?  Empty leads to the dark side."),
  new Translator("piglatin", "Oink!  Oink!"),
  new Translator("dug", "Please type something in the input box, Master.  I do not like the cone of shame.")
];

// =================================
// Quotes
var quotes = {
  movies: ["movie1", "movie2"],
  songs: ["song1", "song2", "song3"],
  rhymes: ["rhyme1"]
};

// =================================
// document ready (events for buttons)
$(document).ready( function() {
  $( "#credits-dialog" ).dialog({
      width: 560,
      autoOpen: false,
      show: {
        effect: "drop",
        duration: 250
      },
      hide: {
        effect: "explode",
        duration: 500
      }
    });

  $(".source button").click( translateHandler );
  $("#movie-link").click( movieHandler );
  $("#song-link").click( songHandler );
  $("#rhyme-link").click( rhymeHandler );
  $("#credits-link").click( creditsHandler );
});

// =================================
// translate button click handler
var translateHandler = function() {
  $(".translations textarea").val("Translating...");
  var english = $(".source textarea").val();

  for (var i = 0; i < translators.length; i++) {
    translators[i].translate(english);
  }
};

// =================================
// translate button click handler
var movieHandler = function(e) {
  e.preventDefault();
  setInspirationText(quotes["movies"]);
};

// =================================
// translate button click handler
var songHandler = function(e) {
  e.preventDefault();
  setInspirationText(quotes["songs"]);
};

// =================================
// translate button click handler
var rhymeHandler = function(e) {
  e.preventDefault();
  setInspirationText(quotes["rhymes"]);
};

// =================================
// inspiration
var setInspirationText = function(quotesArray) {
  var index = getRandomInt(0,quotesArray.length-1);
  var txt = quotesArray[index];
  $(".source textarea").val(txt);
  translateHandler();
};

var getRandomInt = function(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

// =================================
// credits link click handler
var creditsHandler = function(e) {
  e.preventDefault();
  $("#credits-dialog").dialog("open");
};

// =================================
// Translator class
function Translator(language, missingText ) {
  this.language = language;
  this.missingText = missingText;

  this.translate = function(english) {
    var language = this.language;
    if (!english)
      $("." + language + " textarea").val(this.missingText);
    else
      $.ajax({
          type: "GET",
          url: "http://pirate-api.herokuapp.com/translation",
          data: {english: english, language: language},
          dataType: "jsonp",
        })
        .done( function(result) {
          setTranslationSuccess(result, language);
        })
        .fail( function(jqXHR, error, errorThrown) {
          setTranslationError(jqXHR, error, errorThrown, language);
        });
  };
}

var setTranslationSuccess = function(result, language) {
  $("." + language + " textarea").val(result[language]);
};

var setTranslationError = function(jqXHR, error, errorThrown, language) {
  $("." + language + " textarea").val( error );
  console.log( error );
};

