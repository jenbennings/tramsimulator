var fb = new Firebase("https://tramsimulator.firebaseio.com/ding");

fb.child('counter').on('value', updateDiv);

var event_name = (typeof Touch == "object") ? "touchstart" : "click";

$('#button').on(event_name, ding);

function ding() {
  fb.child('counter').transaction(function(currentValue) {
      return (currentValue||0) + 1
  });
}

function updateDiv(ss) {
   $('#counter').text(ss.val()||0);
}