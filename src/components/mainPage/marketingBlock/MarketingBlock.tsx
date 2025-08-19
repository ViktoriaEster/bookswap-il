import styles from "./MarketingBlock.module.css";
import {type JSX, useState} from "react";

const MarketingBlock = () => {

    const [showModalIndex, setShowModalIndex] = useState<number | null>(null);

    const handleAdLink = (index: number) => {
        setShowModalIndex(index);
        setTimeout(() => {setShowModalIndex(null);}, 3000);
    };
    const adCount = 5;

    const generateAdCards = (count: number) => {
        const adCards: JSX.Element[] = [];
        for (let i = 0; i < count; i++) {
            adCards.push(<div key={i} className={styles.adCard} onClick={() => handleAdLink(i)}
                              title='Sponsored content – click to view'>

                {
                    showModalIndex === i?
                    <div className={styles.modal}>
                        <p>This is an ad space. Clicking will open the ad link.</p>
                    </div> :
                    'Ad space'
                }
            </div>);
        }
        return adCards;
    }

    return (
        <aside className={styles.marketingBlock}>
            <h3 className={styles.title}>Sponsored</h3>
            <div className={styles.cards}>
                {generateAdCards(adCount)}
            </div>
        </aside>
    );
};

export default MarketingBlock;