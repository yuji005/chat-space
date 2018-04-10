$(function() {
  // ユーザーリスト作成
  function appendUser(user){
    var html = `<div class='chat-group-user clearfix'>
                  <p class='chat-group-user__name'>
                  ${ user.name }
                  </p>
                  <a class='user-search-add chat-group-user__btn chat-group-user__btn--add' data-user-id='${ user.id }' data-user-name= '${ user.name }'>追加
                  </a>
                </div>`
    $('#user-search-result').append(html)
  }
// ユーザー名が存在しない
  function appendNoUser(NoUser){
          var html = `<div class='chat-group-user clearfix'>${NoUser }</p>`
          $('#user-search-result').append(html);
  }
// ユーザー検索
// イベント発火
    $('.chat-group-form__input').on('keyup',function(){
      var input = $(this).val();
      $.ajax({
        type: 'GET',
        url: '/users',
        data: { keyword: input },
        dataType: 'json'
      })
// ユーザーの検索に成功
// 非同期通信の結果をdoneの関数の引数から受け取り、viewに追加するHTMLを作成
      .done(function(user){
        $('#user-search-result').empty();
// jbuilderから送られてきた配列によって場合分け、関数呼び出し
        if (user.length !== 0) {
          user.forEach(function(user){
            appendUser(user);
          });
        }
        else{
          appendNoUser('一致するユーザーはいません');
        }
      })
      .fail(function(){
        alert('ユーザー検索に失敗しました')
      });
    });
// 追加ユーザーリスト作成
function appendGroupUsers(user_id, user_name){
    var html =`<div class='chat-group-user clearfix js-chat-member' id='chat-group-user-${ user_id }'>
                <input name='group[user_ids][]' type='hidden' value= ${ user_id }>
                <p class='chat-group-user__name'>
                ${ user_name }
                </p>
                <a class='user-search-remove chat-group-user__btn chat-group-user__btn--remove js-remove-btn'>
                削除
                </a>
             </div>
            `
      $('#chat-group-users').append(html)
    }

  $('#user-search-result').on('click', '.chat-group-user__btn--add', function(e){
    e.preventDefault();
    var user_id = $(this).data('userId');
    var user_name = $(this).data('userName');
    $(this).parent().remove();
    appendGroupUsers(user_id, user_name);
  });

  $('#chat-group-users').on('click', '.chat-group-user__btn--remove', function(){
    $(this).parent().remove();
  })
});
