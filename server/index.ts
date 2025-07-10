import express = require("express");
import cors = require("cors");
import booksRouter from "./routes/books";

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

app.use("/api/books", booksRouter);

app.listen(PORT, () => {
    console.log(`🚀 Server running at http://localhost:${PORT}`);
});