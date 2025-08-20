import {Router, Request, Response} from "express";
import {Comment} from "../types/Comment";
import {mockComments as comments} from "../data/mockComments";
import {findCommentById, generateCommentId} from "../utils/commentsUtils";
import {AuthenticatedRequest} from "../types/express/AuthRequest";

const commentsRouter = Router();

// Get comments
commentsRouter.get("/", (req: Request, res: Response<Comment[]>) => {
    res.status(200).json(comments);
});

// Get comments by id
commentsRouter.get("/:id", (req: Request, res: Response<Comment | { error: string }>) => {
    const comment = findCommentById(req.params.id);
    if (!comment) {
        return res.status(404).json({error: "MessageUniCard not found"});
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
        req: AuthenticatedRequest,
        res: Response<Comment | { error: string }>
    ) => {
        const {bookId, authorId, text, replyToId} = req.body;
        const trimmedText = text?.trim();

        if (!bookId || !authorId || !trimmedText) {
            return res.status(400).json({error: "Missing required fields"});
        }

        const newComment: Comment = {
            id: generateCommentId(),
            bookId: bookId,
            authorId: authorId,
            text: trimmedText,
            createdAt: new Date().toISOString(),
            likes: [],
            ...(replyToId && {replyToId}),};

        comments.push(newComment);
        res.status(201).json(newComment);
    }
);

// Toggle like comment
commentsRouter.patch("/like", (req: AuthenticatedRequest, res: Response<Comment | { error: string }>) => {
    const commentId: string = req.body.id;
    const userId: string = req.body.userId;
    const index = comments.findIndex(c => c.id === commentId);
    if (index === -1) {
        return res.status(404).json({error: "Comment not found"});
    }
    const userLikeIndex = comments[index].likes.indexOf(userId);
    if (userLikeIndex !== -1) {
        comments[index].likes.splice(userLikeIndex, 1);
    } else {
        comments[index].likes.push(userId);
    }
    res.status(200).json(comments[index]);
});

// Delete comment
commentsRouter.delete("/:id", (req: AuthenticatedRequest, res: Response<{ message: string } | { error: string }>) => {
    const commentId = req.params.id;
    const index = comments.findIndex(c => c.id === commentId);
    if (index === -1) {
        return res.status(404).json({error: "Comment not found"});
    }
    comments.splice(index, 1);
    res.status(200).json({message: `Comment id:${commentId} deleted`});
});

export default commentsRouter;