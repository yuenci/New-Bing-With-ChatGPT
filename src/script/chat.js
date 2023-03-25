import { color, icon, pubsub } from "./StatusContainer.js";

export default function AddChat() {
    let content = `
     <div class="bloom-con-expand" id="bloom-con">
        <img src="./image/broom.svg" id="bloom-icon">
        <div>New topic</div>
      </div>
      <div id="chat-right">
        <div id="chat-input-con">
                <img src="./image/chat.svg" id="chat-icon">
                <textarea   placeholder="Ask me anything..." id="chat-input" ></textarea>
                <div id="arrow-icon">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048">
                        <path d="M64 1920q-28 0-46-18t-18-47q0-7 2-17l189-658q5-17 19-30t32-16l878-139q14-2 22-11t8-24q0-14-8-23t-22-12L242 786q-18-3-32-16t-19-30L2 82Q0 72 0 65q0-28 18-46T64 0q15 0 27 6l1920 896q17 8 27 23t10 35q0 19-10 34t-27 24L91 1914q-12 6-27 6z"></path>
                    </svg>
                </div>
        </div>
        <div id="word-count">
            <div id="word-count-text">0/2000</div>
            <img src="./image/pined.svg" id="word-count-icon">
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
        console.log('focus');
        // $(bloomCon).css('background', '#F2F2F2');
        // $(bloomIcon).attr('src', './image/broom-active.svg');
        bloomCon.find('div').hide();
        bloomCon.attr('class', 'bloom-con-shorten');
        chatCon.css('width', 'calc(100%)');
        chatCon.attr('class', 'chat-input-con-expand');
        wordCount.css('opacity', '1');
    });


    $(bloomCon).hover(function () {
        bloomCon.attr('class', 'bloom-con-expand');
        setTimeout(function () {
            bloomCon.find('div').show();
        }, 400);

    });


    $(chatCon).hover(function () {
        //
    });


    $(chatInput).on('blur', function () {
        // $(bloomCon).css('background', 'white');
        // $(bloomIcon).attr('src', './image/broom.svg');
    });

    $(chatInput).on("input", function () {
        if ($(chatInput).val().length > 0) {
            $(sendIcon).css('opacity', '1');
            wordCountText.text($(chatInput).val().length + '/2000');
            // $(sendIcon).css('color', '#FFB300');
        } else {
            $(sendIcon).css('opacity', '0');
            // $(sendIcon).css('color', 'black');
        }
    });


    $(pinedIcon).click(function () {
        chatCon.css('height', '200px');
        // chatCon.css()
    });

    // $(bloomCon).on('click', function () {
    //     $(chatInput).focus();
    // });



    // $(sendIcon).on('click', function () {
    //     let chat = $(chatInput).val();
    //     if (chat.length > 0) {
    //         $(chatInput).val('');
    //         $(chatInput).focus();
    //         sendChat(chat);
    //     }
    // });

    // $(chatInput).on('keyup', function (e) {
    //     if (e.keyCode == 13) {
    //         let chat = $(chatInput).val();
    //         if (chat.length > 0) {
    //             $(chatInput).val('');
    //             $(chatInput).focus();
    //             sendChat(chat);
    //         }
    //     }
    // });
}

pubsub.subscribe('chat', function (data) {
    //console.log(color[data.message]);
    bloomCon.css('background', color[data.message])
    $("body").attr("class", `linear-${data.message}`);
    $("#arrow-icon svg").attr("class", `arrow-icon-${data.message}`);
    $("#feedback-icon svg").attr("class", `arrow-icon-${data.message}`);
    $("#feedback-container").css("border-color", icon[data.message]);
}); 