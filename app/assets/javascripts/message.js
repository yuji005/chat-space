$(function(){
  function buildHTML(message){
    var img = '';
    if (message.image.url){
      var img =`<img src="${message.image.url}", class="lower-message__content">`;
    }
    var html = `<div class="messages">
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
});
