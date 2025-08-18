import type {Book} from "../../types/Book.ts";
import {useSelector} from "react-redux";
import type {RootState} from "../../app/store.ts";
import {useSearchParams} from "react-router-dom";
import type {Author} from "../../types/Author.ts";
import type {Genre} from "../../types/Genre.ts";
import type {City} from "../../types/City.ts";
import BookCardSmall from "../bookCardSmall/BookCardSmall.tsx";
import styles from "./SearchResultPage.module.css"


const SearchResultPage = () => {

    const books: Book[] = useSelector((state: RootState) => state.books.items);
    const authors: Author [] = useSelector((state: RootState) => state.authors.items);
    const genres: Genre[] = useSelector((state: RootState) => state.genres.items);
    const cities: City [] = useSelector((state: RootState) => state.cities.items);

    const [searchParams] = useSearchParams();
    const query = searchParams.get("q") || "";

    const filteredBooks = books.filter((b: Book) => {
        const bAuthors = authors.filter((author: Author) => b.authorIds.includes(author.id));
        const bGenre = genres.find((genre: Genre) => genre.id === b.genreId);
        const bCity = cities.find((ci: City) => ci.id === b.cityId);

        const lowerQuery = query.toLowerCase().trim();
        if (!lowerQuery) return false;

        return (
            b.title.toLowerCase().includes(lowerQuery) ||
            bAuthors.some(a => a.name.toLowerCase().includes(lowerQuery)) ||
            (bGenre && bGenre.name.toLowerCase().includes(lowerQuery)) ||
            (bCity && bCity.name.toLowerCase().includes(lowerQuery))
        );
    });


    return (
        <div className={styles.searchResultPageContainer}>
            <div className={styles.description}>
                {filteredBooks.length > 0 ?
                `Search results for: ${query}`:
                `Not books found for ${query}`}
            </div>
            <div className={(styles.searchResultBookCardsContainer)}>
                {filteredBooks.map((book: Book) => {
                        const bookAuthor = authors.filter((author: Author) => book.authorIds.includes(author.id));
                        const bookCity = cities.find((city: City) => city.id === book.cityId) ?? null;
                        return <BookCardSmall key={book.id} book={book} authors={bookAuthor} city={bookCity}/>
                    }
                )}
            </div>
        </div>
    );
};

export default SearchResultPage;
