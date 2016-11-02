(function() {
  'use strict';

  window.chat = window.chat || {};

window.chat.listenForMessages(function messageHandler(data) {



});

var token;
$('.login')
  .on('submit', function submitLogin(event) {
    event.preventDefault();
    $.ajax ({
      url: '/login',
      method: 'POST',
      data: JSON.stringify({username: $('.username').val() }),
      // dataType: 'text',
      headers: {
        'Content-Type': 'application/json'
      }
    })
  .done(function successHandler (data) {
    console.log('it worked', data);
    token = data.token;
  })
  .fail(function errorHandler(xhr) {
    console.log(xhr, 'you got an error');
  })
});

$('.send-message')
  .on('submit', function submitMessage(event) {
    event.preventDefault();
    $.ajax ({
      url: '/chat',
      method: 'POST',
      data: JSON.stringify({message: $('.message').val() }),
      // dataType: 'text',
      headers: {
        Authorization: token,
        'Content-Type': 'application/json'

      }
    })
  .done(function successHandler (data) {
    console.log('submit was successful', data);
    // token = data.myToken;
  })
  .fail(function errorHandler(xhr) {
    console.log(xhr, 'you got an error when you submitted');
  })
});





}());
