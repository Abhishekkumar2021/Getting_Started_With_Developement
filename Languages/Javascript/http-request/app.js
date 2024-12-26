#! /usr/bin/env node

const args = process.argv.slice(1);
args[0] = `./${args[0].split("/").pop()}`;
const argc = args.length;

if(argc < 2) {
    console.log(`Usage: ${args[0]} <url>`)
    process.exit(1)
}

const url = args[1]

// function successCallback(response){
//     const dataPromise = response.text();
//     dataPromise.then((data) => {
//         console.log(data)
//     })
//     .catch((error) => {
//         console.log(error)
//     })
// }

// function errorCallback(error){
//     console.log(error)
// }

// function getRequest(url){
//     const promise = fetch(url)
//     promise
//     .then(successCallback)
//     .catch(errorCallback)
// }

async function getRequest(url) {
    try {
        const response = await fetch(url)
        const data = await response.text()
        return data
    } catch (error) {
        return null
    }
}

getRequest(url)
.then((data) => {
    console.log(data)
})
.catch((error) => {
    console.log(error)
})