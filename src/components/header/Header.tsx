import styles from './Header.module.css';
import Logo from './Logo';
import HeaderSearchInput from './HeaderSearchInput';
import UserLoginBlock from "./userLoginBlock/UserLoginBlock.tsx";

const Header = () => {
    return (
        <div className={styles.header}>
            <div className={styles.logoContainer}><Logo/></div>
            <div className={styles.searchContainer}><HeaderSearchInput/></div>
            <div className={styles.loginBlock}><UserLoginBlock/></div>
        </div>
    );
};

export default Header;