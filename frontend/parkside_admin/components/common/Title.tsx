import React from 'react';

interface TitleProps {
    text: string;
}

const Title: React.FC<TitleProps> = ({ text }) => (
    <h1 className="text-3xl font-bold text-center text-blue-700 mb-6">{text}</h1>
);

export default Title;