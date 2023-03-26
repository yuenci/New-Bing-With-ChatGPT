const { shell, ipcRenderer } = require('electron');


window.onload = () => {
    loadGPTClickEvent();
    loadMoreIconClickEvent();
    loadInputEvent();
};



function loadGPTClickEvent() {
    const gpt = document.getElementById('chatgpt');
    gpt.addEventListener('click', () => {
        // window.open("https://chat.openai.com/chat");
        console.log("gpt click");
        let res = ipcRenderer.sendSync('open-url', "https://chat.openai.com/chat");
        //console.log(res);
    });
}

function loadMoreIconClickEvent() {
    const moreIcon = document.getElementById('more');
    moreIcon.addEventListener('click', () => {
        let res = ipcRenderer.sendSync('close-searchBar', "close");
        //console.log(res);
    });
}


function loadInputEvent() {
    const chatInput = document.getElementById('input-box');
    // enter event
    chatInput.addEventListener('keypress', (e) => {
        let value = chatInput.value;
        if (e.key === 'Enter') {
            console.log(value);
            ipcRenderer.sendSync('show-mainWin', "");
            localStorage.setItem('userMsg', value);
        }
    });
}

