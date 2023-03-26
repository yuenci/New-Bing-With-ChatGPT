import { OPENAI_API_KEY } from "../config.js";

async function chatGPT(text) {

    text = "Please give me the filename a short description and a few relevant tags() of the code snippet  below, use json format. " +
        "every tag should be single word. filename use snake case "
        + text;

    return new Promise((resolve, reject) => {
        fetch("https://api.openai.com/v1/chat/completions", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${OPENAI_API_KEY}`
            },
            body: JSON.stringify({
                "model": "gpt-3.5-turbo",
                "messages": [{ "role": "user", "content": `${text}` }]
            })
        })
            .then(response => response.json())
            .then(data => {
                //console.log(data);
                let content = data.choices[0].message.content;
                let jsonForm = JSON.parse(content);
                console.log(jsonForm);
                resolve(jsonForm);
            })
            .catch(error => {
                console.error(error);
                reject(error);
            });
    })
}


export default chatGPT;