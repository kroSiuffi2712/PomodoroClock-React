import React, { useState, useEffect } from 'react'
import '../assets/css/style.css'

import Break from './Break'
import Session from './Session'
import TimeLeft from './TimeLeft'

function Pomodoro() {
    let [sessionLength, setSessionLength] = useState(1500);
    let [breakLength, setBreakLength] = useState(300);
    let [sessionType, setSessioType] = useState('Session');
    let [intervalId, setIntervalId] = useState(null);
    let [timeLeft, setTimeLeft] = useState(sessionLength);

    const audio = () => document.getElementById('beep');
    //change timeLeft
    useEffect(() => {
        setTimeLeft(sessionLength);
    }, [sessionLength]);

    //listen to timeleft changes
    useEffect(() => {
        if (timeLeft === 0) {
            if (sessionType === 'Session') {
                audio().play();
                setSessioType('Break');
                setTimeLeft(breakLength);
            }
            else if (sessionType === 'Break') {
                audio().play();
                setSessioType('Session')

                setTimeLeft(sessionLength);
            }
        }
    }, [breakLength, sessionType, sessionLength, timeLeft]);


    //Session
    const decrementSession = () => {
        const newSessionLength = sessionLength - 60;

        if (newSessionLength > 0) {
            setSessionLength(newSessionLength);
        }
    };

    const incrementSession = () => {
        const newSessionLength = sessionLength + 60;
        if (newSessionLength <= 60 * 60)
            setSessionLength(newSessionLength);
    };


    //Break
    const decrementBreak = () => {
        const newBreakLength = breakLength - 60;

        if (newBreakLength > 0) {
            setBreakLength(newBreakLength);
        }
    };

    const incrementBreak = () => {
        const newBreakLength = breakLength + 60
        if (newBreakLength <= 60 * 60)
            setBreakLength(newBreakLength)
    };

    const isStarted = intervalId !== null;

    const handleStartStop = () => {
        //use setInterval for decrement timeleft.
        if (isStarted) {
            audio().play();
            clearInterval(intervalId);
            setIntervalId(null);
        } else {
            audio().pause();
            const newIntervalId = setInterval(() => {
                setTimeLeft(prevTimeLeft => prevTimeLeft - 1);
            }, 100);
            setIntervalId(newIntervalId);
        }

    }

    const handleResetButton = () => {
        audio().pause();
        audio().currentTime = 0;
        clearInterval(intervalId);
        setIntervalId(null);
        setSessioType('Session');
        setSessionLength(1500);
        setBreakLength(300);
        setTimeLeft(1500);
    }

    return (
        <div id="pomodoro-clock">
            <div id="header-container">
                <div id="length-section">
                    <Break breakLength={breakLength} decrementBreak={decrementBreak} incrementBreak={incrementBreak} />
                </div>
                <div id="session-section">
                    <Session sessionLength={sessionLength} decrementSession={decrementSession} incrementSession={incrementSession} />
                </div>
            </div>
            <div class="timer-container">
                <TimeLeft timerLabel={sessionType} handleStartStop={handleStartStop} timeLeft={timeLeft}></TimeLeft>
            </div>
            <div id="timer-control">
                <button id="start_stop" onClick={handleStartStop}>
                    {isStarted ?
                        <i className="fa fa-pause" aria-hidden="true"></i> :
                        <i className="fa fa-play" aria-hidden="true"></i>
                    }
                </button>
                <button id="reset" onClick={handleResetButton} >
                    <i className="fa fa-refresh" aria-hidden="true"></i>
                </button>
                <audio id="beep">
                    <source src="https://goo.gl/65cBl1" preload="auto" />
                </audio>

            </div>
        </div>
    );
}

export default Pomodoro;
