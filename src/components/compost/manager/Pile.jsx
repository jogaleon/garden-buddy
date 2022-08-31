import {nanoid} from 'nanoid';
import {useContext} from 'react';
import CompostContext from '../CompostContext';
import ModalContext from '../../ModalContext';
import Turn from './Turn';

import iconCompost from '../../../pictures/icons/compost.png';
import buttonClose from '../../../pictures/icons/close.png';
import buttonEdit from '../../../pictures/icons/edit.png';

function Pile(props) {
    const {id, name, dateCreated, turns} = props.pile;
    const {handleEdit, deletePile} = useContext(CompostContext);
    const {openModal} = useContext(ModalContext);
    const turnElements = turns.map(turn => <Turn key={nanoid()} pileId={id} turn={turn} />);
    return (
        <div className="pile">
            <p className="pile-title">
                <img className="pile-icon" src={iconCompost} alt="compost icon" />
                <span className="pile-name">{name}</span>
            </p>
            <p className="pile-dateCreated">
                <span>Date Created: </span> <br />
                <span>{dateCreated.toString()}</span>
            </p>
            <div className="turns">
                {turnElements}
            </div>
            <div className="pile-controls">
                <img 
                    className="pile-button button" 
                    src={buttonEdit} 
                    onClick={() => {
                        handleEdit(id);
                        openModal();
                    }} 
                    alt="close icon" 
                />
                <img className="pile-button button" src={buttonClose} onClick={() => deletePile(id)} alt="close icon" />
            </div>
        </div>
    )
}

export default Pile;