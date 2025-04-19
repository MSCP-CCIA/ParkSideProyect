import React from 'react';

interface ButtonProps {
    title: string;
    onClick: () => void;
    disabled?: boolean;
    style?: string;
}

const Button: React.FC<ButtonProps> = ({ title, onClick, disabled = false, style }) => {
    return (
        <button
            onClick={onClick}
            disabled={disabled}
            className={`w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition ${style} ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
        >
            {title}
        </button>
    );
};

export default Button;