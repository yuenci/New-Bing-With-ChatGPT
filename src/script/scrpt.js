import { AddWelcome, AddHeader } from './welcome.js';
import AddTone from './tone.js';
import AddChat from './chat.js';
import AddFeedback from './feedback.js';
import AddMessage from './message.js';
import { addNewMsg, scrollToBottom } from './message.js';
import { loadSearchPageContent } from './search.js';




window.onload = function () {
    //loadChatPage();
    loadSearchPage();
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

export function loadSearchPage() {
    removeAll();
    AddHeader("search");
    loadSearchPageContent();
}

function removeAll() {
    $("body").empty();
}