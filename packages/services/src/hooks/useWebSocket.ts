"use client";

import { useEffect, useRef, useState } from "react";
import { getWebSocketUrl, WebSocketEvent } from "../utils/websocket";

export function useWebSocket(conversationId: string | undefined) {
    const [isConnected, setIsConnected] = useState(false);
    const [lastMessage, setLastMessage] = useState<WebSocketEvent | null>(null);
    const wsRef = useRef<WebSocket | null>(null);

    useEffect(() => {
        if (!conversationId) return;

        const url = getWebSocketUrl(conversationId);
        const ws = new WebSocket(url);
        wsRef.current = ws;

        ws.onopen = () => {
            console.log(`[WebSocket] Connected to room: ${conversationId}`);
            setIsConnected(true);
        };

        ws.onmessage = (event) => {
            try {
                const data: WebSocketEvent = JSON.parse(event.data);
                setLastMessage(data);
            } catch (err) {
                console.error("[WebSocket] Failed to parse message event", err);
            }
        };

        ws.onclose = () => {
            console.log(`[WebSocket] Disconnected from room: ${conversationId}`);
            setIsConnected(false);
            wsRef.current = null;
        };

        ws.onerror = (err) => {
            console.error(`[WebSocket] Error in room: ${conversationId}`, err);
            setIsConnected(false);
        };

        return () => {
            if (ws.readyState === WebSocket.OPEN) {
                ws.close();
            }
        };
    }, [conversationId]);

    return {
        isConnected,
        lastMessage,
    };
}
