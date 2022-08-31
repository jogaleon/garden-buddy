import {nanoid} from 'nanoid';
import {Temporal} from '@js-temporal/polyfill';
import {createContext, useState, useEffect} from 'react';


const CompostContext = createContext();

const MAX_TURNS = 8;
const DEFAULT_DAY = 0;
const DEFAULT_WEEK = 1;

export function CompostProvider({children}) {
    const currentDate = Temporal.Now.plainDateISO();
    const [piles, setPiles] = useState(JSON.parse(localStorage.getItem('compost_buddy-piles')) || []);
    const [turns, setTurns] = useState(createNewTurns());
    const [editId, setEditId] = useState(null);
    
    useEffect(() => {
        localStorage.setItem('compost_buddy-piles', JSON.stringify(piles));
    },[piles]) 

    function toggleTurn(id, order) {
        const pileTurns = piles.find(pile => pile.id === id).turns;
        if (!checkValidTurnToggle(pileTurns, order)) return;

        setPiles(prevPiles => prevPiles.map(pile => {
            return pile.id === id ?
                {
                    ...pile,
                    turns: pile.turns.map(turn => {
                        return turn.order === order ? {...turn, isTurned: !turn.isTurned} : turn;  
                    })
                }
            : pile
        }))
    }

    function checkValidTurnToggle(turns, order) {
        //returns true if valid, false if invalid
        //Edge cases
        if (order === 1 && turns[order].isTurned === true) return false;
        if (order === turns.length && turns[order - 2].isTurned === false) return false;
        
       //Main case
        if (order < turns.length && order > 1) {
            if (turns[order - 2].isTurned === false || turns[order].isTurned === true) return false;
        } 

        return true;
    }

    function handleInterval(event, order) {
        setTurns(prevTurns => {
            const protoTurns = prevTurns.map(turn => {
                return turn.order === order ?
                    {...turn, interval: {...turn.interval, [event.target.name]: parseInt(event.target.value)}} : turn;
                })
            return generateTurnDueDates(protoTurns, currentDate);
        })
    }

    function createNewTurns() {
        const newProtoTurns = [...Array(MAX_TURNS)].map((turn, index) => {
            return {
                order: index + 1,
                dateDue: '',
                interval: {days: DEFAULT_DAY, weeks: DEFAULT_WEEK},
                isTurned: false
            }
        })
        return generateTurnDueDates(newProtoTurns, currentDate)
    }

    function generateTurnDueDates(turns, startDate) {
        let date = startDate;

        return turns.map(turn => {
            let intervalInDays = Object.keys(turn.interval).reduce((days, key) => key === "weeks" ? (turn.interval[key] * 7) + days : turn.interval[key] + days, 0)
            date = date.add({days: intervalInDays})
            return {...turn, dateDue: date.toString()}
        })
    }

    function createPile(pileName, turnsLength) {
        setPiles(prevPiles => {
            return [
                {
                    id: nanoid(),
                    name: pileName,
                    dateCreated: Temporal.Now.plainDateISO(),
                    turns: turns.slice(0, turnsLength),
                    isCompleted: false,
                },
                ...prevPiles,
            ]
        })

    }

    function handleEdit(id) {
        setEditId(id);
    }

    function deletePile(id) {
        setPiles(prevPiles => prevPiles.filter(pile => pile.id !== id));
    }

    return (
        <CompostContext.Provider value={{turns, piles, editId, handleEdit, createPile, deletePile, handleInterval, toggleTurn}}>{children}</CompostContext.Provider>
    )
}

export default CompostContext;