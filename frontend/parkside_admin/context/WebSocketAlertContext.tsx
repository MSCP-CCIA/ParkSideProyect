import React, { createContext, useContext, useEffect, useState, useRef } from "react";
import GlobalWebSocketAlert from "../components/common/GlobalWebSocketAlert";

interface WebSocketAlertContextType {
    // vacío por ahora
}

const WebSocketAlertContext = createContext<WebSocketAlertContextType>({});

export const WebSocketAlertProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [visible, setVisible] = useState(false);
    const [message, setMessage] = useState("");
    const ws = useRef<WebSocket | null>(null);

    useEffect(() => {
        ws.current = new WebSocket("ws://localhost:8001/ws/alerts");

        ws.current.onopen = () => {
            console.log("📡 WebSocket conectado");
        };

        ws.current.onmessage = (event) => {
            console.log("Mensaje recibido:", event.data);
            setMessage(event.data);
            setVisible(true);
        };

        ws.current.onerror = (error) => {
            console.error("WebSocket error", error);
        };

        ws.current.onclose = () => {
            console.log("🔌 WebSocket desconectado");
        };

        return () => {
            ws.current?.close();
        };
    }, []);

    return (
        <WebSocketAlertContext.Provider value={{}}>
            {children}
            <GlobalWebSocketAlert visible={visible} message={message} onClose={() => setVisible(false)} />
        </WebSocketAlertContext.Provider>
    );
};

export const useWebSocketAlertContext = () => useContext(WebSocketAlertContext);
