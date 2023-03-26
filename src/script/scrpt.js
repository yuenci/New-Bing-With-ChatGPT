import { AddWelcome, AddHeader } from './welcome.js';
import AddTone from './tone.js';
import AddChat from './chat.js';
import AddFeedback from './feedback.js';
import AddMessage from './message.js';
import { addNewMsg, scrollToBottom } from './message.js';


window.onload = function () {
    loadChatPage();
}

export function loadChatPage() {
    removeAll();
    AddWelcome();
    AddTone();
    AddMessage();
    AddChat();
    AddFeedback();
    scrollToBottom();
}

function loadSearchPage() {
    removeAll();
    AddHeader();
}

function removeAll() {
    $("body").empty();
}