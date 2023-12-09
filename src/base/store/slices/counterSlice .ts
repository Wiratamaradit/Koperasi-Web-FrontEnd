import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'

export const fetchData = createAsyncThunk('', async (thunkApi) => {
    const res = await fetch('https://jsonplaceholder.typicode.com/users')
    return await res.json();
});

const initialState = {
    entities: [],
    loading: false,
    value: 0,
    inputData: []
} as any

const counterSlice = createSlice({
    name: 'data',
    initialState,
    reducers: {
        incrementPlus: (state) => {
            state.value++
        },
        incrementMin: (state) => {
            state.value--
        },
        create: (state, action) => {
            state.inputData.push(action.payload)
        },
        edit: (state, action) => {
            state.inputData.push(action.payload)
        },
        delete: (state, action) => {
            state.inputData.push(action.payload)
        },
    },
    extraReducers: (builder) => {
        builder.addCase(fetchData.fulfilled, (state, action) => {
            state.loading = true
            state.entities.push(...action.payload)
        })

        builder.addCase(fetchData.pending, (state, action) => {
            state.loading = true
        })
    }
})

export const {incrementPlus, incrementMin, create} = counterSlice.actions

export default counterSlice.reducer