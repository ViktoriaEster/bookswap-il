import {createSlice} from "@reduxjs/toolkit";
import {
    addCommentThunk,
    deleteCommentThunk,
    getBookCommentsThunk,
    getCommentByIdThunk,
    getCommentsThunk,
    toggleLikeCommentThunk
} from "./commentsThunks.ts";
import type {UserComment} from "../../types/UserComment.ts";


type CommentsState = {
    items: UserComment[];
    isLoading: boolean;
    error: string | null;
}

const initialState: CommentsState = {
    items: [],
    isLoading: false,
    error: null
};

const commentsSlice = createSlice({
    name: "comments",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            //getCommentsThunk
            .addCase(getCommentsThunk.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(getCommentsThunk.fulfilled, (state, action) => {
                state.isLoading = false;
                state.items = action.payload;
                state.error = null;
            })
            .addCase(getCommentsThunk.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload || 'Failed to fetch comments';
            })
            //getBookCommentsThunk
            .addCase(getBookCommentsThunk.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(getBookCommentsThunk.fulfilled, (state, action) => {
                state.isLoading = false;
                state.error = null;
                state.items = state.items.filter(item => item.bookId !== action.payload.bookId);
                state.items.push(...action.payload.comments);
            })
            .addCase(getBookCommentsThunk.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload || 'Failed to fetch book comments';
            })
            //getCommentByIdThunk
            .addCase(getCommentByIdThunk.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(getCommentByIdThunk.fulfilled, (state, action) => {
                state.isLoading = false;
                state.error = null;
                const index = state.items.findIndex(item => item.id === action.payload.id);
                if (index >= 0) {
                    state.items[index] = action.payload;
                }
                else {state.items.push(action.payload);}
            })
            .addCase(getCommentByIdThunk.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload || 'Failed to fetch comment';
            })
            //toggleLikeCommentThunk
            .addCase(toggleLikeCommentThunk.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(toggleLikeCommentThunk.fulfilled, (state, action) => {
                state.isLoading = false;
                state.error = null;
                const index = state.items.findIndex(item => item.id === action.payload.id);
                if (index >= 0) {
                    state.items[index] = action.payload;
                }
                else {state.items.push(action.payload);}
            })
            .addCase(toggleLikeCommentThunk.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload || 'Failed to toggle like comment';
            })
            //addCommentThunk
            .addCase(addCommentThunk.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(addCommentThunk.fulfilled, (state, action) => {
                state.isLoading = false;
                state.error = null;
                state.items.push(action.payload);
            })
            .addCase(addCommentThunk.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload || 'Failed to add comment';
            })
            //deleteCommentThunk
            .addCase(deleteCommentThunk.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(deleteCommentThunk.fulfilled, (state, action) => {
                state.isLoading = false;
                state.error = null;
                const index = state.items.findIndex(item => item.id === action.payload.id);
                if (index >= 0) {
                    state.items.splice(index, 1);
                }
            })
            .addCase(deleteCommentThunk.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload || 'Failed to delete comment';
            })

    }
})

export default commentsSlice.reducer;