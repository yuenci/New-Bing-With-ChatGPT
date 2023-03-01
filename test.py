from revChatGPT.V1 import Chatbot
import json


with open('config.json') as f:
    session_token = json.load(f).get('session_token')
chatbot = Chatbot(config={
    "access_token": session_token
})

prev_text = ""
conversation_id = ""
parent_id = ""

for i in range(10):
    prompt = input("You: ")
    responseData = {}
    for data in chatbot.ask(
        prompt, conversation_id, parent_id
    ):
        responseData = data

    prev_text = responseData["message"]
    conversation_id = responseData["conversation_id"]
    parent_id = responseData["parent_id"]

    print("Bot: ", prev_text)
