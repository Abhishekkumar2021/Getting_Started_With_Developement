from fastapi import FastAPI

app = FastAPI()

# Enpoints
@app.get("/")
async def home():
    return {
        "message": "This is the home endpoint!",
        "data": {
            "number": 20,
            "element": "Ca"
        }
    }