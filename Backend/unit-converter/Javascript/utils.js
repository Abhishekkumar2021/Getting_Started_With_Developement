export function convertLength(from, to, val) {
    const meter = {
        kilometer: 1000,
        hectometer: 100,
        decameter: 10,
        meter: 1,
        decimeter: 0.1,
        centimeter: 0.01,
        millimeter: 0.001
    }

    if (!(from in meter) || !(to in meter)) throw Error("Invalid unit(s) !")
    if (!val) throw Error("Invalid value to convert !")
    return (meter[from] / meter[to]) * val
}

export function convertWeight(from, to, val) {
    const gram = {
        milligram: 0.001,
        centigram: 0.01,
        decigram: 0.1,
        gram: 1,
        decagram: 10,
        hectogram: 100,
        kilogram: 1000,
        ton: 1000000,
    }

    if (!(from in gram) || !(to in gram)) throw Error("Invalid unit(s) !")
    if (!val) throw Error("Invalid value to convert !")

    return (gram[from] / gram[to]) * val;
}

export function convertTemperature(from, to, val) {
    if (!from || !to || !val) {
        throw Error("Missing something or all out of from, to, and val !")
    }

    if (from === to) return val;

    if (from === "fahrenheit") {
        if (to == "celsius") {
            return (val - 32) / 1.8
        } else if (to == "kelvin") {
           return  (val - 32) / 1.8 + 273.15
        } else {
            throw Error("invalid to unit!")
        }

    } else if (from === "celsius") {
        if (to == "fahrenheit") {
            return val * 1.8 + 32
        } else if (to == "kelvin") {
            return val + 273.15
        } else {
            throw Error("invalid to unit!")
        }
    } else if (from === "kelvin") {
        if (to == "celsius") {
            return val - 273.15
        } else if (to == "fahrenheit") {
            return (val - 273.15) * 1.8 + 32
        } else {
            throw Error("invalid to unit!")
        }
    } else {
        throw Error("Invalid from unit!")
    }
}