import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface currentChatType {
    currentChatId: string;
}

const initialState: currentChatType = {
    currentChatId: ''
}

const chatSlice = createSlice({
    name: 'chat',
    initialState,
    reducers: {
        currentChat(state, action: PayloadAction<any>) {
            state.currentChatId = action.payload
        }
    }
});

export const { currentChat } = chatSlice.actions

export default chatSlice.reducer;