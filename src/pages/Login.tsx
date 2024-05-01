import USFflag from "../assets/USFlag.png"
import { IoChevronDown } from "react-icons/io5";
import { LuLock } from "react-icons/lu";
import { LuEyeOff } from "react-icons/lu";
import { LuEye } from "react-icons/lu";
import { FcGoogle } from "react-icons/fc";
import SideTheme from "../components/SideTheme";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store';
import { setBlur, setFocus, togglePassword } from "../features/FormAuth/formAuthSlice";
import { useState } from "react";
import { FiUser } from "react-icons/fi";
import { toast } from 'react-toastify';
import Cookies from 'js-cookie';
import axios from "../api/axios";
import { jwtDecode } from "jwt-decode";

export default function Login() {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const handleInputFocus = (inputName: string) => {
        dispatch(setFocus(inputName))
    };
    const focusedInput: string = useSelector((state: RootState) => state.forms.focusedInput);
    const showPassword: boolean = useSelector((state: RootState) => state.forms.showPassword);
    const handleTogglePassword = () => {
        dispatch(togglePassword())
    };
    const [username, setUsername] = useState<string>("")
    const [password, setPassword] = useState<string>("")
    const handleSubmit = (e: { preventDefault: () => void; }) => {
        e.preventDefault()
        axios.post("/api/login", {
            username,
            password
        })
            .then((res) => {
                Cookies.set("accessTokenFood", res.data.accessToken

                );
                const decoded = jwtDecode(res.data.accessToken);
                console.log("decoded", decoded);

                Cookies.set("refreshTokenFood", res.data.refreshToken);
                toast("Login Successful")
                return navigate("/")
            })
            .catch(err => {
                // console.log(err.response.data.message);
                toast.error(<p className=" capitalize">{err.response.data.message}</p>)


            })
    }
    return <div className="max-h-[1024px] flex ">
        <div className="flex-1 relative bg-white dark:bg-[#292C38]">
            <div className="ml-[1.875rem] md:ml-[1.875rem] mt-10  xl:ml-[4.25rem] max-w-[193px] bg-secondary dark:bg-[#343744] flex items-center justify-center rounded-xl px-4 py-3">
                <div className=" h-[1.125rem] w-6">
                    <img src={USFflag} className="h-full w-full object-cover" alt="" />
                </div>
                <span className="text-base font-bold text-textMain  px-2">English (US)</span>
                <IoChevronDown style={{ width: 24, height: 24, color: "#96A0B5" }} />
            </div>
            <div className="  mt-[3.313em] ml-[1.875rem] sm:pr-[1.875rem] md:pr-0 lg:pr-0 md:ml-[3.125rem] lg:ml-28 xl:ml-[10.313rem]">
                <div className="mx-auto lg:mx-0 h-10 w-[12.313rem] flex items-center gap-4 ">
                    <div className="flex">
                        <div className="rectangle"></div>
                        <div className="leftCircle"></div></div>
                    <span className="text-[1.75rem] leading-6 text-[#062046] dark:text-white font-bold">Insight CO</span>
                </div>
                <form onSubmit={handleSubmit} className="mx-auto md:mx-0  max-w-[400px] md:max-w-[400px] lg:max-w-[28.125rem] xl:max-w-[33.75rem] mt-12 flex flex-col gap-8">
                    <div className=" flex flex-col gap-3">
                        <div className=" font-bold text-2xl leading-9 text-[#292C38] dark:text-white">Hi, Welcome Back!</div>
                        <div className="text-sm font-medium text-textsecondary dark:text-textMain">Log In to your account</div>
                    </div>
                    <div className="flex flex-col gap-4">
                        <span onFocus={() => handleInputFocus("username")}
                            onBlur={() => dispatch(setBlur())}
                            className={`${focusedInput === 'username' ? ' border-third' : 'border-borderColor dark:border-[#565C70]'} h-58 flex items-center pt-[1.188rem] pb-[1.125rem] rounded-xl border  `}>
                            <FiUser style={{ height: 24, width: 24, marginLeft: 16, marginRight: 12, color: "#96A0B5" }} />
                            <input value={username} onChange={e => setUsername(e.target.value)} type="username" required placeholder="Username" className="stylePlaceholder flex-1 mr-[2.688rem] outline-none text-base leading-nomalText font-medium tracking-nomalText  text-textInput dark:text-white bg-white dark:bg-[#292C38] " />
                        </span>
                        <span onFocus={() => handleInputFocus('password')}
                            onBlur={() => dispatch(setBlur())}
                            className={`${focusedInput === 'password' ? ' border-third' : 'border-borderColor dark:border-[#565C70]'} h-58 flex items-center pt-[1.188rem] pb-[1.125rem] rounded-xl border  `}>
                            <LuLock style={{ height: 24, width: 24, marginLeft: 16, marginRight: 12, color: "#96A0B5" }} />
                            <input value={password} onChange={e => setPassword(e.target.value)} type="password" required placeholder="Password" className="password stylePlaceholder flex-1 outline-none text-base leading-nomalText font-medium tracking-nomalText  text-textInput dark:text-white bg-white dark:bg-[#292C38]" />
                            {showPassword ? <LuEye onClick={handleTogglePassword} style={{ height: 24, width: 24, color: "#96A0B5", margin: " 0 16px" }} /> :
                                <LuEyeOff onClick={handleTogglePassword} style={{ height: 24, width: 24, color: "#96A0B5", margin: " 0 16px" }} />}
                        </span>
                    </div>
                    <div className="flex items-center justify-between custom-checkbox">
                        <label className="main text-textsecondary dark:text-textMain font-medium text-base leading-nomalText">Remember Me
                            <input type="checkbox" />
                            <span className="checkbox-container  bg-white dark:bg-transparent   dark:border-[#565C70]"></span>
                        </label>
                        <span className=" text-third font-bold text-base"><Link to="/forgot-password">Forgot Password?</Link></span>
                    </div>
                    <button type="submit" className="h-58  bg-third text-base leading-nomalText tracking-nomalText font-medium rounded-xl text-white ">Log In</button>
                    <div className="divider dark:before:bg-[#565C70] dark:after:bg-[#565C70] ">
                        <div className="divider-content text-textsecondary dark:text-[#565C70]  font-medium text-sm px-4">Or log in with</div>
                    </div>
                    <button className=" h-58  rounded-xl border border-borderColor dark:border-textMain flex gap-3 justify-center items-center">
                        <FcGoogle style={{ width: 24, height: 24 }} />
                        <span className=" font-medium text-base leading-nomalText tracking-nomalText text-[#292C38] dark:text-white">Log In with Google</span>
                    </button>
                </form>
                <div className=" md:max-w-[400px] lg:max-w-[28.125rem] xl:max-w-[33.75rem] pt-[8.313rem] pb-12 flex justify-center">
                    <span className="font-medium text-base leading-normalText tracking-normalText text-textsecondary dark:text-[#94A3B8]">Don't have an account?</span>&nbsp;
                    <span className="text-third font-bold text-base"> <Link to="/register">Sign Up</Link></span>
                </div>

            </div>
        </div>
        <SideTheme />
    </div >;
}
