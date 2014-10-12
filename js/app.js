// =================================
// document ready (events for buttons)
$(document).ready( function() {
  $(".source button").click( translateHandler );
});

var translateHandler = function() {
  $(".translations textarea").val("Translating...");

  var english = $(".source textarea").val();

  translateYoda(english);
  translatePirate(english);
};

var translatePirate = function(english) {
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
