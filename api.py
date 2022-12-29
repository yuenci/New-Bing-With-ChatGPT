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
    print("message👉",  item["message"])
    message = item.get("message")
    response = chatGPT.get_response(message)
    return {"response": response}


@app.post("/refresh")
async def refresh(item: dict):
    print("session_token👉",  item["session_token"])
    session_token = item.get("session_token")
    chatGPT.refresh_session(session_token)
    return {"response": "session refreshed"}

if __name__ == "__main__":
    uvicorn.run("api:app", host="127.0.0.1", port=5000)
