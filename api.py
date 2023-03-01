from fastapi import FastAPI
import chatGPT
import uvicorn
from fastapi.middleware.cors import CORSMiddleware


app = FastAPI()

# set CORS policy
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # allow all origins
    allow_credentials=True,  # allow cookies
    allow_methods=["*"],  # allow all methods
    allow_headers=["*"]
)


@app.post("/chat")
async def chat(item: dict):
    message = item.get("message")
    conversation_id = item.get("conversation_id")
    parent_id = item.get("parent_id")
    # print(item)
    response = chatGPT.get_response(message, conversation_id, parent_id)
    return response


if __name__ == "__main__":
    uvicorn.run("api:app", host="127.0.0.1", port=5000, reload=True)
