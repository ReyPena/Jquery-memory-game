$(document).ready(function() {
  var app = {

    cards: [1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6],


    init: function() {
      app.shuffle();
    },

    shuffle: function() {
      var ramdom = 0;
      var temp = 0;
      for (var i = 0; i < app.cards.length; i++) {
        random = Math.round(Math.random() * i);
        temp = app.cards[i];
        app.cards[i] = app.cards[random];
        app.cards[random] = temp;
      }
      app.assignCards();
    },

    assignCards: function() {
      $(".card").each(function(index) {
        $(this).attr("data-card-value", app.cards[index]);
      });
      app.clickHandlers();
    },

    clickHandlers: function() {
      var counter = 1;
      $(".card").on("click", function() {
        $(this).html("<h2>" + $(this).data("cardValue") + "</h2>").addClass("selected");
        $(this).removeClass("unactive");
        app.checkMatch();
        $(".score").html("Score: " + counter);
        counter++;
      });
    },

    checkMatch: function() {
      if ($(".selected").length == 2) {
        if ($(".selected").first().data("cardValue") == $(".selected").last().data("cardValue")) {
          setTimeout(function () {
            $(".selected").each(function() {
              $(this).animate({
                opacity: 0
              }).removeClass("unmatched");
            });
            // this will remove the selected class
            $(".selected").each(function() {
              $(this).removeClass("selected");
            });
            app.checkWin();
          },500);
        } else {
          setTimeout(function() {
            $(".selected").each(function() {
              $(this).html("").removeClass("selected");
              $(this).addClass("unactive");
            });
          }, 500);
        }
      }
    },

    checkWin: function() {
      if ($(".unmatched").length === 0) {
        $(".container").html("<h1 class=win>congratulations!</h1>" + "<div class=paper><button class=play>Play Again</button></div>");
        // this is the actions for the butons
        $(".play").on("click", function() {
          location.reload();
        });
      }
    }


  };
  app.init();
});
