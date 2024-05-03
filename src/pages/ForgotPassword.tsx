import USFflag from "../assets/USFlag.png"
import { IoChevronDown } from "react-icons/io5";
import { Link, useNavigate } from "react-router-dom";
import { setBlur, setFocus, } from "../features/FormAuth/formAuthSlice";
import SideTheme from "../components/SideTheme";
import { useState } from "react";
import { HiOutlineMail } from "react-icons/hi";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store";
import axios from "../api/axios";
import { toast } from "react-toastify";

export default function ForgotPassword() {
    const [email, setEmail] = useState<string>("")
    const [sentEmail, setSentEmail] = useState<boolean>(false)
    const navigate = useNavigate()

    const dispatch = useDispatch()
    const focusedInput: string = useSelector((state: RootState) => state.forms.focusedInput);
    const handleInputFocus = (inputName: string) => {
        dispatch(setFocus(inputName))
    };
    const handleCheckEmail = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        await axios.post("/api/forgot-password", {
            email
        })
            .then((res) => {
                toast("Checking your email !!")
                navigate("/change-password")
                setSentEmail(true)
            })
            .catch(err => {
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
                <form onSubmit={handleCheckEmail} className="mx-auto md:mx-0  max-w-[400px] md:max-w-[400px] lg:max-w-[28.125rem] xl:max-w-[33.75rem] mt-12 flex flex-col gap-8">

                    {sentEmail ? <div className=" flex flex-col gap-3">
                        <div className=" font-bold text-2xl leading-9 text-[#292C38] dark:text-white">Verify Your Email</div>
                        <div className="text-sm font-medium ">
                            <span className="text-textsecondary dark:text-textMain">We've sent a link to your email address:</span>&nbsp;
                            <a href="mailto:{email}">
                                <span className="text-third">{email}</span>
                            </a></div>
                    </div> : <div className=" flex flex-col gap-3">
                        <div className=" font-bold text-2xl leading-9 text-[#292C38] dark:text-white">Forgot Password?</div>
                        <div className="text-sm font-medium text-textsecondary dark:text-textMain">Enter your email, we will send you the confirmation code</div>
                    </div>}
                    <div className="flex flex-col gap-4">
                        {sentEmail ? <button className="h-58  bg-third text-base leading-nomalText tracking-nomalText font-medium rounded-xl text-white ">Login Again</button> : <span onFocus={() => { handleInputFocus("email") }}
                            onBlur={() => dispatch(setBlur())}
                            className={`${focusedInput === 'email' ? ' border-third' : 'border-borderColor dark:border-[#565C70]'} h-58 flex items-center pt-[1.188rem] pb-[1.125rem] rounded-xl border  `}>
                            <HiOutlineMail style={{ height: 24, width: 24, marginLeft: 16, marginRight: 12, color: "#96A0B5" }} />
                            <input value={email} onChange={e => setEmail(e.target.value)} type="email" required placeholder="Email" className="stylePlaceholder flex-1 mr-[2.688rem] outline-none text-base leading-nomalText font-medium tracking-nomalText text-textInput dark:text-white bg-white dark:bg-[#292C38]  " />
                        </span>}
                    </div>
                    {!sentEmail && <button type="submit" className="h-58  bg-third text-base leading-nomalText tracking-nomalText font-medium rounded-xl text-white ">Send email</button>}
                    {sentEmail ? <div className="flex font-bold text-base">
                        <span className="text-textsecondary dark:text-textMain">Didn't receive an email?</span>&nbsp;
                        <span className="text-third "><Link to="/login">Resend  </Link></span>
                    </div> :
                        <div className="flex items-center justify-between custom-checkbox text-third font-bold text-base">
                            <Link to="/login">Back to Log in</Link>
                        </div>}
                </form>
                {!sentEmail && <div className=" md:max-w-[400px] lg:max-w-[28.125rem] xl:max-w-[33.75rem] pt-[8.313rem] pb-12 flex justify-center">
                    <span className="font-medium text-base leading-normalText tracking-normalText text-textsecondary dark:text-[#94A3B8]">Don't have an account?</span>&nbsp;
                    <span className="text-third font-bold text-base"> <Link to="/register">Sign Up</Link></span>
                </div>}

            </div>
        </div>
        <SideTheme />
    </div >;
}
