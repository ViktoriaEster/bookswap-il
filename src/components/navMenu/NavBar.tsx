import {NavLink} from "react-router-dom";
import {ROUTES} from "../../constants.ts";
import styles from "./NavBar.module.css"

const NavBar = () => {
    return (
        <nav className={styles.navBarContainer}>
            <NavLink to={ROUTES.HOME} className={({isActive}) => isActive ? styles.activeLink : ""}>
                <button>Home</button>
            </NavLink>

            <NavLink to={ROUTES.GENRES} className={({isActive}) => isActive ? styles.activeLink : ""}>
                <button>Genres</button>
            </NavLink>

            <NavLink to={ROUTES.AUTHORS} className={({isActive}) =>
                isActive ? styles.activeLink : ""}>
                <button>Authors</button>
            </NavLink>

            <NavLink to={ROUTES.CITIES} className={({isActive}) => isActive ? styles.activeLink : ""}>
                <button>Cities</button>
            </NavLink>

        </nav>
    );
};

export default NavBar;
