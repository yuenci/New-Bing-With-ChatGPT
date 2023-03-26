import { OPENAI_API_KEY } from "../conf.js";
import { getSettings } from "./utils.js";


async function chatGPT() {
    let messages;
    let messageDoms = $(".message");
    let tone = $("body").attr("class");
    //console.log(tone);
    if (tone === undefined) {
        messages = [{ "role": "system", "content": `You are a helpful assistant ` }];

    } else {
        tone = tone.split("-")[1];
        messages = [{ "role": "system", "content": `You are a helpful assistant with ${tone} tone` }];
    }

    messageDoms.each(function (index, element) {
        let role = $(element).attr("class").split(" ")[1];
        let content = $(element).find(".message-text").text();
        messages.push({ role, content });
    });


    return new Promise((resolve, reject) => {
        let key = getSettings().key;
        fetch("https://api.openai.com/v1/chat/completions", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${key}`
            },
            body: JSON.stringify({
                "model": "gpt-3.5-turbo",
                "messages": messages
            })
        })
            .then(response => response.json())
            .then(data => {
                console.log(data);
                let content = data.choices[0].message.content;
                resolve(content);
            })
            .catch(error => {
                console.error(error);
                reject(error);
            });
    })
}


export default chatGPT;