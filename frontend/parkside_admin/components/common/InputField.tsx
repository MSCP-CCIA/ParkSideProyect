import React from 'react';

interface InputFieldProps {
    label: string;
    placeholder?: string;
    value: string;
    onChange: (text: string) => void;
    type?: string;
    errorMessage?: string;
}

const InputField: React.FC<InputFieldProps> = ({
                                                   label,
                                                   placeholder,
                                                   value,
                                                   onChange,
                                                   type = 'text',
                                                   errorMessage,
                                               }) => {
    return (
        <div className="mb-4">
            <label className="block text-gray-700 font-semibold mb-1">{label}</label>
            <input
                className="w-full px-4 py-2 border rounded focus:outline-none focus:ring focus:border-blue-300"
                placeholder={placeholder}
                type={type}
                value={value}
                onChange={(e) => onChange(e.target.value)}
            />
            {errorMessage && (
                <p className="text-red-500 text-sm mt-1">{errorMessage}</p>
            )}
        </div>
    );
};

export default InputField;