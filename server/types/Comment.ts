export type Comment = {
    id: string;
    bookId: string;
    authorId: string;
    text: string;
    createdAt: string;
    replyToId?: string;
    likes: string[];
};