// To make images retina, add a class "2x" to the img element
// and add a <image-name>@2x.png image. Assumes jquery is loaded.

function isRetina() {
  var mediaQuery = "(-webkit-min-device-pixel-ratio: 1.5),\
            (min--moz-device-pixel-ratio: 1.5),\
            (-o-min-device-pixel-ratio: 3/2),\
            (min-resolution: 1.5dppx)";

  if (window.devicePixelRatio > 1)
    return true;

  if (window.matchMedia && window.matchMedia(mediaQuery).matches)
    return true;

  return false;
};


function retina() {

  if (!isRetina())
    return;

  $("img.2x").map(function(i, image) {

    var path = $(image).attr("src");

    path = path.replace(".png", "@2x.png");
    path = path.replace(".jpg", "@2x.jpg");

    $(image).attr("src", path);
  });
};

$(document).ready(retina);

// Thanks bellew! Thanks fart-noises.com!

(function() {

  var noises,
      randomiser;

  var init = function init() {
    var event_name = (typeof Touch == "object") ? "touchstart" : "mousedown";
    noises = $("audio");
    randomiser = Unrandom([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23]);

    $("#button").on(event_name, function(e) {
      ding();

      e.preventDefault();
      return false;
    });

  };

  var ding = function ding() {
    var noise = noises.eq(randomiser.get());
    noise[0].play();
  };

  $(init);

})();

var Unrandom = function(_items) {

  var items,
      last_item,
      marker = 0;

  var init = function() {
    items = _items;
    shuffle();
  };

  var get = function() {
    var new_item = last_item;
    while (new_item == last_item) {
      marker += 1;
      if (marker == items.length) {
        shuffle();
        marker = 0;
      }
      new_item = items[marker];
    }
    last_item = new_item;

    return new_item;
  };

  var shuffle = function() {
    var l = items.length, t, r;
    if (l == 0) return;

    while (--l) {
      r = Math.floor(Math.random() * l + 1);
      t = items[l];
      items[l] = items[r];
      items[r] = t;
    }
  }

  init();

  return {
    get: get
  };
};