const Length = ({ title, changeTime, formatTime, time, type }) => {
    return (
        <div className="time">
            <h2 className="session-title">{title}</h2>
            <div className="settings">
                <button onClick={() => changeTime(-60, type)}>
                    <i class="far fa-chevron-down"></i>
                </button>
                <h2 className="time-amount">{formatTime(time)}</h2>
                <button onClick={() => changeTime(+60, type)}>
                    <i class="far fa-chevron-up"></i>
                </button>
            </div>
        </div>)
}

export default Length;