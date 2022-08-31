import './Modal.css';

function Modal({children}) {
    return (
        <div className="modalBackground">
            {children}
        </div>
    )
}

export default Modal;