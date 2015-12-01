$(document).ready(function () {
  var app = {

    cards: [1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6],

    init: function(){
      app.shuffle();
    },

    shuffle: function () {
      var ramdom = 0;
      var temp = 0;
      for (var i = 0; i < app.cards.length; i++) {
        random = Math.round(Math.random()*i);
        temp = app.cards[i];
        app.cards[i] = app.cards[random];
        app.cards[random] = temp;
      }
      app.assignCards();
      console.log("mix cards array: " + app.cards);
    },

    assignCards: function () {
      $(".card").each(function (index) {
        $(this).attr("data-card-value", app.cards[index]);
      });
      app.clickHandlers();
    },

    clickHandlers: function () {
      $(".card").on("click", function () {
        $(this).html("<h2>" + $(this).data("cardValue")+"</h2>").addClass("selected");
        $(this).removeClass("unactive");
        app.checkMatch();
      });
    },

    checkMatch: function () {
      if ($(".selected").length == 2) {
        if($(".selected").first().data("cardValue") == $(".selected").last().data("cardValue")){
          $(".selected").each(function () {
            $(this).animate({opacity: 0}).removeClass("unmatched");
          });
          // this will remove the selected class
          $(".selected").each(function () {
            $(this).removeClass("selected");
          });
          app.checkWin();
        } else {
          setTimeout(function () {
            $(".selected").each(function () {
              $(this).html("").removeClass("selected");
              $(this).addClass("unactive");
            });
          }, 500);
        }
      }
    },

    checkWin: function () {
      if($(".unmatched").length === 0){
        $(".container").html("<h1 class=win>You Win!!</h1>");
      }
    }

  };
  app.init();
});
