export type Comment = {
    id: string;
    bookId: string;
    authorId: string;
    text: string;
    createdAt: string;
    replyToId?: string;
    likesCount: number;
};

export type CommentInput = {
    bookId: string;
    authorId: string;
    text: string;
    replyToId?: string
};