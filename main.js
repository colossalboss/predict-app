$(function() {
  $('#btn').on('click', function() {
    $.get('message.txt', function(response) {
      $('#container').html(response);
    });
  });

  $('#button').on('click', function() {
    $.get('over.txt', function(result) {
      $('#container').html(result);
    });
  });

  $('#button1').on('click', function() {
    $.get('surebts.txt', function(result) {
      $('#container').html(result);
    });
  });

  $('#button2').on('click', function() {
    $.get('sureover.txt', function(result) {
      $('#container').html(result);
    });
  });
});