import BookCard from "../bookCard/BookCard.tsx";
import {useSelector} from "react-redux";
import type {RootState} from "../../app/store.ts";
import type {User} from "../../types/User.ts";
import styles from "./Post.module.css"

type PostProps = {
    id: string;
    userId: string;
    date: string;
}

const Post = ({id, userId, date}:PostProps) => {

    const users: User [] = useSelector((state: RootState) => state.users.items);
    const user: User | undefined = users.find((user) => user.userId === userId);

    return (
        <div className={styles.postContainer}>
            <div className={styles.postHeader}>
                <span className={styles.userName}>{user?.name || 'Unknown User'}</span>
                <span className={styles.actionText}>added a new book</span>
                <span className={styles.postDate}>
        {new Date(date).toLocaleDateString()}
      </span>
            </div>
            <div className={styles.postContent}>
                <BookCard id={id} />
            </div>
        </div>
    );
};

export default Post;
