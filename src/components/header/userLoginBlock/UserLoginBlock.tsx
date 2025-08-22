import styles from "./UserLoginBlock.module.css";
import {useSelector} from "react-redux";
import type {RootState} from "../../../app/store.ts";
import {useNavigate} from "react-router-dom";
import {ROUTES} from "../../../constants.ts";
import favorite from "../../../assets/favorite.png";
import messages from "../../../assets/messages.png";

const UserLoginBlock = () => {
    const isLogin = useSelector((state: RootState) => state.auth.isLogin);
    const currentUser = useSelector((state: RootState) => state.auth.currentUser);
    const navigate = useNavigate();

    if (!isLogin) {
        return (
            <div className={styles.wrapper}>
                <button className={styles.loginBtn} onClick={() => navigate(ROUTES.LOGIN)}>
                    Login
                </button>
            </div>
        );
    }

    return (
        <div className={styles.wrapper}>
            <img src={favorite} alt="Favorites" className={styles.iconStar} onClick={() => navigate(ROUTES.FAVORITES)}/>
            <img src={messages} alt="Messages" className={styles.iconMessage} onClick={() => navigate(ROUTES.MESSAGES)}/>
            <button
                className={styles.userNameButton}
                onClick={() => navigate(ROUTES.MY_DASHBOARD)}
            >
                {currentUser?.name}
            </button>
        </div>
    );
};

export default UserLoginBlock;