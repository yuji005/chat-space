$(function(){
  function buildHTML(message){
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
                  <img src="${message.image.url}", class: 'lower-message__content'>
                  </div>
                </div>
                `
    return html;
  }
  $('#new_message').on('submit', function(e){
    e.preventDefault();
    var formData = new FormData(this);
    var url = $(this).attr('action')
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
      $('.messages').append(html)
      $('html,content').animate({scrollTop:$(".messages")[0].scrollHeight},'fast'):
    })
    .fail(function(){
      alert('error');
    })
  })
});
