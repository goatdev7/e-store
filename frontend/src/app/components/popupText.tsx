import React from 'react';

interface PopupTextProps {
    message: string;
    visible: boolean;
    onClose: () => void;
}

const PopupText: React.FC<PopupTextProps> = ({ message, visible, onClose }) => {
    if (!visible) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center z-50">
            {/* Semi-transparent backdrop */}
            <div className="absolute inset-0 bg-black bg-opacity-50"></div>

            {/* Popup container */}
            <div className="relative bg-white w-full max-w-md mx-4 p-6 rounded shadow-lg">
                <h2 className="text-xl font-semibold mb-4">Notification</h2>
                <p className="mb-4">{message}</p>
                <div className="flex justify-end">
                    <button
                        className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
                        onClick={onClose}
                    >
                        Close
                    </button>
                </div>
            </div>
        </div>
    );
};

export default PopupText;
