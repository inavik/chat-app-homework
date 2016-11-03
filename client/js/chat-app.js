(function() {
  'use strict';

  window.chat = window.chat || {};

  window.chat.listenForMessages(function messageHandler(data) {
    $('.messages')
    .append('<p>' + data.username + ': ' + data.message + '</p>')
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
        token = data.token;
        $('.login').trigger('reset');
      })

      .fail(function errorHandler(xhr, errorType) {
        console.log(xhr, errorType);
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
      $('.send-message').trigger('reset');
      // token = data.myToken;
    })
    .fail(function errorHandler(xhr, errorType) {
      // if (xhr.status === 404) {
      //     $('body').append('<p>Sorry, cannot find that file!</p>');
      // } else (xhr.status === 500) {
      //     $('body').append('<p>Sorry, the server is down!</p>');
      // }
        console.log(xhr, errorType);
    })
   });

}());
