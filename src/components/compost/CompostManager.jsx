import {nanoid} from 'nanoid';
import {useContext} from 'react';
import CompostContext from './CompostContext';
import ModalContext from '../ModalContext';

import CompostEditor from './CompostEditor';
import Pile from './manager/Pile';
import Modal from '../Modal';

import '../CompostManager.css';

function CompostManager() {
    const {piles} = useContext(CompostContext);
    const {isModalOpen, openModal} = useContext(ModalContext);

    const pilesElements = piles.map(pile => {
        return <Pile
            key={nanoid()}
            pile={pile}
        />
    })

    return (
        <div className="compostManager">
            <h2>Compost Manager</h2>
            <button onClick={() => {
                openModal();
            }}
            >
                Create Compost Pile
            </button>
            { isModalOpen &&
            <Modal>
                <CompostEditor />
            </Modal>
            }
            <div className="piles">
                {pilesElements}
            </div>
        </div>
    )
}

export default CompostManager;