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

export function getWebSocketUrl(conversationId: string): string {
    // Determine base URL dynamically from API URL
    let wsBaseUrl = "ws://localhost:8082";

    // Check if there is an explicitly set WS URL
    if (process.env.NEXT_PUBLIC_WS_URL) {
        wsBaseUrl = process.env.NEXT_PUBLIC_WS_URL;
    } else if (process.env.NEXT_PUBLIC_API_URL) {
        // Derive from API URL, e.g., http://api.localhost:8082/api/v1 -> ws://api.localhost:8082
        try {
            const url = new URL(process.env.NEXT_PUBLIC_API_URL);
            url.protocol = url.protocol === 'https:' ? 'wss:' : 'ws:';
            wsBaseUrl = url.origin; // Drops the /api/v1 pathname
        } catch (e) {
            console.warn("Could not parse NEXT_PUBLIC_API_URL for WebSocket fallback");
        }
    }

    // fallback mapping if running on window directly without env vars (e.g. testing)
    if (typeof window !== "undefined" && !process.env.NEXT_PUBLIC_API_URL && !process.env.NEXT_PUBLIC_WS_URL) {
        if (window.location.hostname.includes("bventy.in")) {
            wsBaseUrl = window.location.protocol === "https:" ? "wss://api.bventy.in" : "ws://api.bventy.in";
        }
    }

    return `${wsBaseUrl}/ws/conversations/${conversationId}`;
}
