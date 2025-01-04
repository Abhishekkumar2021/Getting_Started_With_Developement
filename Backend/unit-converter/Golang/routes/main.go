package routes

import (
	"net/http"

	"github.com/akansha2026/controllers"
)

func CreateRoutes() {
	http.HandleFunc("GET /", controllers.HomeController)
	http.HandleFunc("GET /length", controllers.LengthController)
	http.HandleFunc("GET /weight", controllers.WeightController)
	http.HandleFunc("GET /temperature", controllers.TemperatureController)
}
