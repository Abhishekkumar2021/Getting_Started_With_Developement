def convert_length(from_unit: str, to_unit: str, value: float):
    meter = {
        "kilometer": 1000,
        "hectometer": 100,
        "decameter": 10,
        "meter": 1,
        "decimeter": 0.1,
        "centimeter": 0.01,
        "millimeter": 0.001
    }
    if from_unit not in meter or to_unit not in meter:
        raise Exception("Invalid unit(s)!")
    
    if not value:
        raise Exception("Invalid value to convert!")
    
    return (meter[from_unit]/meter[to_unit]) * value

def convert_weight(from_unit: str, to_unit: str, value: float):
    gram = {
        "milligram": 0.001,
        "centigram": 0.01,
        "decigram": 0.1,
        "gram": 1,
        "decagram": 10,
        "hectogram": 100,
       "kilogram": 1000,
        "ton": 1000000,
    }

    if from_unit not in gram or to_unit not in gram:
        raise Exception("Invalid unit(s)!")
    
    if not value:
        raise Exception("Invalid value to convert!")
    
    return (gram[from_unit]/gram[to_unit]) * value

def convert_temperature(from_unit: str, to_unit: str, value: float):
    if not from_unit or not to_unit or not value:
        raise Exception("Missing something or all out of from unit, to unit , and value !")
    
    if from_unit == to_unit:
        return value
    
    if from_unit == "fahrenheit":
        if to_unit == "celsius":
            return (value- 32) / 1.8
        elif to_unit == "kelvin":
            return (value - 32) / 1.8 + 273.15
        else:
            raise Exception("Invalid to unit!")
    elif from_unit == "celsius":
        if to_unit == "fahrenheit":
            return value * 1.8 + 32
        elif to_unit == "kelvin":
            return value + 273.15
        else:
            raise Exception("invalid to unit!")
    elif from_unit == "kelvin":
        if to_unit == "celsius":
            return value - 273.15
        elif to_unit== "fahrenheit":
            return (value - 273.15) * 1.8 + 32
        else:
            raise Exception("invalid to unit!")
    else:
        raise Exception("Invalid from unit!")
