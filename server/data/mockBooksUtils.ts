import {Book, MockBook} from "../types/Book";
import {mockBooksData} from "./mockBooksData";


const createRandomDate = (): Date => {
   const randomDays = Math.floor(Math.random() * 20);
   const date = new Date();
   date.setDate(date.getDate() - randomDays);
   return date;
}

export const generateMockBooks = (): Book[] => {
    return mockBooksData.map((bookData: MockBook): Book => ({
         ...bookData,
         createdDate: createRandomDate().toISOString(),
         isNew: false
     }));
};



