import {useContext, useState, useEffect} from 'react';
import {nanoid} from 'nanoid';
import {Temporal} from'@js-temporal/polyfill';

import CompostContext from './CompostContext';
import ModalContext from '../ModalContext';
import TurnInput from './editor/TurnInput';

import iconClose from '../../pictures/icons/close.png';

const MAX_TURNS = 8;
const DEFAULT_TURN = 4;
const DEFAULT_DAY = 0;
const DEFAULT_WEEK = 1;

const currentDate = Temporal.Now.plainDateISO();

function CompostEditor() {
    const {turns, piles, editId, handleEdit, createPile} = useContext(CompostContext);
    const {closeModal} = useContext(ModalContext);
    const [turnNum, setTurnNum] = useState(`${DEFAULT_TURN}`);
    const [pileName, setPileName] = useState('');
    
    const [editorPile, setEditorPile] = useState(editId ? piles.find(pile => pile.id === editId) : createDefaultPile());
    const [editorTurns, setEditorTurns] = useState(fillTurns(editorPile));
    function createDefaultPile() {
        return {
            id: nanoid(),
            name: `Pile`,
            dateCreated: Temporal.Now.plainDateISO(),
            turns: [],
            isCompleted: false,
        }
    }

    useEffect(() => {
        setPileName(`Pile ${piles.length + 1}`);
    }, [piles])

    function fillTurns(pile) {
        // console.log(pile)
        // console.log(pile.turns)
        const addLength = MAX_TURNS - pile.turns.length;
        let newTurns = [...Array(addLength)].map((turn, index) => {
            return {
                order: (pile.turns.length  + 1) + index,
                dateDue: '',
                interval: {days: DEFAULT_DAY, weeks: DEFAULT_WEEK},
                isTurned: false
            }
        })
        return generateTurnDueDates([...pile.turns, ...newTurns], pile.dateCreated)
    }

    function generateTurnDueDates(turns, startDate) {
        let date = startDate;

        return turns.map(turn => {
            let intervalInDays = Object.keys(turn.interval).reduce((days, key) => key === "weeks" ? (turn.interval[key] * 7) + days : turn.interval[key] + days, 0)
            date = date.add({days: intervalInDays})
            return {...turn, dateDue: date.toString()}
        })
    }

    function handleTurnNum(e) {
        setTurnNum(e.target.value);
    }

    function isChecked(value) {
        return turnNum === value;
    }

    function handlePileName(e) {
        setPileName(e.target.value);
    }

    const turnRadioElements = turns.map(radio => {
        const i = radio.order;
        return (
            <span key={nanoid()}>
                <input
                    type="radio"
                    name="turns"
                    id={`turn${i}`}
                    checked={isChecked(`${i}`)}
                    value={`${i}`}
                    onChange={handleTurnNum}
                />
                <label htmlFor={`turn${i}`}>{i}</label>
            </span> 
        )
    })

    const turnInputElements = turns.slice(0, turnNum).map(turn => {
        return (
            <TurnInput 
                key={nanoid()}
                turn={turn}
            />
        )
    });

    return (
            <div className="compostEditor">
                <div className="compostEditor-header">
                    <h3 className="compostEditor-title">Compost Creator</h3>
                    <img 
                        className="compostEditor-close button" 
                        onClick={() => {
                            handleEdit(null);
                            closeModal()
                        }}
                        src={iconClose} 
                        alt="close icon" 
                    />
                </div>
                <label htmlFor="nameInput">Pile Name: </label>
                <input name="nameInput" type="text" value={pileName} onChange={handlePileName} />
                <div className="turnRadio-box">
                    <span className="bold">Turns: </span>
                    {turnRadioElements}
                </div>
                <div className="turnInput-box">
                    {turnInputElements}
                </div>
                <button 
                    onClick={() => {
                        createPile(pileName, turnNum);
                        closeModal();
                    }}
                >
                    Create Pile
                </button>
            </div>
    ) 
}

export default CompostEditor;