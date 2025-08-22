import styles from "./CurrentUserCard.module.css";
import type {PrivateUser} from "../../types/User.ts";
import type {AppDispatch} from "../../app/store.ts";
import {useDispatch} from "react-redux";
import {logout} from "../../features/authorization/authSlice.ts";
import man from "../../assets/man.png";
import woman from "../../assets/woman.png";
import male from "../../assets/male.png";
import female from "../../assets/female.png";
import {useNavigate} from "react-router-dom";
import {ROUTES} from "../../constants.ts";

type CurrentUserProps = {
    currentUser: PrivateUser
}

const CurrentUserCard = ({currentUser}: CurrentUserProps) => {
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();

    const handleLogout = () => {
        dispatch(logout());
    };

    const handleEditProfile = () => {
        navigate(ROUTES.PROFILE_EDITOR);
    };

    const avatarSrc = currentUser.avatarUrl
        ? currentUser.avatarUrl
        : currentUser.sex === "male" ? man : woman;

    const formattedBirthDate = currentUser.birthDate
        ? new Date(currentUser.birthDate).toLocaleDateString()
        : "";
    const formattedCreatedAt = currentUser.createdAt
        ? new Date(currentUser.createdAt).toLocaleDateString()
        : "";

    return (
        <div className={styles.currentUserCardContainer}>
            <div className={styles.avatarBlock}>
                <img src={avatarSrc} alt="User avatar" className={styles.avatar}/>
                <div className={styles.infoBlock}>
                    <div className={styles.userInfoTop}>
                        <div className={styles.userName}>{currentUser.name}</div>
                        <div className={styles.userDetail}>
                            <strong>Birth date:</strong> {formattedBirthDate}
                            <img
                                src={currentUser.sex === "male" ? male : female}
                                alt={currentUser.sex}
                                className={styles.sexIcon}
                            />
                        </div>
                        <div><strong>Telegram:</strong> {currentUser.telegram}</div>
                        <div><strong>Email:</strong> {currentUser.email}</div>
                        <div><strong>Joined:</strong> {formattedCreatedAt}</div>
                    </div>
                </div>
            </div>
            <div className={styles.bottomRow}>
                <div className={styles.aboutBlock}>
                    <div>About me:</div>
                    <div>{currentUser.aboutMe || "No description provided."}</div>
                </div>
                <div className={styles.buttonBlock}>
                    <button className={styles.editBtn} onClick={handleEditProfile}>Edit profile</button>
                    <button className={styles.logoutBtn} onClick={handleLogout}>Logout</button>
                </div>
            </div>
        </div>
    );
};

export default CurrentUserCard;