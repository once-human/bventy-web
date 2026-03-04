import { api } from "../api";

export interface Conversation {
    id: string;
    quote_id: string;
    vendor_id: string;
    organizer_user_id: string;
    chat_locked: boolean;
    last_message_at: string;
    created_at: string;
    event_title: string;
    vendor_name: string;
    organizer_name: string | null;
    unread_count: number;
    quote_status?: "pending" | "responded" | "accepted" | "rejected" | "revision_requested" | "archived";
}

export interface ChatMessage {
    id: string;
    sender_user_id: string;
    sender_name: string | null;
    message_type: 'text' | 'attachment' | 'system' | 'quote_card' | 'status_update' | 'quote_response' | 'quote_accepted' | 'quote_rejected' | 'quote_revision_requested';
    body: string | null;
    attachment_url: string | null;
    attachment_type: string | null;
    system_payload: Record<string, any> | null;
    created_at: string;
    edited_at: string | null;
    deleted_at: string | null;
    is_read: boolean;
}

export interface SendMessagePayload {
    message_type: 'text' | 'attachment';
    body?: string;
    attachment_url?: string;
    attachment_type?: string;
}

export const messagingService = {
    // Get all conversations for the user
    getConversations: async (): Promise<Conversation[]> => {
        const response = await api.get('/conversations');
        return response.data;
    },

    // Get messages for a specific conversation
    getMessages: async (conversationId: string): Promise<ChatMessage[]> => {
        const response = await api.get(`/conversations/${conversationId}/messages`);
        return response.data;
    },

    // Send a message
    sendMessage: async (conversationId: string, payload: SendMessagePayload): Promise<any> => {
        const response = await api.post(`/conversations/${conversationId}/messages`, payload);
        return response.data;
    },

    // Mark messages in a conversation as read
    markAsRead: async (conversationId: string): Promise<void> => {
        await api.patch(`/conversations/${conversationId}/read`);
    }
};
