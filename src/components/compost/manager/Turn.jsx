import {useContext} from 'react';
import {Temporal} from '@js-temporal/polyfill';
import CompostContext from '../CompostContext';

function Turn(props) {
    const {order, interval, dateDue, isTurned} = props.turn;
    const {pileId} = props;
    const {toggleTurn} = useContext(CompostContext);

    const dueMonthDay = Temporal.PlainMonthDay.from(dateDue).toString();

    const turnClass = `turn-order${isTurned ? " turn-on" : ""}`;

    return (
        <div className="turn" onClick={() => toggleTurn(pileId, order)}>
            <div className={turnClass}></div>
            <span className="turn-date">{dueMonthDay}</span>
        </div>
    )
}

export default Turn;