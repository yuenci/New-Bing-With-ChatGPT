import { AddWelcome, AddHeader } from './welcome.js';
import AddTone from './tone.js';
import AddChat from './chat.js';
import AddFeedback from './feedback.js';
import AddMessage from './message.js';
import { addNewMsg, scrollToBottom } from './message.js';
import { loadSearchPageContent } from './search.js';
import { AddKeyModal } from './utils.js';




window.onload = function () {
    loadChatPage();
    //loadSearchPage();
    console.log(getImagePath());
}

export function loadChatPage() {
    removeAll();
    AddWelcome();
    AddTone();
    AddMessage();
    AddChat();
    AddFeedback();
    AddKeyModal();
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

export function getImagePath() {
    // get mete tag data <meta name="image-path" content="src/image">
    let meta = document.querySelector('meta[name="image-path"]');
    let path = meta.getAttribute('content');
    return path;
}