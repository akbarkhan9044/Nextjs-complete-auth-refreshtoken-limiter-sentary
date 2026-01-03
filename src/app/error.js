"use client"
import React, { useEffect } from "react";
export default function error({error,reset}){

    useEffect(()=>{
        console.error(error)
    },[error])
    return(
        <div>
            <h1>An error has occurred</h1>
            <p>{error.message}</p>
            <button onClick={()=>{
                reset()
            }}>Reset</button>
        </div>
    )
}