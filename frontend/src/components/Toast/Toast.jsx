import { useEffect } from 'react';
import PropTypes from 'prop-types';
import './Toast.css';

const Toast = ({ message, show, onClose, type = 'success' }) => {
    useEffect(() => {
        if (show) {
            const timer = setTimeout(() => {
                onClose();
            }, 3000);
            return () => clearTimeout(timer);
        }
    }, [show, onClose]);

    if (!show) return null;

    const bgColor = type === 'success' ? 'bg-green-500' : 'bg-red-500';
    const icon = type === 'success' ? '✓' : '✕';

    return (
        <div className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50">
            <div 
                className={`
                    ${bgColor} 
                    text-white 
                    px-6 
                    py-3 
                    rounded-lg 
                    shadow-lg 
                    flex 
                    items-center 
                    space-x-2 
                    min-w-[300px]
                    max-w-md
                    animate-slide-down
                    backdrop-blur-sm
                    bg-opacity-90
                `}
            >
                <span className="text-lg font-bold">{icon}</span>
                <p className="text-sm font-medium flex-1">{message}</p>
                <button 
                    onClick={onClose}
                    className="text-white hover:text-gray-200 focus:outline-none"
                >
                    ×
                </button>
            </div>
        </div>
    );
};

Toast.propTypes = {
    message: PropTypes.string.isRequired,
    show: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    type: PropTypes.oneOf(['success', 'error'])
};

export default Toast; 