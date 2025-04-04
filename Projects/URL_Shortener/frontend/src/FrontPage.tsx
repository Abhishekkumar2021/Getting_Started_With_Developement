import './FrontPage.css'
import React from 'react'

export default function FrontPage(){
    return(
        <div className="main">
            <div className="start">
                <h1>URL Shortener</h1>
                <p>Meet <span>URL Shortener</span>, an easy to use shortening to Long URLs</p>
                <div className="inputs">
                    <input type="text"  placeholder="Enter URL here"/>
                    <button>Shorten</button>
                </div>
            <p></p>
            </div>
            <div className="end">
                <h1>Shortened URL</h1>
                <div className="result">
                    <div className="output"></div>
                    <button>copy</button>
                </div>
            </div>
        </div>
    )
}