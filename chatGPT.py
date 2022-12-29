
# https://github.com/acheong08/ChatGPT/wiki/Setup
# https://github.com/mpociot/chatgpt-vscode
# pip3 install --upgrade revChatGPT

from revChatGPT.ChatGPT import Chatbot
import json

# import config.json
with open('config.json') as f:
    session_token = json.load(f).get('session_token')


chatbot = Chatbot({
    "session_token": session_token
}, conversation_id=None, parent_id=None)


def get_response(message: str) -> str:
    response = chatbot.ask(message,
                           chatbot.conversation_id, chatbot.parent_id)
    chatbot.conversation_id = response["conversation_id"]
    chatbot.parent_id = response["parent_id"]
    return response["message"]


def refresh_session(session_token):
    chatbot.session_token = session_token
    with open('config.json', 'w') as f:
        json.dump({"session_token": session_token}, f)
