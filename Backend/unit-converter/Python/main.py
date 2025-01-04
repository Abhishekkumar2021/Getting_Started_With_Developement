from fastapi import FastAPI, Request
from .utils import convert_length, convert_weight, convert_temperature

app = FastAPI()

# Enpoints
@app.get("/")
def home(req: Request):
    print("Base url: ", req.base_url)
    return {
        "message": "This is the home endpoint!",
        "data": {}
    }
    
# Length endpoint
@app.get("/length")
def length_controller(from_unit: str, to_unit: str, value: float):
    # Steps
    # a. Grab the query parameters from request
    # b. Send it to the function that converts the length
    # c. Send the response
    print("Query Parameters: ")
    print(from_unit, to_unit, value)
    try:
        converted_length = convert_length(from_unit, to_unit, value)
    
        return {
            "message": f"Succesfully converted from {from_unit} to {to_unit}",
            "data": converted_length
        }
    except Exception as e:
        return {
            "message": f"Can't convert from {from_unit} to {to_unit}. {str(e)}"
        }
    

# Weight endpoint

@app.get("/weight")
def weight_controller(from_unit: str, to_unit: str, value: float):
    # Steps
    # a. Grab the query parameters from request
    # b. Send it to the function that converts the weight
    # c. Send the response
    try:
        converted_weight = convert_weight(from_unit, to_unit, value)
    
        return {
            "message": f"Succesfully converted from {from_unit} to {to_unit}",
            "data": converted_weight
        }
    except Exception as e:
        return {
            "message": f"Can't convert from {from_unit} to {to_unit}. {str(e)}"
        }
    


#Temperature

@app.get("/temperature")
def temperature_controller(from_unit: str, to_unit: str, value: float):
    # Steps
    # a. Grab the query parameters from request
    # b. Send it to the function that converts the temperature
    # c. Send the response
    try:
        converted_temperature = convert_temperature(from_unit, to_unit, value)
    
        return {
            "message": f"Succesfully converted from {from_unit} to {to_unit}",
            "data": converted_temperature
        }
    except Exception as e:
        return {
            "message": f"Can't convert from {from_unit} to {to_unit}. {str(e)}"
        }
    
