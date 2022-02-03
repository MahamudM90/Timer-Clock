import Length from "./Length"
import { useState } from "react"
import { useEffect } from "react"

const Clock = () => {

    const [displayTime, setDisplayTime] = useState(25 * 60)
    const [breakTime, setBreakTime] = useState(5 * 60)
    const [sessionTime, setSessionTime] = useState(25 * 60)
    const [timerOn, setTimerOn] = useState(false)
    const [onBreak, setOnBreak] = useState(false)
    const [breakAudio, setBreakAudio] = useState(null)
    useEffect(() => {
        setBreakAudio(new Audio("https://raw.githubusercontent.com/freeCodeCamp/cdn/master/build/testable-projects-fcc/audio/BeepSound.wav"))
    }, [])
    const playBreakAudio = () => {
        breakAudio.currentTime = 0
        breakAudio.play()
    }
    const formatTime = (time) => {
        let minutes = Math.floor(time / 60)
        let seconds = time % 60
        return (
            (minutes < 10 ? "0" + minutes : minutes) + ":" + (seconds < 10 ? "0" + seconds : seconds)
        )
    }
    const changeTime = (amount, type) => {
        if (type == "break") {
            if (breakTime <= 60 && amount < 0) {
                return;
            }
            setBreakTime(prev => prev + amount)
        } else {
            if (sessionTime <= 60 && amount < 0) {
                return;
            }
            setSessionTime(prev => prev + amount)
            if (!timerOn) {
                setDisplayTime(sessionTime + amount)
            }
        }
    }
    const resetTime = () => {
        setDisplayTime(25 * 60)
        setBreakTime(5 * 60)
        setSessionTime(25 * 60)
    }

    const controlTime = () => {
        let second = 1000
        let date = new Date().getTime()
        let nextDate = new Date().getTime() + second
        let onBreakVariable = onBreak
        if (!timerOn) {
            let interval = setInterval(() => {
                date = new Date().getTime()
                if (date > nextDate) {
                    setDisplayTime((prev) => {
                        if (prev <= 0 && !onBreakVariable) {
                            playBreakAudio()
                            onBreakVariable = true
                            setOnBreak(true)
                            return breakTime
                        } else if (prev <= 0 && onBreakVariable) {
                            playBreakAudio()
                            onBreakVariable = false
                            setOnBreak(false)
                            return sessionTime
                        }
                        return prev - 1
                    })
                    nextDate += second
                }
            }, 30);
            localStorage.clear();
            localStorage.setItem("interval-id", interval)
        }
        if (timerOn) {
            clearInterval(localStorage.getItem("interval-id"))
        }
        setTimerOn(!timerOn)
    }
    return (
        <div className="screen">
            <div className="text-container">
                <h1 className="app-title">Promodoro Clock</h1>
            </div>
            <div className='box'>
                <div className='wave'></div>
                <div className="wave2"></div>
            </div>

            <div className="container">

                <div className="settings-row">
                    <Length id="break-label" title={"Break Time"} changeTime={changeTime} type={"break"} time={breakTime} formatTime={formatTime} />
                    <Length id="session-label" title={"Session Time"} changeTime={changeTime} type={"session"} time={sessionTime} formatTime={formatTime} />
                </div>
                <div className="display">
                    <h2 id="timer-label" className="time-amount">{onBreak ? "Break" : "Session"}</h2>
                    <h1 id="time-left" className="time-amount">{formatTime(displayTime)}</h1>
                    <div className="controls">
                        <button id="start_stop" onClick={controlTime}>
                            {
                                timerOn ? (<i class="fas fa-pause"></i>) : (<i class="fas fa-play"></i>)
                            }
                        </button>
                        <button id="reset" onClick={resetTime}>
                            <i class="fas fa-redo-alt"></i>
                        </button>
                    </div>
                </div></div>
        </div>
    )

}

export default Clock;