import { useState , useEffect } from "react";

function TimerApp () {
    const [time , setTime] = useState(0)
    const [name , setName] = useState("")

    useEffect(() => {

        const interval = setInterval(() => {
            setTime(prevTime => prevTime + 1)
        } , 1000);

        return () => clearInterval(interval)
    } , [])

    return (
    <div>
        <h1>Timer: {time}</h1>
        <input type="text"
               value={name}
               onChange={(e)=> setName(e.target.value)}
               placeholder="Type your name"
        />
        <h2>Name: {name}</h2>
    </div>
    )
}
export default TimerApp;