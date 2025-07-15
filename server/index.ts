import express = require("express");
import cors = require("cors");
import booksRouter from "./routes/books";
import usersRouter from "./routes/users";
import authorsRouter from "./routes/authors";
import citiesRouter from "./routes/cities";
import commentsRouter from "./routes/comments";
import genresRouter from "./routes/genres";
import languagesRouter from "./routes/languages";

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

app.use("/api/books", booksRouter);
app.use("/api/users", usersRouter);
app.use("/api/authors", authorsRouter);
app.use("/api/cities", citiesRouter);
app.use("/api/comments", commentsRouter);
app.use("/api/genres", genresRouter);
app.use("/api/languages", languagesRouter);

app.listen(PORT, () => {
    console.log(`🚀 Server running at http://localhost:${PORT}`);
});