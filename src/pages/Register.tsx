import USFflag from "../assets/USFlag.png"
import { IoChevronDown } from "react-icons/io5";
import { FiUser } from "react-icons/fi";
import { HiOutlineMail } from "react-icons/hi";
import { LuEye, LuLock } from "react-icons/lu";
import { LuEyeOff } from "react-icons/lu";
import { FcGoogle } from "react-icons/fc";
import SideTheme from "../components/SideTheme";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setBlur, setFocus, togglePassword } from "../features/FormAuth/formAuthSlice";
import { RootState } from '../store';
import PasswordStrengthBar from 'react-password-strength-bar';
import { useEffect, useState } from "react";
import axios from "../api/axios";
import { toast } from 'react-toastify';

export default function Register() {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const handleInputFocus = (inputName: string) => {
        dispatch(setFocus(inputName))
    };
    const focusedInput: string = useSelector((state: RootState) => state.forms.focusedInput);
    const showPassword: boolean = useSelector((state: RootState) => state.forms.showPassword);
    const handleTogglePassword = () => {
        dispatch(togglePassword())
    };

    const [email, setEmail] = useState<string>("")
    const [username, setUsername] = useState<string>("")
    const [password, setPassword] = useState<string>("")
    const [password_confirmation, setPassword_confirmation] = useState<string>("")

    const [checkPassword, setCheckPassword] = useState<boolean>(false)
    // const score = document.querySelector('.custom-passwordStrength > p');
    // const valueScore = score?.innerHTML;

    const [checked, setChecked] = useState<boolean>(false)
    const [checkPolicy, setCheckPolicy] = useState<boolean>(false)
    const handleCheckboxChange = () => {
        setChecked(!checked)
        setCheckPolicy(!checkPolicy)
    }


    useEffect(() => { }, [checked, checkPolicy])

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (checked) {
            axios.post("/api/register", {
                username,
                email,
                password,
                password_confirmation
            },)
                .then((res) => {
                    console.log(res);

                    return navigate("/login")
                })
                .catch(err => {
                    console.log("err", err.response.data.message);
                    toast.error(<p className=" capitalize">{err.response.data.message}</p>)
                })
        } else {
            setCheckPolicy(true)
        }
    }

    return <div className=" flex ">
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
                        <div className=" font-bold text-2xl leading-9 text-[#292C38] dark:text-white">Create Account to Get Started</div>
                        <div className="text-sm font-medium text-textsecondary dark:text-textMain">Sign up and get started</div>
                    </div>
                    <div className="flex flex-col gap-4">
                        <span onFocus={() => handleInputFocus("username")}
                            onBlur={() => dispatch(setBlur())}
                            className={`${focusedInput === 'username' ? ' border-third' : 'border-borderColor dark:border-[#565C70]'} h-58 flex items-center pt-[1.188rem] pb-[1.125rem] rounded-xl border  `}>
                            <FiUser style={{ height: 24, width: 24, marginLeft: 16, marginRight: 12, color: "#96A0B5" }} />
                            <input value={username} onChange={e => setUsername(e.target.value)} type="text" required placeholder="Username" className="stylePlaceholder flex-1 mr-[2.688rem] outline-none text-base leading-nomalText font-medium tracking-nomalText  text-textInput dark:text-white bg-white dark:bg-[#292C38] " />
                        </span>
                        <span onFocus={() => { handleInputFocus("email") }}
                            onBlur={() => dispatch(setBlur())}
                            className={`${focusedInput === 'email' ? ' border-third' : 'border-borderColor dark:border-[#565C70]'} h-58 flex items-center pt-[1.188rem] pb-[1.125rem] rounded-xl border  `}>
                            <HiOutlineMail style={{ height: 24, width: 24, marginLeft: 16, marginRight: 12, color: "#96A0B5" }} />
                            <input value={email} onChange={e => setEmail(e.target.value)} type="email" required placeholder="Email" className="stylePlaceholder flex-1 mr-[2.688rem] outline-none text-base leading-nomalText font-medium tracking-nomalText text-textInput dark:text-white bg-white dark:bg-[#292C38]  " />
                        </span>
                        <span onFocus={() => {
                            handleInputFocus("password")
                            setCheckPassword(true)
                        }
                        }
                            onBlur={() => dispatch(setBlur())}
                            className={`${focusedInput === 'password' ? ' border-third' : 'border-borderColor dark:border-[#565C70]'} h-58 flex items-center pt-[1.188rem] pb-[1.125rem] rounded-xl border  `}>
                            <LuLock style={{ height: 24, width: 24, marginLeft: 16, marginRight: 12, color: "#96A0B5" }} />
                            <input value={password} onChange={e => setPassword(e.target.value)} type="password" required placeholder="Password" className="password stylePlaceholder flex-1 outline-none text-base leading-nomalText font-medium tracking-nomalText  text-textInput dark:text-white bg-white dark:bg-[#292C38]" />
                            {showPassword ? <LuEye onClick={handleTogglePassword} style={{ height: 24, width: 24, color: "#96A0B5", margin: " 0 16px" }} /> :
                                <LuEyeOff onClick={handleTogglePassword} style={{ height: 24, width: 24, color: "#96A0B5", margin: " 0 16px" }} />}
                        </span>
                        {checkPassword && <PasswordStrengthBar scoreWords={['weak', 'weak', 'standar', 'good', 'strong']} className="custom-passwordStrength" password={password} />}

                        <span onFocus={() => {
                            handleInputFocus("password_confirmation")
                            setCheckPassword(true)
                        }
                        }
                            onBlur={() => dispatch(setBlur())}
                            className={`${focusedInput === 'password_confirmation' ? ' border-third' : 'border-borderColor dark:border-[#565C70]'} h-58 flex items-center pt-[1.188rem] pb-[1.125rem] rounded-xl border  `}>
                            <LuLock style={{ height: 24, width: 24, marginLeft: 16, marginRight: 12, color: "#96A0B5" }} />
                            <input value={password_confirmation} onChange={e => setPassword_confirmation(e.target.value)} type="text" required placeholder="Password confirmation" className="password stylePlaceholder flex-1 outline-none text-base leading-nomalText font-medium tracking-nomalText  text-textInput dark:text-white bg-white dark:bg-[#292C38]" />

                        </span>
                        {/* {samePassword && <div className="text-red-500">Password is not the same</div>} */}
                    </div>
                    <label className="main text-textsecondary dark:text-textMain font-medium text-base leading-nomalText">I agree to the Terms & Conditions
                        <input type="checkbox" checked={checked} onChange={handleCheckboxChange} />
                        <span className="checkbox-container  bg-white dark:bg-transparent    dark:border-[#565C70]"></span>
                    </label>
                    {checkPolicy && <div className="text-red-500">Do you agree with the policy?</div>}

                    <button type="submit" className="h-58  bg-third text-base leading-nomalText tracking-nomalText font-medium rounded-xl text-white ">Sign Up</button>
                    <div className="divider dark:before:bg-[#565C70] dark:after:bg-[#565C70] ">
                        <div className="divider-content text-textsecondary dark:text-[#565C70]  font-medium text-sm px-4">Or sign up with</div>
                    </div>
                    <button className=" h-58  rounded-xl border border-borderColor dark:border-textMain  flex gap-3 justify-center items-center">
                        <FcGoogle style={{ width: 24, height: 24 }} />
                        <span className=" font-medium text-base leading-nomalText tracking-nomalText text-[#292C38] dark:text-white">Sign Up with Google</span>
                    </button>
                </form>
                <div className=" md:max-w-[400px] lg:max-w-[28.125rem] xl:max-w-[33.75rem] pt-[8.313rem] pb-12 flex justify-center">
                    <span className="font-medium text-base leading-normalText tracking-normalText text-textsecondary dark:text-[#94A3B8]">Already have an account?</span>&nbsp;
                    <span className="text-third font-bold text-base"><Link to="/login">Log In</Link></span>
                </div>

            </div>
        </div>
        <SideTheme />
    </div >;
}
