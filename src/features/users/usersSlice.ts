import {mockUsers} from "../../mock-data/mockUsers.ts";
import type {User} from "../../types/User.ts";
import {createSlice, type PayloadAction} from "@reduxjs/toolkit";

type UsersState = {
    items: User[]
};

const initialState: UsersState = {
    items: mockUsers,
}

const usersSlice = createSlice({
    name: "users",
    initialState,
    reducers: {
        addUser: (state: UsersState, action: PayloadAction<User>) => {
            state.items.push(action.payload);
        }
    }
});

export const {addUser} = usersSlice.actions;
export default usersSlice.reducer;