//import moment from 'moment'
//import momentDurationFormatSetup from 'moment-duration-format'
import React from 'react';

//momentDurationFormatSetup(moment)

const TimeLeft = ({ timeLeft, timerLabel }) => {

    let minutes = Math.floor(timeLeft / 60);
    let seconds = timeLeft - minutes * 60;
    seconds = seconds < 10 ? '0' + seconds : seconds;
    minutes = minutes < 10 ? '0' + minutes : minutes;

    const formattedTimeLeft = minutes + ':' + seconds;

    
    console.log(formattedTimeLeft);
    return (
        <div>
            <p id='timer-label'>{timerLabel}</p>
            <p id='time-left'>{formattedTimeLeft}</p>
        </div>
    );
}

export default TimeLeft;

