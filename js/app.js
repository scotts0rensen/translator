// =================================
// Array of all translators
var translators = [
  new Translator("pirate", "Type somethin' first ye scurvy dog!"),
  new Translator("yoda", "Empty the input box is, hhhhmmmmmm?  Empty leads to the dark side."),
  new Translator("piglatin", "Oink!  Oink!"),
  new Translator("dug", "Please type something in the input box, Master.  I do not like the cone of shame.")
];

// =================================
// document ready (events for buttons)
$(document).ready( function() {
  $(".source button").click( translateHandler );
});

// =================================
// on translate button click
var translateHandler = function() {
  $(".translations textarea").val("Translating...");
  var english = $(".source textarea").val();

  for (var i = 0; i < translators.length; i++) {
    translators[i].translate(english);
  }
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

