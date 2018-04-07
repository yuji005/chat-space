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
    console.log(formData.get('message[image]'));
    $.ajax({
      url: url,
      type: "POST",
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(data){
      // console.log(data.image);
      var html = buildHTML(data);
      $('.messagesa').append(html);
      // console.log($('.messages')[0].scrollHeight);
      // console.log($('.messages').last().height());
      $('.mainmessages').animate({scrollTop: $('.messagesa').height()},'fast');
      $('.form__message__js__content').val("");
      $('.form__submit').attr('disabled', false)
    })
    .fail(function(){
      alert('error');
    })
  });
});
