package main

import (
	"fmt"
	"io"
	"net/http"
	"os"
)

func GetRequest(url string) string {
	resp, err := http.Get(url)

	if err != nil {
		fmt.Println("Error fetching URL!")
		os.Exit(1)
	}

	dataBytes, err := io.ReadAll(resp.Body)

	if err != nil {
		fmt.Println("Error reading response body!")
		os.Exit(1)
	}

	return string(dataBytes)
}

func main() {
	args := os.Args
	argc := len(args)

	if argc < 2 {
		fmt.Printf("Usage %s <url>\n", args[0])
		os.Exit(1)
	}

	url := args[1]

	data := GetRequest(url)
	fmt.Println(data)
}
