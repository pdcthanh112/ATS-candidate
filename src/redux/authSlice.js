import {createSlice} from '@reduxjs/toolkit'

const authSlice = createSlice({
    name: "auth",
    initialState: {
        login:{
            currentUser: null, 
            isFetching: false,
            error: false
        },
        register: {
            isFetching: false,
            error: false,
            success: false
        }
    },
    reducers: {
        //LOGIN
        loginStart: (state, action) => {
            state.login.isFetching = true;
        },
        loginSuccess: (state, action) => {
            state.login.isFetching = false;
            state.login.currentUser = action.payload;
            state.login.error = false;
        },
        loginFailed: (state, action) => {
            state.login.isFetching = false;           
            state.login.error = true;
        },
        //REGISTER
        registerStart: (state, action) => {
            state.register.isFetching = true;
        },
        registerSuccess: (state, action) => {
            state.register.isFetching = false;
            state.register.error = false;
            state.register.success = true;
        },
        registerFailed: (state, action) => {
            state.register.isFetching = false;           
            state.register.error = true;
        },       
    }
})


export const {loginStart, loginSuccess, loginFailed, registerStart, registerSuccess, registerFailed} = authSlice.actions;
export default authSlice.reducer;