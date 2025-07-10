import { Comment } from "../types/Comment";

export const mockComments: Comment[] = [
  {
    id: "1",
    bookId: "1",
    authorId: "2",
    text: "Really enjoyed this one!",
    createdAt: "2025-07-10T08:00:00.000Z",
    likesCount: 3
  },
  {
    id: "2",
    bookId: "1",
    authorId: "4",
    text: "Not my favorite style, but well written.",
    createdAt: "2025-07-10T08:30:00.000Z",
    replyToId: "1",
    likesCount: 1
  },
  {
    id: "3",
    bookId: "2",
    authorId: "3",
    text: "Loved the plot twists!",
    createdAt: "2025-07-10T09:00:00.000Z",
    likesCount: 2
  }
];