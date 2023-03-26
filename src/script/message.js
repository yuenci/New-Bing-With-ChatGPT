import { pubsub } from "./StatusContainer.js";

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
    scrollToBottom();
}


export function scrollToBottom() {
    let bottom = document.querySelector('#message-bottom');
    bottom.scrollIntoView({ behavior: 'smooth' });
}


pubsub.subscribe('clean', (msg, data) => {
    let container = document.querySelector('#message-con');
    container.innerHTML = '';
});