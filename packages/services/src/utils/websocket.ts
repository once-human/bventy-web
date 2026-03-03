export interface WebSocketEvent {
    type: string;
    conversation_id?: string;
    payload: any;
}

export interface UseWebSocketOptions {
    onOpen?: () => void;
    onClose?: () => void;
    onMessage?: (event: WebSocketEvent) => void;
    onError?: (error: Event) => void;
}

// In a real production setup, WS_URL should be defined in next.config or .env
// Defaults to the local bventy-backend address mapped to ws://
const WS_BASE_URL = process.env.NEXT_PUBLIC_WS_URL || "ws://localhost:8082";

export function getWebSocketUrl(conversationId: string): string {
    return `${WS_BASE_URL}/ws/conversations/${conversationId}`;
}
