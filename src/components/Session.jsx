//import moment from 'moment';
import React from 'react';

const Session = props => {
    const {
        sessionLength,
        decrementSession,
        incrementSession
    } = props;

    const sessionInMinutes = (sessionLength / 60) === 0 ? 60 : (sessionLength / 60);
    
    return (
        <div>
            <p id="session-label">Session Length</p>
            <p id="session-length">{sessionInMinutes}</p>
            <button id="session-decrement" onClick={decrementSession}>-</button>
            <button id="session-increment" onClick={incrementSession}>+</button>
        </div>
    );
};

export default Session;


