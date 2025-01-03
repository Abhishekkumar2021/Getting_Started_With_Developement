const lengthInput = document.getElementById("length-input")
const fromLength = document.getElementById("from-length")
const toLength = document.getElementById("to-length")
const lengthConvert = document.getElementById("length-convert")
const lengthAnswer = document.getElementById("length-answer")

lengthConvert.addEventListener("click", async () => {
    // Extract values from HTML
    const from = fromLength.value
    const to = toLength.value
    const val = lengthInput.value

    // Send HTTP request with values to server (Method: GET using query parameters / POST using body)
    const baseUrl = "http://127.0.0.1:8080"
    const endpoint = `/length?from=${from}&to=${to}&val=${val}`

    try {
        const response = await fetch(`${baseUrl}${endpoint}`, {
            method: "GET"
        })
        const jsonString = await response.text()
        const {message, data} = JSON.parse(jsonString)
        if(!data){
            lengthAnswer.innerHTML = message
        }else {
            lengthAnswer.innerHTML = `The answer is: ${data} ${to}`
        }
    } catch (_) {
        console.log("Error sending request to server!")
    }
})

