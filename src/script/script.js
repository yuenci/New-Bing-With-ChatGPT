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
    let imgs = $("img");
    for (let i = 0; i < imgs.length; i++) {
        imgs[i].src = imgs[i].src.replace("/image", "/src/image");
    }
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