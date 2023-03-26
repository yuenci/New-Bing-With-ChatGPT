export default function AddMessage() {
    let content =
        `<div id="message-con"></div>
        <div id="message-bottom"></div>
        `;

    let message = document.createElement('div');
    message.id = 'message-container';
    message.innerHTML = content;
    document.body.appendChild(message);
    addEvent(message);
}

function addEvent(dom) { }



export function addNewMsg(type, text) {
    let content = `
    <div class="message ${type}">
        <div class="message-text">${text}</div>
    </div>
    `;
    let msg = $(content);

    let container = document.querySelector('#message-con');
    let $container = $(container);

    $container.append(msg);

    setTimeout(function () {
        let height = container.scrollHeight;
        container.scrollTo({ top: height, behavior: 'smooth' })
    }, 100);
}