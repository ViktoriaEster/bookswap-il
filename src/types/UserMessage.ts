export type UserMessage = {
    id: string;
    conversationId: string;
    authorId: string;
    text: string;
    createdAt: string;
    replyToId: string;
    likes: string[];
    isOpen: boolean;
};

export type MessageInput = {
    conversationId: string;
    authorId: string;
    text: string;
    createdAt: string;
    replyToId: string;
    likesCount?: number;
}

export type Conversation = {
    id: string;
    senderId: string;
    recipientId: string;
    lastMessageId?: string;
};