var fb = new Firebase("https://tramsimulator.firebaseio.com/incid");

// monitors changes and updates UI
fb.child('counter').on('value', updateDiv);
fb.on('value', updatePre);

// creates a new, incremental record
$('#button').on('click', incId);

// resets the data
$('#clear').on('click', function() {
   fb.remove();
});

// attempts to create any id you put in
$('#customButton').on('click', function() {
   addRecord($('#custom').val());
});

var errId = 0;
// creates a new, incremental record
function incId() {
    // increment the counter
    fb.child('counter').transaction(function(currentValue) {
        return (currentValue||0) + 1
    }, function(err, committed, ss) {
        if( err ) {
           setError(err);
        }
        else if( committed ) {
           // if counter update succeeds, then create record
           // probably want a recourse for failures too
           addRecord(ss.val());
        }
    });
}

// creates new incremental record
function addRecord(id) {
    setTimeout(function() {
       fb.child('records').child('rec'+id).set('record #'+id, function(err) {
          err && setError(err);
       });
    });
}

// for demo purposes
function updateDiv(ss) {
   $('#counter').text(ss.val()||0);
   $('#custom').val('rec'+(parseInt(ss.val(), 10)+1));
}

// for demo purposes
function updatePre(ss) {
   $('#data').text(JSON.stringify(ss.val(), null, 2));
}

// for demo purposes
function setError(msg) {
    var id = ++errId;
    $('body').append('<p id="err'+id+'">'+msg+'</p>');
    setTimeout(function() { $('#err'+id).fadeOut(); }, 2500);
}
