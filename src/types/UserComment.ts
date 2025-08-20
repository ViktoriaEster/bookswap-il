export type UserComment = {
    id: string;
    bookId: string;
    authorId: string;
    text: string;
    createdAt: string;
    replyToId?: string;
    likes: string[];
};

export type CommentInput = {
    bookId: string;
    authorId: string;
    text: string;
    replyToId?: string
};

export type UserMessage = {
    id: string;
    conversationId: string;
    authorId: string;
    text: string;
    createdAt: string;
    replyToId: string;
    likes: string[];
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

export type UniMessage = {
    id: string;
    text: string;
    createdAt: string;
    authorId: string;
    replyToId: string;
    likes: string[];
};
