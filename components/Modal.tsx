
import React, { ReactNode } from 'react';
import { XIcon } from './icons/Icons';

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    children: ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
    if (!isOpen) return null;

    return (
        <div 
            className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-4"
            onClick={onClose}
        >
            <div 
                className="bg-base-100 rounded-lg shadow-2xl p-6 w-full max-w-md relative"
                onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside modal
            >
                <button 
                    onClick={onClose} 
                    className="absolute top-3 right-3 text-gray-400 hover:text-white transition-colors"
                >
                    <XIcon className="w-6 h-6" />
                </button>
                {children}
            </div>
        </div>
    );
};

export default Modal;
