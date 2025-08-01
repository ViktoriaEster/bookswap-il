import { Router, Request, Response } from "express";
import { Language } from "../types/Language";
import { mockLanguages as languages } from "../data/mockLanguages";

const languagesRouter = Router();

// Get all languages
languagesRouter.get("/", (req: Request, res: Response<Language[]>) => {
    res.status(200).json(languages);
});

// Get languages by id
languagesRouter.get("/:id", (req: Request, res: Response<Language | { error: string }>) => {
    const language = languages.find(lang => lang.id === req.params.id);
    if (!language) {
        return res.status(404).json({ error: "Language not found" });
    }
    res.status(200).json(language);
});

export default languagesRouter;