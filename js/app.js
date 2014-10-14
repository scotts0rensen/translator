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
  movies: [
    "Fasten your seat belts. It's going to be a bumpy night.",
    "Hello. My name is Inigo Montoya. You killed my father. Prepare to die.",
    "I'll have what she's having.",
    "One Ring to rule them all. One Ring to find them. One Ring to bring them all, and in the darkness bind them.",
    "That there’s some good in this world, Mr. Frodo… and it’s worth fighting for.",
    "Your mother was a hamster, and your father smelt of elderberries!",
    "Bring out your dead!",
    "Badges?  We don't need no stinking badges.",
    "Gentlemen, you can't fight in here.  This is the war room!",
    "Just when I thought you couldn't possibly be any dumber.  You go and do something like this.  And totally redeem yourself.",
    "So you're telling me there's a chance",
    "There's no crying in baseball!",
    "I have nipples, Greg.  Could you milk me?",
    "Give me some of your tots!",
    "I'll be back!",
    "Frankly, my dear, I don't give a damn.",
    "Wonderful girl. Either I'm going to kill her or I'm beginning to like her.",
    "We came, we saw, we kicked ass.",
    "Everything. OK! I'll talk! In third grade, I cheated on my history exam. In fourth grade, I stole my uncle Max's toupee and I glued it on my face when I was Moses in my Hebrew School play. In fifth grade, I knocked my sister Edie down the stairs and I blamed it on the dog... when my mom sent me to the summer camp for fat kids and then they served lunch I got nuts and I pigged out and they kicked me out... but the worst thing I ever done - I mixed a pot of fake puke at home and then I went to this movie theater, hid the puke in my jacket, climbed up to the balcony and then, t-t-then, I made a noise like this: hua-hua-hua-huaaaaaaa - and then I dumped it over the side, all over the people in the audience. And then, this was horrible, all the people started getting sick and throwing up all over each other. I never felt so bad in my entire life.",
    "I feel the need.  The need, for speed.",
    "So why don't you make like a tree, and get out of here.",
    "Here's looking at you, kid.",
    "One million dollars"
  ],
  rhymes: [
    "Mary had a little lamb, little lamb, little lamb.\nMary had a little lamb, it's fleece was white as snow.",
    "Row, row, row your boat.\nGently down the stream.\nMerrily, merrily, merrily, merrily.\nLife is but a dream.",
    "Peter, Peter, pumpkin eater.\nHad a wife and couldn't keep her.\nHe put her in a pumpkin shell.\nAnd there he kept her very well.",
    "Humpty Dumpty sat on a wall.\nHumpty Dumpty had a great fall.\nAll the King's horses\nAnd all the King's men\nCouldn't put Humpty together again.",
    "Baa, baa, black sheep, have you any wool?\nYes sir, yes sir, three bags full.\nOne for the master, one for the dame,\nAnd one for the little boy, who lives down the lane.",
    "Hey diddle diddle,\nthe cat and the fiddle,\nthe cow jumped over the moon.\nThe little dog laughed\nto see such sport,\nand the dish ran away with the spoon."
  ],
  idioms: [
    "A bird in the hand is worth two in the bush",
    "Nervous as a long-tailed cat, in a room full of rocking chairs",
    "At the drop of a hat",
    "A penny saved is a penny earned",
    "I may have been born at night, but not last night",
    "By the skin of my teeth",
    "It is what it is",
  ]
};

// =================================
// document ready (events for buttons)
$(document).ready( function() {
  initalizeDialogs();

  $(".source .clear").click( clearHandler );
  $(".source .translate").click( translateHandler );
  $("#movie-link").click( movieHandler );
  $("#idiom-link").click( idiomHandler );
  $("#rhyme-link").click( rhymeHandler );
  $("#credits-link").click( creditsHandler );
  $("#yoda-link").click( yodaHandler );
});

// =================================
// clear button click handler
var clearHandler = function() {
  $(".source textarea").val("");
  $(".translations textarea").val("");
};

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
var idiomHandler = function(e) {
  e.preventDefault();
  setInspirationText(quotes["idioms"]);
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
// yoda link click handler
var yodaHandler = function(e) {
  e.preventDefault();
  $("#yoda-dialog").dialog("open");
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

var initalizeDialogs = function() {
  initalizeDialog($( "#credits-dialog" ));
  initalizeDialog($( "#yoda-dialog" ));
};

var initalizeDialog = function(dialogElem) {
  dialogElem.dialog({
    width: 700,
    height: 500,
    modal: true,
    resizable: true,
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
};



