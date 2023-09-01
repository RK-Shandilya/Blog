import React, { useState } from 'react'
import { AiFillEyeInvisible, AiFillEye } from 'react-icons/ai'
import { toast } from 'react-hot-toast'
import { authEndpoints } from '../services/apis'
import { apiConnector } from '../services/apiConnector'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { setToken, setUserData } from '../redux/slices/userSlice'

const Login = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    })
    const [showPassword, setShowPassword] = useState(false);


    const changeHandler = (e) => {
        setFormData((prevFromData) => {
            return {
                ...prevFromData,
                [e.target.name]: e.target.value
            }
        })
    }

    const submitHandler = async (e) => {
        e.preventDefault();
        const loginData = {
            email: formData.email,
            password: formData.password,
        }
        try {
            const response = await apiConnector("POST", authEndpoints.LOGIN_API, 
            loginData
            )
            localStorage.setItem("token",JSON.stringify(response.data.token))
            localStorage.setItem("user",JSON.stringify(response.data.user))
            dispatch(setUserData(response.data.user));
            console.log("Login API RESPONSE............", response)
            if (!response.data.success) {
                throw new Error(response.data.message)
            }
            toast.success("Login Successful")
            navigate("/home")
        } catch (error) {
            console.log("Login API ERROR............", error)
            toast.error(error.response.data.message)
        }
    }

    return (
        <>
        <div className='flex justify-center items-center h-screen bg-slate-300'>
        <div className='w-11/12  bg-slate-200 shadow-lg rounded-lg md:w-3/12'>
                <form onSubmit={submitHandler} className='m-6 flex flex-col gap-y-4'>
                    <h1 className='text-center text-3xl font-bold text-slate-600'>Login</h1>
                    <label htmlFor="Email">Email Address </label>
                    <input  
                        type="email"
                        required
                        name="email"
                        id="Email"
                        placeholder='Email Address'
                        value={formData.email}
                        onChange={changeHandler}
                        className='w-full border-b-2 rounded-md p-2 border-slate-400'
                    />
                    <label htmlFor="Password">Password</label>
                    <div className='relative'>
                        <input
                            type={showPassword ? "text" : "password"}
                            required
                            name="password"
                            id="Password"
                            placeholder='Password'
                            value={formData.password}
                            onChange={changeHandler}
                            className='w-full border-b-2 rounded-md p-2 border-slate-400'
                        />
                        <span onClick={(e) => setShowPassword((prev) => !prev)} className='absolute right-3 top-3 text-xl'>
                            {
                                showPassword ? <AiFillEye /> : <AiFillEyeInvisible />
                            }
                        </span>
                    </div>
                    <input
                        type="submit"
                        value="Log In"
                        id='button2'
                        className='w-full border-2 rounded-md p-2  border-slate-400 bg-slate-400  hover:bg-slate-300 transition-all'
                    />
                </form>
            </div>
            </div>
        </>
    )
}

export default Login
