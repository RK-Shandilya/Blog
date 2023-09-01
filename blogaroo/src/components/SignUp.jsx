import React, { useState } from 'react'
import { AiFillEyeInvisible, AiFillEye } from 'react-icons/ai'
import { toast } from 'react-hot-toast'
import { authEndpoints } from '../services/apis'
import { apiConnector } from '../services/apiConnector'
import { Link, useNavigate } from 'react-router-dom'
import {useDispatch} from 'react-redux'
import { setSignUpData} from '../redux/slices/userSlice'

const SignUp = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [formData, setFormData] = useState({
        username: "",
        email: "",
        password: "",
        cpassword: "",
    })
    const [showPassword, setShowPassword] = useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)


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
        if (formData.password !== formData.cpassword) {
            toast.error("Password doesn't match");
            return;
        }
        const signupData = {
            name: formData.username,
            email: formData.email,
            password: formData.password,
            confirmPassword: formData.cpassword
        }
        try {
            console.log("hiii");
            const response = await apiConnector("POST", authEndpoints.SIGNUP_API, 
                signupData
            )
            localStorage.setItem("signUpData",JSON.stringify(response.data));
            dispatch(setSignUpData(response.data));
            console.log("SIGNUP API RESPONSE............", response)
            console.log(response.data);

            if (!response.data.success) {
                throw new Error(response.data.message)
            }
            toast.success("Signup Successful")
            navigate("/login")
        } catch (error) {
            console.log("SIGNUP API ERROR............", error)
            toast.error(error.response.data.message)
            navigate("/signup")
        }
    }

    return (
        <div className='flex justify-center items-center h-screen bg-slate-300'>
            <div className='w-11/12  bg-slate-200 shadow-lg rounded-lg md:w-3/12'>
                <form onSubmit={submitHandler} className='m-6 flex flex-col gap-y-4'>
                    <h1 className='text-center text-3xl font-bold text-slate-600'>Sign Up</h1>
                    <label htmlFor="userName">Username</label>
                    <input
                        type="text"
                        required
                        name="username"
                        id="userName"
                        placeholder='Username'
                        value={formData.username}
                        onChange={changeHandler}
                        className='w-full border-b-2 rounded-md p-2 border-slate-400'
                    />
                    <label htmlFor="Email">Email Address</label>
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
                    <label htmlFor="CPassword">Confirm Password</label>
                    <div className='relative'>
                        <input
                            type={showConfirmPassword ? "text" : "password"}
                            required
                            name="cpassword"
                            id="CPassword"
                            placeholder='Confirm Password'
                            value={formData.cpassword}
                            onChange={changeHandler}
                            className='w-full border-b-2 rounded-md p-2 border-slate-400'
                        />
                        <span onClick={(e) => setShowConfirmPassword((prev) => !prev)} className='absolute right-3 top-3 text-xl'>
                            {
                                showConfirmPassword ? <AiFillEye /> : <AiFillEyeInvisible />
                            }
                        </span>
                    </div>
                    <input
                        type="submit"
                        value="Register"
                        id='button1'
                        className='w-full border-2 rounded-md p-2  border-slate-400 bg-slate-400 hover:bg-slate-300 transition-all'
                    />
                    <p className='text-center  text-slate-600'>Already a member ? <Link to='/login' className=' font-bold transition-all hover:font-semibold'>Log In</Link></p>
                    
                </form>
            </div>
        </div>
    )
}

export default SignUp
