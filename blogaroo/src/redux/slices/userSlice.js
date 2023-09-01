import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    signUpData:null,
    token: localStorage.getItem("token") ? JSON.parse(localStorage.getItem("token")) : null,
    userData:null
}

const userSlice = createSlice({
    name:"user",
    initialState,
    reducers:{
        setSignUpData(state,action){
            
            state.signUpData = action.payload
        },
        setToken(state,action){
            state.token = action.payload
        },
        setUserData(state,action){
            console.log("action.payload------>",action.payload)
            state.userData = action.payload
        }
    }
})

export const {setSignUpData , setToken ,setUserData} = userSlice.actions
export default userSlice.reducer;