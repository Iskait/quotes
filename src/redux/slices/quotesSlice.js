import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";


export const fetchQuotes = createAsyncThunk(
    'quotes/fetchQuotes',
    async (url) => {
        const response = await fetch(url);
        const {quotes} = await response.json();
        return {quotes, random: quotes[~~(Math.random() * quotes.length)]};
    }
)


const quotesSlice = createSlice({
    name: 'quotes',
    initialState: {
        quote: '',
        author: '',
        status: 'idle',
        stackQuotes: [],
    },
    reducers: {
        getNewQuote: (state) => {
            const {quote, author} = state.stackQuotes[~~(Math.random()*state.stackQuotes.length)];
            [state.quote, state.author] = [quote, author];
        }
    },
    extraReducers: {
        [fetchQuotes.fulfilled]: (state, action) => {
            state.status = 'success';
            const { quote, author } = action.payload.random;
            [state.quote, state.author] = [quote, author];
            state.stackQuotes = action.payload.quotes;
        },
        [fetchQuotes.rejected]: (state) => {
            state.status = 'idle';
            state.quote = 'No quotes, please try again';
            state.author = ''
            state.stackQuotes = [];
        }
    }
})

export const { getNewQuote } = quotesSlice.actions;

export default quotesSlice.reducer;