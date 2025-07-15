import { Router, Request, Response } from "express";
import { Comment } from "../types/Comment";
import { mockComments as comments } from "../data/mockComments";
import {findCommentById, generateCommentId} from "../utils/commentsUtils";

const commentsRouter = Router();

// Get comments
commentsRouter.get("/", (req: Request, res: Response<Comment[]>) => {
  res.status(200).json(comments);
});

// Get comments by id
commentsRouter.get("/:id", (req: Request, res: Response<Comment | { error: string }>) => {
  const comment = findCommentById(req.params.id);
  if (!comment) {
    return res.status(404).json({ error: "Comment not found" });
  }
  res.status(200).json(comment);
});

// Get book comments
commentsRouter.get("/book/:bookId", (req: Request, res: Response<Comment[]>) => {
  const bookComments = comments.filter(c => c.bookId === req.params.bookId);
  res.status(200).json(bookComments);
});

// Add comment
commentsRouter.post(
  "/",
  (
    req: Request<{}, {}, { bookId: string; authorId: string; text: string; replyToId?: string }>,
    res: Response<Comment | { error: string }>
  ) => {
    const { bookId, authorId, text, replyToId } = req.body;
    const trimmedText = text?.trim();

    if (!bookId || !authorId || !trimmedText) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const newComment: Comment = {
      id: generateCommentId(),
      bookId,
      authorId,
      text: trimmedText,
      createdAt: new Date().toISOString(),
      likesCount: 0,
      ...(replyToId && { replyToId }),
    };

    comments.push(newComment);
    res.status(201).json(newComment);
  }
);

// Delete comment
commentsRouter.delete("/:id", (req: Request, res: Response<{ message: string } | { error: string }>) => {
  const index = comments.findIndex(c => c.id === req.params.id);
  if (index === -1) {
    return res.status(404).json({ error: "Comment not found" });
  }

  comments.splice(index, 1);
  res.status(200).json({ message: "Comment deleted" });
});

export default commentsRouter;