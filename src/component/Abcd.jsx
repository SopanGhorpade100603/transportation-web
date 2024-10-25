import React from 'react'
import { useState } from 'react'

export default function Abcd() {
    const [responseData, setResponseData] = useState(null) 

    const sendDataToFlask= async()=>{
        const data = {name :"sopan", age :21}
        const response = await fetch('http://127.0.0.1:5000/api/data',{
            method:'post',
            headers: {
                'Content-Type': 'application/json',
            },
            body:JSON.stringify(data),
        })

        const result = await response.json();
        setResponseData(result)
    }
  return (
    <div>
      <h1>Send Data to Flask</h1>
      <button onClick={sendDataToFlask}>Send Data</button>
    </div>
  )
}
