
import { color, icon, pubsub } from "./StatusContainer.js";
import { addNewMsg } from "./message.js";
import chatGPT from "./chatGPT.js";
import { AddLoading, removeLoading } from "./loading.js";
import { getImagePath } from './scrpt.js';

let path = getImagePath();

export default function AddChat() {
    let content = `
     <div class="bloom-con-expand" id="bloom-con">
        <img src="${path}/broom.svg" id="bloom-icon">
        <div>New topic</div>
      </div>
      <div id="chat-right">
        <div id="chat-input-con">
                <img src="${path}/chat.svg" id="chat-icon">
                <textarea   placeholder="Ask me anything..." id="chat-input" ></textarea>
                <div id="arrow-icon">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048">
                        <path d="M64 1920q-28 0-46-18t-18-47q0-7 2-17l189-658q5-17 19-30t32-16l878-139q14-2 22-11t8-24q0-14-8-23t-22-12L242 786q-18-3-32-16t-19-30L2 82Q0 72 0 65q0-28 18-46T64 0q15 0 27 6l1920 896q17 8 27 23t10 35q0 19-10 34t-27 24L91 1914q-12 6-27 6z"></path>
                    </svg>
                </div>
        </div>
        <div id="word-count">
            <div id="word-count-text">0/2000</div>
            <img src="${path}/pined.svg" id="word-count-icon">
        </div>
      </div>
    `;
    let chat = document.createElement('div');
    chat.id = 'chat-container';
    chat.innerHTML = content;
    document.body.appendChild(chat);
    addEvent(chat);
}

let bloomCon, bloomIcon, chatCon, chatInput, sendIcon, wordCount, wordCountText, pinedIcon

function addEvent(dom) {
    bloomCon = $(dom).find('#bloom-con');
    chatCon = $(dom).find('#chat-input-con');
    bloomIcon = $(dom).find('#bloom-icon');
    chatInput = $(dom).find('#chat-input');
    sendIcon = $(dom).find('#arrow-icon');
    wordCount = $(dom).find('#word-count');
    wordCountText = $(dom).find('#word-count-text');
    pinedIcon = $(dom).find('#word-count-icon');

    $(chatInput).on('focus', function () {
        //console.log('focus');
        bloomCon.find('div').hide();
        bloomCon.attr('class', 'bloom-con-shorten');
        chatCon.css('width', 'calc(100%)');
        setChatConClass();
        wordCount.css('opacity', '1');
    });


    $(bloomCon).hover(function () {
        bloomCon.attr('class', 'bloom-con-expand');
        setTimeout(function () {
            bloomCon.find('div').show();
        }, 400);

    });

    $(bloomCon).click(function () {
        console.log('bloomCon click');
        pubsub.publish('clean', {});
        wordCountText.text('0/2000');
        chatInput.val('');
    });


    $(chatInput).on("input", textAreaInputEvent);


    $(pinedIcon).click(expandChat);

    $(sendIcon).click(function () {
        let text = $(chatInput).val();

        if (text.length > 0) {
            // pubsub.publish('chat', {
            //     message: text
            // });
            addNewMsg("user", text);
            $(chatInput).val('');
            textAreaInputEvent();
            AddLoading();

            shortenChatBox();

            chatGPT().then((response) => {
                addNewMsg("assistant", response);
                removeLoading();
            });
        }
    });


    // chatInput enter event
    $(chatInput).keypress(function (e) {


        // ctrl + enter
        // if (e.ctrlKey && e.which == 13) {
        //     console.log('ctrl + enter');
        //     $(chatInput).val($(chatInput).val() + '\r\n');
        // }

        // shift + enter
        if (e.shiftKey && e.which == 13) {
            //console.log('shift + enter');
            $(chatInput).val($(chatInput).val() + '\r\n');
        }
        else if (e.which == 13) {
            $(sendIcon).click();
        }
    });
}

function expanChatBox() {
    chatCon.attr('class', 'chat-input-con-expand-plus');
    wordCount.attr('class', 'word-count-plus');
    chatInput.attr('class', 'chat-input-plus');
}

function shortenChatBox() {
    chatCon.attr('class', 'chat-input-con-expand');
    wordCount.attr('class', '');
    chatInput.attr('class', '');
}

function detectTextAreaHeight() {
    let height = $(chatInput).scrollTop();
    if (height !== 0) {
        expanChatBox();
    }
}



function expandChat() {
    let chatConClass = chatCon.attr('class');
    if (chatConClass === "chat-input-con-expand") {
        expanChatBox();
    } else {
        shortenChatBox();
    }
}

function setChatConClass() {
    let chatConClass = chatCon.attr('class');
    //console.log(chatConClass);
    if (chatConClass == undefined) {
        chatCon.attr('class', 'chat-input-con-expand');
    }

}

function textAreaInputEvent() {
    let textLength = $(chatInput).val().length;
    if (textLength > 0) {
        $(sendIcon).css('opacity', '1');
        wordCountText.text($(chatInput).val().length + '/2000');
    } else if (textLength == 0) {
        $(sendIcon).css('opacity', '0');
        wordCountText.text('0/2000');
    } else if (textLength > 2000) {
        wordCountText.text('2000/2000');
        chatInput.val(chatInput.val().substring(0, 2000));
    }

    detectTextAreaHeight();
}

pubsub.subscribe('tone', function (data) {
    //console.log(color[data.message]);
    bloomCon.css('background', color[data.message])
    $("body").attr("class", `linear-${data.message}`);
    $("#arrow-icon svg").attr("class", `arrow-icon-${data.message}`);
});


localStorage.setItem('chatGPT2', 'true');