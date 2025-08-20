import styles from "./MyDashboard.module.css";
import {useSelector} from "react-redux";
import type {RootState} from "../../app/store.ts";
import {useNavigate} from "react-router-dom";
import {ROUTES} from "../../constants.ts";
import CurrentUser from "./currentUser/CurrentUser.tsx";
import MyBooks from "./myBooks/MyBooks.tsx";
import FavoriteBooks from "../favoriteBooks/FavoriteBooks.tsx";
import MyMessagesList from "../myMessages/MyMessagesList.tsx";

const MyDashboard = () => {

    const {isLogin, currentUser} = useSelector((state: RootState) => state.auth);
    const navigate = useNavigate();


    if (!isLogin || !currentUser) {
        navigate(ROUTES.LOGIN);
    }
    return (
        isLogin && currentUser && (
            <div className={styles.myBooksPageContainer}>
                <div className={styles.messagesColumn}>
                    <MyMessagesList currentUser={currentUser}/>
                </div>
                <div className={styles.contentColumn}>
                    <CurrentUser currentUser={currentUser}/>
                    <MyBooks currentUser={currentUser}/>
                    <FavoriteBooks userId={currentUser.userId}/>
                </div>
            </div>
        )
    );
};

export default MyDashboard;
