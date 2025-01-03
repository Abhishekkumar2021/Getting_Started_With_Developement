#! /usr/bin/env node

import express from "express"
import { convertLength, convertTemperature, convertWeight } from "./utils.js"
import cors from "cors"

const server = express()
server.use(cors())

server.listen(8080, () => {
    console.log("Server started at http://127.0.0.1:8080")
})


// Endpoints
server.get("/", (req, res) => {
    console.log("Endpoint: ", req.url)
    console.log("IP of client: ", req.ip)

    res.send("<h1> Welcome to Unit Conversion APIs")
})

server.get("/length", (req, res) => {
    const {
        from,
        to,
        val
    } = req.query

    // Conversion
    try {
        const convertedLength = convertLength(from, to, val);
        const dataResponse = {
            message: `Successfullly converted from ${from} to ${to}.`,
            data: convertedLength
        }
    
        const jsonString = JSON.stringify(dataResponse)
        res.send(jsonString)
    } catch (error) {
        const errorResponse = {
            message: `Can't convert from ${from} to ${to}. ${error.message}`,
        }
        const jsonString = JSON.stringify(errorResponse)
        res.send(jsonString)
    }
})

server.get("/weight", (req, res) => {
    const { from, to, val } = req.query

    try {
        const convertedWeight = convertWeight(from, to, val)
    
        const dataResponse = {
            message: `Successfullly converted from ${from} to ${to}.`,
            data: convertedWeight
        }
    
        const jsonString = JSON.stringify(dataResponse)
        res.send(jsonString)
    } catch (error) {
        const errorResponse = {
            message: `Can't convert from ${from} to ${to}. ${error.message}`,
        }
    }
})

server.get("/temperature", (req, res) => {
    const { from, to, val } = req.query

    try {
        const convertedWeight = convertTemperature(from, to, val)
    
        const dataResponse = {
            message: `Successfullly converted from ${from} to ${to}.`,
            data: convertedWeight
        }
    
        const jsonString = JSON.stringify(dataResponse)
        res.send(jsonString)
    } catch (error) {
        const errorResponse = {
            message: `Can't convert from ${from} to ${to}. ${error.message}`,
        }
    }
})