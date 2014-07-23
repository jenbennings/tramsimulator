(function() {

  var noises,
      randomiser;

  var init = function init() {
    var event_name = (typeof Touch == "object") ? "touchstart" : "click";
    noises = $("audio");
    randomiser = Unrandom([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23]);


    $("#button").on(event_name, function(e) {
      fart();

      e.preventDefault();
      return false;
    });

  };

  var fart = function fart() {
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