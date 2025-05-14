import React, { useEffect } from 'react';
import PropTypes from 'prop-types';

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

    return (
        <div className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50">
            <div className={`${bgColor} text-white px-6 py-3 rounded-lg shadow-lg flex items-center space-x-2 animate-slide-down`}>
                <span className="text-lg">
                    {type === 'success' ? '✓' : '✕'}
                </span>
                <p className="text-sm font-medium">{message}</p>
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