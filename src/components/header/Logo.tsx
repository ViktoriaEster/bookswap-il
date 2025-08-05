import logo from "../../assets/books.png"
import styles from './Header.module.css';

const Logo = () => {
    return (
        <div className={styles.logoContainer}>
            <img className={styles.logoImg} src={logo} alt="logo" />
            <span className={styles.logoText}>Bookswap</span>
        </div>
    )
};

export default Logo;
