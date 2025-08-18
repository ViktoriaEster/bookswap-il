import {useState} from "react";
import {useNavigate} from "react-router-dom";
import {ROUTES} from "../../constants.ts";
import styles from './Header.module.css';

const HeaderSearchInput = () => {

    const [searchKeyWords, setSearchKeyWords] = useState('');
    const navigate = useNavigate();

    const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!searchKeyWords.trim()) return;
        const searchParam = `?q=${encodeURIComponent(searchKeyWords.trim())}`;
        navigate(ROUTES.SEARCH + searchParam);
        setSearchKeyWords('');
    };

    return (
        <form className={styles.searchForm} onSubmit={handleSearch}>
            <input className={styles.searchInput}
                type="text"
                placeholder="Search books"
                value={searchKeyWords}
                onChange={(e) => setSearchKeyWords(e.target.value)}
            />
        </form>
    );
};

export default HeaderSearchInput;
