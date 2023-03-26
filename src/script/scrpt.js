import AddWelcome from './welcome.js';
import AddTone from './tone.js';
import AddLoading from './loading.js';
import AddChat from './chat.js';
import AddFeedback from './feedback.js';
import AddMessage from './message.js';
import { addNewMsg } from './message.js';


window.onload = function () {
    AddWelcome();
    AddTone();
    //AddLoading();
    AddMessage();
    AddChat();
    AddFeedback();
    addNewMsg('user', 'hello111hello111hello111hello111hello111hello111hello111hello111hello111hello111hello111hello111hello111hello111hello111hello111hello111hello111hello111')
    addNewMsg('bot', 'hello222')
    addNewMsg('user', 'hello111')
    addNewMsg('bot', 'hello222')
    addNewMsg('user', 'hello111')
    addNewMsg('bot', 'hello222')
    addNewMsg('bot', 'hello222')
    addNewMsg('bot', 'hello222')
    addNewMsg('user', 'hello111')
    addNewMsg('bot', 'hello222')
    addNewMsg('bot', 'hello222')
    addNewMsg('bot', 'hello222')
}