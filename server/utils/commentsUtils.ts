import {Comment} from "../types/Comment";
import {mockComments as comments} from "../data/mockComments";


export const generateCommentId = (): string => {
    let commentIdCounter = comments.length;
    return String(++commentIdCounter);
};

export const findCommentById = (id: string): Comment| undefined =>
{ return comments.find(comment => comment.id === id);}
