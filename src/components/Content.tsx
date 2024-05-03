/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "../api/axios";
import { useEffect, useState } from "react";
import Cookies from 'js-cookie';
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
interface UserData {
    id: string;
    username: string;
    email: string;
    fullName: string;
    address: string;
    gender: string;
    dob: string;
    role: string
}
export default function Content() {
    const [data, setData] = useState<UserData | undefined>();
    const [accessTokenFood, setAccessTokenFood] = useState<string | undefined>(
        Cookies.get("access_token")
    );
    const [refreshTokenFood, setRefreshTokenFood] = useState<string | undefined>(
        Cookies.get("refresh_token")
    );
    console.log(setRefreshTokenFood);



    const refreshAccessToken = async () => {

        try {
            const res = await axios.post(
                "/api/refresh-token",
                {},
                {
                    headers: {
                        Authorization: `Bearer ${refreshTokenFood}`,
                    },
                }
            );
            Cookies.set("access_token", res.data.access_token);
            setAccessTokenFood(res.data.access_token);
            Cookies.set("refresh_token", res.data.refresh_token);
            // fetchData()
        } catch (error) {
            toast("Please login again !");
            console.log("Error refreshing access token:", error);
        }
    };

    const fetchData = async () => {
        try {
            const res = await axios.get("/api/profile", {
                headers: {
                    Authorization: `Bearer ${accessTokenFood}`,
                },
            });
            setData(res.data.data);
        } catch (error: any) {
            if (refreshTokenFood && error.response && error.response.status === 401) {
                refreshAccessToken();
            } else {
                console.log("Error fetching data:", error);
            }
        }
    };

    useEffect(() => {
        const fetchDataWithRetry = async () => {
            try {
                await fetchData();
            } catch (error) {
                console.log("Error in useEffect:", error);
            }
        };

        if (accessTokenFood) {
            fetchDataWithRetry();
        } else {
            console.log("Not logged in");
        }
    }, [accessTokenFood]);

    const handleLogout = async () => {
        try {
            await axios.get("/api/logout", {
                headers: {
                    Authorization: `Bearer ${accessTokenFood}`,
                },
            });
            Cookies.remove('access_token')
            Cookies.remove('refresh_token')
            setData(undefined)
        } catch (error) {
            toast("Logout error !")
        }
    };


    return <div >
        {data ? <div className="flex flex-col">
            <div className="p-5 shadow-sm w-fit tracking-wide text-xl">
                <div className=" h-20 w-20 bg-[#E5F0FF] rounded-full flex justify-center ">
                    <img className="  h-full w-full object-cover" src="https://s3-alpha-sig.figma.com/img/96ca/4f3c/99225394e50df5e7a78773cc97a178c7?Expires=1714953600&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=RSi7qlrvAk3-BW736fvYQVTIhHbc9sAtKUjTgG0CtAqsD8zO-uE8JDeHru-5VxBQYeMiY1nfH6mEVvpExpNza0AJ0pSk1XEBcrIcdaTFFKh58d3tw5p4OPj1TYspHLvWzUI7uZ3s2nlWJtG05qnUzU5zChp0ZF1nirFdEWXCbW2EXpjL78TIMKVKOFPCcKVQw8MRwLgkBAFF4POTl7rHUTBIkQSGCWNGMqabGv37UZuM~PtlJe4-fuWCDhSd7WiciD1XtlmTszyydTQPgpm-RwYPkNpq7St9EYjPHaN7uuN0WyBgR6-mHbPDdm~txhORPs39zt3eAlX5qSgz6xYbaQ__" alt="" />
                </div>
                {data.role && <div className=" space-x-4"><span className="font-bold">Role: </span> <span>{data.role}</span></div>}
                <div className=" space-x-4"><span className="font-bold">Email: </span> <span>{data.email}</span></div>
                <div className=" space-x-4"><span className="font-bold">Username: </span> <span>{data.username}</span></div>
                {data.fullName && <div className=" space-x-4"><span className="font-bold">FullName: </span> <span className="capitalize">{data.fullName}</span></div>}
                {data.address && <div className=" space-x-4"><span className="font-bold">Address: </span> <span>{data.address}</span></div>}
                {data.gender && <div className=" space-x-4"><span className="font-bold">Gender: </span> <span className=" capitalize">{data.gender}</span></div>}
                {data.dob && <div className=" space-x-4"><span className="font-bold">Date of birth : </span> <span>{data.dob}</span></div>}
            </div>
            <button onClick={handleLogout} className="p-4 bg-third text-white rounded-xl  m-10 h-fit md:w-fit  text-base md:text-xl">LogOut</button>
        </div> :
            <Link to="/login">
                <div className="flex justify-between">
                    <div className="text-xl  p-10">Home</div>
                    <button className="p-4 bg-third text-white rounded-xl m-10 h-fit text-base md:text-xl"> Login</button>
                </div></Link>
        }


    </div>;
}

