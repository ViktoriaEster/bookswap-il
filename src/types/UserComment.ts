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




