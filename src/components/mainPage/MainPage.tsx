import {useSelector} from "react-redux";
import type {RootState} from "../../app/store.ts";
import type {Book} from "../../types/Book.ts";
import Post from "../post/Post.tsx";
import styles from "./MainPage.module.css";


const MainPage = () => {

    const books: Book [] = useSelector((state: RootState) => state.books.items);
    const booksForPosts = [...books].sort((a, b) => {
        return Date.parse(b.createdDate) - Date.parse(a.createdDate);
    }).splice(0, 19);

    return (
        <div className={styles.pageBackground}>
            <div className={styles.mainContainer}>
                <div className={styles.heroSection}>
                    <h3>BookSwap – Discover, Share, and Enjoy Books Together</h3>
                    <p>
                        BookSwap is a community-driven platform where book lovers can connect, share, and exchange their
                        favorite reads. Whether you want to give your books a second life, find that special edition you’ve been
                        searching for, or simply explore new titles, BookSwap makes it easy.
                    </p>
                    <p>
                        Browse through local listings, connect with other readers in your area, and arrange hassle-free book
                        swaps. Our mission is to make reading more accessible, sustainable, and social — because great stories
                        are meant to be shared.
                    </p>
                    <p>
                        Join BookSwap today and turn your bookshelf into a gateway for new adventures!
                    </p>
                </div>

                <div className={styles.postContainer}>
                    {booksForPosts.map((b: Book) => (
                        <Post
                            key={b.id}
                            id={b.id}
                            userId={b.ownerId}
                            date={b.createdDate}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default MainPage;
