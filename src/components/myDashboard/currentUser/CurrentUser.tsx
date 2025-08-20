import styles from "../MyDashboard.module.css";
import type {PrivateUser} from "../../../types/User.ts";
import type {AppDispatch} from "../../../app/store.ts";
import {useDispatch} from "react-redux";
import {logout} from "../../../features/authorization/authSlice.ts";

type CurrentUserProps = {
    currentUser: PrivateUser
}

const CurrentUser = ({currentUser}: CurrentUserProps) => {
    const dispatch = useDispatch<AppDispatch>();
    const handleLogout = () => {
        dispatch(logout());
    }

    return (
        <div>
            <div>avatar</div>
            <div>
                <div>{currentUser.name}</div>
                <div>{currentUser.email}</div>
            </div>
            <div className={styles.buttonBlock}>
                <button>edit</button>
                <button>archive</button>
                <button onClick={handleLogout}>logout</button>
            </div>
        </div>
    );
};

export default CurrentUser;
