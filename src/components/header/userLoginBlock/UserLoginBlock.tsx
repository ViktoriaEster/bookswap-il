import styles from "./UserLoginBlock.module.css";
import { useSelector} from "react-redux";
import type {RootState} from "../../../app/store.ts";
import {useNavigate} from "react-router-dom";
import {ROUTES} from "../../../constants.ts";

const UserLoginBlock = () => {

    const isLogin = useSelector((state: RootState) => state.auth.isLogin);
    const currentUser = useSelector((state: RootState) => state.auth.currentUser);

    const navigate = useNavigate();

    if (!isLogin) {
        return (
            <div>
                <button className={styles.loginBtn} onClick={() => navigate(ROUTES.LOGIN)}>Login</button>
            </div>
        );
    }

    return (
        <div className={styles.wrapper}>
            <button className={styles.userNameButton} onClick={() => navigate(ROUTES.MY_DASHBOARD)}>{currentUser?.name}</button>
        </div>
    );
};

export default UserLoginBlock;
