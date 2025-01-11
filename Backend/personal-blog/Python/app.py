from fastapi import FastAPI
import uvicorn

app = FastAPI()

# Endpoints
@app.get("/")
def home_controller():
    return {"message": "Hello, World!"}


if __name__ == "__main__":
    uvicorn.run(app, port=8080)
    
    
    