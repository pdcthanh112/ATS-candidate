import {createSlice} from '@reduxjs/toolkit'

const authSlice = createSlice({
    name: "auth",
    initialState: {
        name: "Thanh",
        position: "Director"
    },
    reducers: {
        login: (state, action) => {

        },
        logout: (state, action) => {

        }
    }
})

const {actions, reducer} = authSlice;
export const {login, logout} = actions;
export default reducer;