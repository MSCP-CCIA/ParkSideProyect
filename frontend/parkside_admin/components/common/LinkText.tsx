import React from 'react';

interface LinkTextProps {
    text: string;
    onClick: () => void;
    style?: string;
}

const LinkText: React.FC<LinkTextProps> = ({ text, onClick, style }) => (
    <p
        className={`text-sm text-blue-600 hover:underline cursor-pointer text-center mt-2 ${style}`}
        onClick={onClick}
    >
        {text}
    </p>
);

export default LinkText;