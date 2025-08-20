import {useEffect, useState, useRef} from "react";
import type {AppDispatch, RootState} from "../../app/store.ts";
import {useDispatch, useSelector} from "react-redux";
import {addCommentThunk, getBookCommentsThunk} from "../../features/comments/commentsThunks.ts";
import MessageUniCard from "../messageUniCard/MessageUniCard.tsx";
import styles from "./BookComments.module.css";
import type {CommentInput} from "../../types/UserComment.ts";
import type {User} from "../../types/User.ts";
import {getUserThunk} from "../../features/users/usersThunks.ts";

type BookCommentsProps = {
    bookId: string;
}

const BookComments = ({bookId}: BookCommentsProps) => {

    const dispatch = useDispatch<AppDispatch>();
    const comments = useSelector((state: RootState) => state.comments.items);
    const bookComments = comments.filter(comment => comment.bookId === bookId);
    const rootComments = bookComments.filter(comment => !comment.replyToId);

    const users = useSelector((state: RootState) => state.users.items);
    const currentUser = useSelector((state: RootState) => state.auth.currentUser);

    const [newCommentText, setNewCommentText] = useState<string>('');
    const [replyTo, setReplyTo] = useState<{ id: string, user?: User, text: string } | null>(null);
    const textareaRef = useRef<HTMLTextAreaElement>(null);

    useEffect(() => {
        dispatch(getBookCommentsThunk(bookId));
    }, [dispatch, bookId]);

    const addReply = (id: string) => {
        const comment = comments.find((comment) => comment.id === id);
        const userReplyId = comment?.authorId;
        const userReply = users.find(user => user.userId === userReplyId);
        if (userReplyId && !userReply) {
            dispatch(getUserThunk(userReplyId));
        }
        setReplyTo({id: id, user: userReply, text: comment?.text ?? ''});
        textareaRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
        textareaRef.current?.focus();
    };

    const removeReply = () => {
        setReplyTo(null);
    };

    const enterComment = () => {
        if (!newCommentText.trim() || !currentUser) return;
        const newComment: CommentInput = {
            bookId,
            authorId: currentUser.userId,
            text: newCommentText,
            replyToId: replyTo?.id
        };
        dispatch(addCommentThunk(newComment));
        setNewCommentText('');
        removeReply();
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            enterComment();
        }
    };

    return (
        <div>
            <div className={styles.commentsContainer}>
                {rootComments.map(comment => (
                    <MessageUniCard key={comment.id} message={comment}
                                    allReplies={bookComments.filter(c => c.replyToId === comment.id)}
                                    onReply={addReply}/>
                ))}
            </div>
            {currentUser &&
                <div className={styles.commentInputContainer}>
                {replyTo && (
                    <div className={styles.replyInfo}>
                        <div className={styles.replyLabel}>
                            <span>You replied to {replyTo.user?.name ?? ''}</span>
                            <span className={styles.removeReplyButton} onClick={removeReply}> x </span>
                        </div>
                        <div className={styles.replyText}>
                            {replyTo.text}
                        </div>
                    </div>
                )}
                <textarea
                    ref={textareaRef}
                    className={styles.commentTextarea}
                    onChange={(e) => setNewCommentText(e.target.value)}
                    value={newCommentText}
                    onKeyDown={handleKeyDown}
                    placeholder="Write a comment..."
                />
            </div>}
        </div>
    );

};

export default BookComments;
