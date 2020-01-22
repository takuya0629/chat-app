App.room = App.cable.subscriptions.create("RoomChannel", {
  connected: function() {
    console.log('connected')
    // フロントサイドから監視が出来ているか確認
    // Called when the subscription is ready for use on the server
  },

  disconnected: function() {
    // Called when the subscription has been terminated by the server
  },

  received: function(message) {
    const messages = document.getElementById('messages')
    messages.innerHTML += message
    //(ブロードキャスト）フロントから来たデータを受け取る
    // Called when there's incoming data on the websocket for this channel
  },

  speak: function(content) {
    return this.perform('speak', {message: content});
  }
});

//'全てのjsが読み込まれたら起動っていう処理'
document.addEventListener('DOMContentLoaded', function(){
  //inputをviewから取得
  const input = document.getElementById('chat-input')
  //buttonをviewから取得
  const button = document.getElementById('button')
  button.addEventListener('click', function(){
    const content = input.value
    App.room.speak(content)
    input.value = ""
  })
})
