import styles from './Header.module.css';
import Logo from './Logo';
import HeaderSearchInput from './HeaderSearchInput';
import UserBlock from "../userBlock/UserBlock.tsx";

const Header = () => {
    return (
        <div className={styles.header}>
            <div className={styles.logoContainer}><Logo/></div>
            <div className={styles.searchContainer}><HeaderSearchInput/></div>
            <div className={styles.loginBlock}><UserBlock/></div>
        </div>
    );
};

export default Header;