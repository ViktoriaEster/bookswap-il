import type {UserComment} from "../../types/UserComment.ts";
import {useDispatch, useSelector} from "react-redux";
import type {AppDispatch, RootState} from "../../app/store.ts";
import {useEffect} from "react";
import {getUserThunk} from "../../features/users/usersThunks.ts";
import styles from "./MessageUniCard.module.css";
import {toggleLikeCommentThunk} from "../../features/comments/commentsThunks.ts";
import type {UniMessage} from "../../types/UniMessage.ts";
import type {UserMessage} from "../../types/UserMessage.ts";

type MessageUniCardProps = {
    message: UserComment | UserMessage | UniMessage;
    allReplies: UserComment[] | UserMessage[];
    onReply?: (id: string) => void;
    indentLevel?: number;
}

const MessageUniCard = (props: MessageUniCardProps) => {
    const { message: origMessage, allReplies, onReply, indentLevel = 0 } = props;
    // Convert allReplies to UniMessage[]
    const replies: UniMessage[] = allReplies.map(r => ({
        id: r.id,
        text: r.text,
        createdAt: r.createdAt,
        authorId: r.authorId,
        replyToId: r.replyToId ?? '',
        likes: r.likes,
    }));

    const message: UniMessage = {
        id: origMessage.id,
        text: origMessage.text,
        createdAt: origMessage.createdAt,
        authorId: origMessage.authorId,
        replyToId: origMessage.replyToId ?? '',
        likes: origMessage.likes,
    };

    const users = useSelector((state: RootState) => state.users.items);
    const user = users.find(user => user.userId === message.authorId);
    const currentUser = useSelector((state: RootState) => state.auth.currentUser);

    const dispatch = useDispatch<AppDispatch>();

    useEffect(() => {
        if (message.authorId && !user) {
            dispatch(getUserThunk(message.authorId));
        }
    }, [dispatch, message.authorId, user]);

    if (!currentUser || !user) return null;

    const userAuthorName = user.userId === currentUser.userId ? "You" : user.name;

    const directReplies = replies.filter(r => r.replyToId === message.id);

    const toggleLike = () => {
        dispatch(toggleLikeCommentThunk({id: message.id, userId: currentUser.userId}));
    };

    const hasLiked = message.likes.includes(currentUser.userId);

    return (
        <div className={styles.commentCard} style={{ marginLeft: Math.min(indentLevel, 3) * 24 }}>
            <div className={styles.header}>
                <span className={styles.author}>{userAuthorName}</span>
                <span className={styles.date}>{new Date(message.createdAt).toLocaleString()}</span>
            </div>
            <div className={styles.text}>{message.text}</div>
            <div className={styles.footer}>
                <span className={styles.likes} onClick={toggleLike}>{hasLiked ? '❤️' : '🤍'} {message.likes.length}</span>
                <button
                    className={styles.replyButton}
                    type="button"
                    onClick={() => onReply?.(origMessage.id)}>
                    Reply
                </button>
            </div>
            {directReplies.length > 0 && (
                <div className={styles.replies} style={{ paddingLeft: 16, marginTop: 8 }}>
                    {directReplies.map(reply => (
                        <MessageUniCard
                            key={reply.id}
                            message={reply}
                            allReplies={allReplies}
                            onReply={onReply}
                            indentLevel={indentLevel + 1}
                        />
                    ))}
                </div>
            )}
        </div>
    );
};

export default MessageUniCard;