import React from 'react';
interface SpinnerProps{
    visible: boolean
}
const LoadingSpinner: React.FC = () => {
    return (
        <div className="flex items-center justify-center py-6 bg-current">
            <div className="w-8 h-8 border-4 border-t-transparent border-indigo-600 rounded-full animate-spin" />
        </div>
    );
};

export default LoadingSpinner;
