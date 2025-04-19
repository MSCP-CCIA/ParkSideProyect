import React from 'react';
import Sidebar from './Sidebar';

interface WebLayoutProps {
    children: React.ReactNode;
}

const WebLayout: React.FC<WebLayoutProps> = ({ children }) => {
    return (
        <div className="flex min-h-screen bg-blue-50">
            <Sidebar />
            <main className="flex-1 p-6 overflow-y-auto">{children}</main>
        </div>
    );
};

export default WebLayout;