package utils

import (
	"encoding/json"
	"errors"
)

func ConvertLength(from_unit string, to_unit string, value float64) (float64, error) {
	// Logic here
	meter := map[string]float64{
		"kilometer":  1000,
		"hectometer": 100,
		"decameter":  10,
		"meter":      1,
		"decimeter":  0.1,
		"centimeter": 0.01,
		"millimeter": 0.001,
	}

	return (meter[from_unit] / meter[to_unit]) * value, nil
}

func ConvertWeight(from_unit string, to_unit string, value float64) (float64, error) {
	// Logic here
	gram := map[string]float64{
		"milligram": 0.001,
		"centigram": 0.01,
		"decigram":  0.1,
		"gram":      1,
		"decagram":  10,
		"hectogram": 100,
		"kilogram":  1000,
		"ton":       1000000,
	}

	return (gram[from_unit] / gram[to_unit]) * value, nil
}

func ConvertTemperature(from_unit string, to_unit string, value float64) (float64, error) {
	// Logic here
	if from_unit == "fahrenheit" {
		if to_unit == "celsius" {
			return (value - 32) / 1.8, nil
		} else if to_unit == "kelvin" {
			return (value-32)/1.8 + 273.15, nil
		} else {
			// Throw an error
			return -1, errors.New("Invalid to_unit !")
		}
	} else if from_unit == "celsius" {
		if to_unit == "fahrenheit" {
			return value*1.8 + 32, nil
		} else if to_unit == "kelvin" {
			return value + 273.15, nil
		} else {
			// Throw an error
			return -1, errors.New("Invalid to_unit !")
		}
	} else if from_unit == "kelvin" {
		if to_unit == "celsius" {
			return value - 273.15, nil
		} else if to_unit == "fahrenheit" {
			return (value-273.15)*1.8 + 32, nil
		} else {
			// Throw an error
			return -1, errors.New("Invalid to_unit !")
		}
	} else {
		// Throw error
		return -1, errors.New("Invalid from_unit !")
	}
}

// Convert the Go data type  to JSON string
func Stringify(value any) (string, error) {
	byteArray, err := json.Marshal(value)
	return string(byteArray), err
}

// Convert the JSON string to Go data type
