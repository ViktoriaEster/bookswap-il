import styles from "../myDashboard/MyDashboard.module.css";
import type {PrivateUser} from "../../types/User.ts";


type MyMessagesListProps ={
    currentUser: PrivateUser;
};

const MyMessagesList = ({currentUser}: MyMessagesListProps) => {
    return (
        <div>
            <div>Messages {currentUser.name}</div>
            <div className={styles.messagesContainer}>messages small items</div>
        </div>
    );
};

export default MyMessagesList;
