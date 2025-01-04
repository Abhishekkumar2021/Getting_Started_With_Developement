package main

import (
	"fmt"
	"net/http"

	"github.com/akansha2026/utlis"
)

func homeHandler(w http.ResponseWriter, r *http.Request) {
	fmt.Println(r.Method)
	utlis.Greeting()
	fmt.Fprintln(w, "Welcome to home endpoint!")
}

func main() {
	// Create end points
	http.HandleFunc("GET /", homeHandler)
	http.ListenAndServe(":8080", nil)
}
