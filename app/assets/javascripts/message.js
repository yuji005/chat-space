$(function(){
// メッセージの非同期通信
function buildHTML(message){
    var img = '';
    if (message.image.url){
      var img =`<img src="${message.image.url}", class="lower-message__content">`;
    }
    var html = `<div class="messages" data-message-id=${message.id}>
                  <div class="upper-messages">
                    <div class="upper-message__user-name">
                      ${message.user_name}
                    </div>
                      <div class="upper-message__date">
                      ${message.created_at}
                      </div>
                  </div>
                  <div class="lower-meesage">
                    <p class="lower-message__content">
                      ${message.content}
                    </p>
                    ${img}
                  </div>
                  </div>
                `
    return html;
  }
  $('#new_message').on('submit', function(e){
    e.preventDefault();
    var formData = new FormData(this);
    var url = $(this).attr('action');
    $.ajax({
      url: url,
      type: "POST",
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(data){
      var html = buildHTML(data);
      $('.mainmessages__list').append(html);
      $('.mainmessages').animate({scrollTop: $('.mainmessages__list').height()},'fast');
      $('.form__message__js__content').val("");
      $('.form__submit').attr('disabled', false)
    })
    .fail(function(){
      alert('error');
    })
  });

  function autoUpdate(){
      var url = window.location.pathname;
      if (url.match(/\/groups\/\d+\/messages/)) {
      var message_id = $('.messages').last().data('message-id');
      if (message_id !== null){
      $.ajax({
        url: url,
        type: 'GET',
        data: { id : message_id},
        dataType: 'json',
      })
    .done(function(messages){
      if (messages.lenghth !== 0) {
        messages.forEach(function(message) {
        var html = buildHTML(message);
          $('.mainmessages__list').append(html);
          $('.mainmessages').animate({scrollTop: $('.mainmessages__list').height()},'fast');
        });
      }
    })
    .fail(function() {
      alert('自動更新に失敗しました');
    })
  }
  } else {
    clearInterval(autoUpdate);
    }
  };
  setInterval(autoUpdate,3000);
});
