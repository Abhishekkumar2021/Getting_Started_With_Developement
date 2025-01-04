package controllers

import (
	"fmt"
	"net/http"
	"net/url"
	"strconv"

	"github.com/akansha2026/utils"
)

func HomeController(w http.ResponseWriter, r *http.Request) {
	fmt.Println(r.Method)
	fmt.Fprintln(w, "Welcome to home endpoint!")
}

func LengthController(w http.ResponseWriter, r *http.Request) {
	// Headers (metadata)
	w.Header().Set("Content-Type", "application/json")
	// Access query parameters
	u, err := url.Parse(r.URL.String())
	if err != nil {
		// return the error response
		errorMap := map[string]string{
			"message": fmt.Sprintf("Error parsing url: %s", err),
		}

		// Convert to json string
		errorResponse, _ := utils.Stringify(errorMap)
		fmt.Fprintf(w, "%s", errorResponse)
	}

	q := u.Query()

	if !q.Has("from_unit") || !q.Has("to_unit") || !q.Has("value") {
		// Error response
		// return the error response
		errorMap := map[string]string{
			"message": "All of from_unit, to_unit, and value are required fields!",
		}

		// Convert to json string
		errorResponse, _ := utils.Stringify(errorMap)
		fmt.Fprintf(w, "%s", errorResponse)
		return
	}

	value, err := strconv.ParseFloat(q.Get("value"), 64)
	if err != nil {
		// Send error response
		errorMap := map[string]string{
			"message": "Invalid value provided!",
		}

		// Convert to json string
		errorResponse, _ := utils.Stringify(errorMap)
		fmt.Fprintf(w, "%s", errorResponse)
		return
	}

	convertedLength, err := utils.ConvertLength(q.Get("from_unit"), q.Get("to_unit"), value)

	if err != nil {
		// Send error response
		// Send error response
		errorMap := map[string]string{
			"message": "Something went wrong!",
		}

		// Convert to json string
		errorResponse, _ := utils.Stringify(errorMap)
		fmt.Fprintf(w, "%s", errorResponse)
		return
	}

	// Send the success response
	successMap := map[string]interface{}{
		"message": fmt.Sprintf("Successfullt converted from %s to %s", q.Get("from_unit"), q.Get("to_unit")),
		"data":    convertedLength,
	}

	successResponse, _ := utils.Stringify(successMap)
	fmt.Fprintf(w, "%s", successResponse)
	return
}

func WeightController(w http.ResponseWriter, r *http.Request) {
	fmt.Println(r.Method)
	fmt.Fprintln(w, "Welcome to home endpoint!")
}

func TemperatureController(w http.ResponseWriter, r *http.Request) {
	fmt.Println(r.Method)
	fmt.Fprintln(w, "Welcome to home endpoint!")
}
