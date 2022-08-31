import {createContext, useState} from 'react';

const ModalContext = createContext();

export function ModalProvider({children}) {
    const [isModalOpen, setIsModalOpen] = useState(false);

    function openModal() {
        setIsModalOpen(true);
    }

    function closeModal() {
        setIsModalOpen(false)
    }

    return (
        <ModalContext.Provider value={{isModalOpen, openModal, closeModal}}>{children}</ModalContext.Provider>
    )
}

export default ModalContext;