$(document).on("click", ".btn", function() {
  $("#ergebnisse").html("");
  // API-Abfrage beginnt
  var queryURL = "https://api.giphy.com/v1/gifs/search?";
  var query;
  var params = {
    q: query,
    limit: 5,
    api_key: "ZQyjffRaBG60GxoZHKRYhZlx89TZGqZJ",
    fmt: "json"
  };

  if ($(this).hasClass("search-btn")) {
    query = $(this).val();
  } else if ($("#suchfeld").val() !== "") {
    query = $("#suchfeld").val();
  }
  params.q = query;
  

  $.ajax({
    url: queryURL + $.param(params),
    method: "GET",
    success: function(r) {
      for (i = 0; i < params.limit; i++) {
        var $img = $("<img>");
        var $div = $("<div>");
        var $star = $("<h10>");
        var $copy = $("<h10>");
        var gifObj = r.data[i];
        var gif = gifObj.images;

        //Image wird kreiert
        $img.attr({
          src: gif.fixed_height_still.url,
          "data-animate": gif.fixed_height.url,
          "data-still": gif.fixed_height_still.url,
          "data-state": "still",
          class: "gif"
        });

        $div.addClass("gif-box");
        $star.text("⭐");// auf dieses Bild hätten die Favoriten gemusst
        $copy.text("🔗");// hier sollte die Kopie zum der URL entstehen
        $div.append($img, $star, $copy);
        $("#ergebnisse").append($div);
      }

      //Aus Spargründen bewegen sich die GIFs nur dann, wen man draufklickt
      $(".gif").on("click", function() {
        var state = $(this).attr("data-state");
        if (state === "still") {
          $(this).attr("src", $(this).attr("data-animate"));
          $(this).attr("data-state", "animate");
        } else {
          $(this).attr("src", $(this).attr("data-still"));
          $(this).attr("data-state", "still");
        }
      });
    }
  });
});