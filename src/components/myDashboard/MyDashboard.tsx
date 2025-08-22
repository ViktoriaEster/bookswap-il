import styles from "./MyDashboard.module.css";
import {useSelector} from "react-redux";
import type {RootState} from "../../app/store.ts";
import {useNavigate} from "react-router-dom";
import {ROUTES} from "../../constants.ts";
import CurrentUserCard from "./currentUserCard/CurrentUserCard.tsx";
import MyBooks from "./myBooks/MyBooks.tsx";
import FavoriteBooks from "../favoriteBooks/FavoriteBooks.tsx";

const MyDashboard = () => {

    const {isLogin, currentUser} = useSelector((state: RootState) => state.auth);
    const navigate = useNavigate();

    if (!isLogin || !currentUser) {
        navigate(ROUTES.LOGIN);
    }


    return (
        isLogin && currentUser && (
                <div className={styles.myDashboardContent}>
                    <div className={styles.profileSection}>
                        <CurrentUserCard currentUser={currentUser}/>
                    </div>
                    <div className={styles.favoritesSection}>
                        <FavoriteBooks userId={currentUser.userId}/>
                    </div>
                    <div className={styles.myBooksContainer}>
                        <MyBooks currentUser={currentUser}/>
                    </div>
                </div>

        )
    );
};

export default MyDashboard;
