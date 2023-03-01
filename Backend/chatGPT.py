from revChatGPT.V1 import Chatbot
import json

# import config.json
with open('Backend/conf.json') as f:
    session_token = json.load(f).get('session_token')


chatbot = Chatbot(config={
    "access_token": session_token
})


def get_response(message: str, conversation_id: str, parent_id: str) -> str:
    responseData = {}
    for data in chatbot.ask(
        message, conversation_id, parent_id
    ):
        responseData = data

    response = responseData["message"]
    conversation_id = responseData["conversation_id"]
    parent_id = responseData["parent_id"]

    return {
        "message": response,
        "conversation_id": conversation_id,
        "parent_id": parent_id
    }


def refresh_session(session_token):
    chatbot.session_token = session_token
    with open('config.json', 'w') as f:
        json.dump({"session_token": session_token}, f)
