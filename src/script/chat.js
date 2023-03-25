export default function AddChat() {
    let content = `
     <div id="bloom-con">
        <img src="./image/broom.svg" id="bloom-icon">
        <div>New topic</div>
      </div>
      <div id="chat-input-con">
        <img src="./image/chat.svg" id="chat-icon">
        <input type="text" placeholder="Ask me anything..." id="chat-input">
      </div>
    `;
    let chat = document.createElement('div');
    chat.id = 'chat-container';
    chat.innerHTML = content;
    document.body.appendChild(chat);
    addEvent(chat);
}

function addEvent(dom) { }