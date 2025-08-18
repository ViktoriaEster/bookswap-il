import styles from "./userBlock.module.css";
import {useDispatch, useSelector} from "react-redux";
import type {AppDispatch, RootState} from "../../app/store.ts";
import {useNavigate} from "react-router-dom";
import {ROUTES} from "../../constants.ts";
import {logout} from "../../features/authorization/authSlice.ts";
import logoOutIcon from "../../assets/logoutIcon.png";



const UserBlock = () => {

    const isLogin = useSelector((state: RootState) => state.auth.isLogin);
    const currentUser = useSelector((state: RootState) => state.auth.currentUser);
    const dispatch = useDispatch<AppDispatch>();

    const handleLogout = () => {
        dispatch(logout());
    };

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
            <div className={styles.userName}>{currentUser?.name}</div>
            <button className={styles.loginBtn}>My books</button>
            <img
                className={styles.logoImg}
                src={logoOutIcon}
                alt="logout"
                onClick={handleLogout}
            />
        </div>
    );
};

export default UserBlock;
