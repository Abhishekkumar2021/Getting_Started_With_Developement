package main

import (
	"net/http"

	"github.com/akansha2026/routes"
)

func main() {
	// Create end points
	routes.CreateRoutes()
	http.ListenAndServe(":8080", nil)
}
