import { Router, Request, Response } from "express";
import { Genre } from "../types/Genre";
import { mockGenres as genres } from "../data/mockGenres";
import { findGenreById } from "../utils/genresUtils";

const genresRouter = Router();

// Get all genres
genresRouter.get("/", (req: Request, res: Response<Genre[]>) => {
    res.status(200).json(genres);
});

// GET genre by id
genresRouter.get("/:id", (req: Request, res: Response<Genre | { error: string }>) => {
    const genre = findGenreById(req.params.id);
    if (!genre) {
        return res.status(404).json({ error: "Genre not found" });
    }
    res.status(200).json(genre);
});

export default genresRouter;