import {useContext} from 'react';
import CompostContext from '../CompostContext';
import {nanoid} from 'nanoid';


const MAX_WEEK = 8;
const MAX_DAY = 7;

function TurnInput(props) {
    const {order, dateDue, interval} = props.turn;
    const {handleInterval} = useContext(CompostContext);

    const weekOptionElements = [...Array(MAX_WEEK + 1)].map((option, index) => <option key={nanoid()} value={index}>{index}</option>)
    const dayOptionElements = [...Array(MAX_DAY + 1)].map((option, index) => <option key={nanoid()} value={index}>{index}</option>)
    return (
        <div className="turnInput"> 
            <h2 className="turnInput-title">Turn {order}</h2>
            <span><span className="bold">Turn date: </span>{dateDue}</span> <br />
            <span>Interval:</span>
            <label htmlFor="interval-weeks">Weeks:</label>
            <select className="interval-weeks" name="weeks" value={interval.weeks} onChange={(event) => handleInterval(event, order)}>
                {weekOptionElements}
            </select>
            <label htmlFor="interval-days">Days:</label>
            <select className="interval-days" name="days" value={interval.days} onChange={(event) => handleInterval(event, order)}>
                {dayOptionElements}
            </select>
        </div>
    )
}

export default TurnInput;