import {type Request, type Response, Router} from "express";
import {Author} from "../types/Author";
import {mockAuthors as authors} from "../data/mockAuthors";
import {findAuthorAndIndexById, generateAuthorId, validateNewAuthorName} from "../utils/authorsUtils";


const authorsRouter = Router();

//Get methods
//Get all authors
authorsRouter.get("/", (req: Request, res: Response<Author[]>) => {
    res.status(200).json(authors);
});

//Get author by ID
authorsRouter.get("/:id", (req: Request <{ id: string}>, res: Response<Author | { error: string }>) => {
    const authorId = req.params.id;
    const {author, index} = findAuthorAndIndexById(authorId);
    if (index === -1) {
        return res.status(404).json({error: "Author not found"});
    }
    res.status(200).json(author);
});

//Post methods
//Add author
authorsRouter.post("/", (req: Request<{}, {}, { name: string }>, res: Response<Author | {error: string}>) => {
    const newAuthorName = req.body.name.trim();
    const validationError = validateNewAuthorName(newAuthorName);
    if(validationError) { return res.status(400).json({ error: validationError });}
    const newAuthorId = generateAuthorId();
    const newAuthor = {id: newAuthorId, name: newAuthorName};
    authors.push(newAuthor);
    res.status(201).json(newAuthor);
});

//Put methods
//UpdateAuthor
authorsRouter.put("/:id", (req: Request<{ id: string},{}, { name: string }>, res: Response<Author| {error: string}>) => {
    const authorId = req.params.id;
    const updateAuthorName = req.body.name.trim();
    const validationError = validateNewAuthorName(updateAuthorName);
    if(validationError) { return res.status(400).json({ error: validationError });}
    const updateAuthor   = {id: authorId, name: updateAuthorName};
    res.status(200).json(updateAuthor);
})

//Delete methods
//Delete author by id
authorsRouter.delete("/:id", (req: Request<{ id: string}, {}, {}>, res: Response <{message: string} | {error: string}>) => {
    const authorId = req.params.id;
    const {index} = findAuthorAndIndexById(authorId);
    if (index === -1) {return res.status(404).json({error: "Author not found"});}
    authors.splice(index, 1);
    res.status(200).json({message: `Author with id:${authorId} deleted`});
});

export default authorsRouter;