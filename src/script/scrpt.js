import AddWelcome from './welcome.js';
import AddTone from './tone.js';
import AddChat from './chat.js';
import AddFeedback from './feedback.js';
import AddMessage from './message.js';
import { addNewMsg, scrollToBottom } from './message.js';


window.onload = function () {
    AddWelcome();
    AddTone();
    AddMessage();
    AddChat();
    AddFeedback();
    scrollToBottom();
}