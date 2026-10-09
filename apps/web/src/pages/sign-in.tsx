import DayTask from "../components/day-task";
import Input from "../components/ui/input";
import usertag from "/images/usertag.png"
import lock1 from "/images/lock1.png"
import showPassword from "/images/show-password.png"
import { Link, useNavigate } from "react-router-dom";
import Button from "../components/ui/button";
import { useState } from "react";
import { Loading } from "../components/ui/loading";
import ErrorMessage from "../components/error/error";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { loginUser, logout } from "../store/slices/authSlice";
import api from "../api/api";

export default function SignIn(){
    const navigate = useNavigate();
    const [error, setError] = useState(false);
    const [errrorText, setErrorText] = useState("");
    const [loading, setLoading] = useState(false);

    const [formData, setFormData] = useState({
        email:"",
        password:""
    });

    function handleChange(e:React.ChangeEvent<HTMLInputElement>){
        const { name, value } = e.target;
        setFormData(prev=>({
            ...prev,
            [name]:value
        }))
    }

    async function handleLogin(e: React.SubmitEvent<HTMLFormElement>){
        e.preventDefault();
        setLoading(true);
        try {
            const res = await api.post("/auth/login", formData);
            useAppDispatch(loginUser());
            navigate("/home", { replace: true });
        } catch (error:any) {
            setError(true);
            setErrorText(error);
        }finally{
            setLoading(false);
        }
    }

    return(
        <main className="bg-primary-black-100 p-8 md:p-12 w-full min-h-screen ">
            <section className="grid content-start grid-cols-1 lg:w-[40%] m-auto pb-12 md:pb-4 lg:justify-center lg:align-top">

                {/* dayli task logo */}
                <DayTask justify="justify-center"/>

                {/* welcome back heading */}
                <h2 className="text-2xl text-primary-pure-white mt-8">Welcome Back!</h2>

                {/* inputs container */}
                <form onSubmit={(e: React.SubmitEvent<HTMLFormElement>)=>handleLogin(e)}>
                    <Input onChange={handleChange} type="email" htmlFor="email" value={formData.email} placeholder="fazzzil72@gmail.com" text="Email Address" leftImage={usertag} />
                    <Input onChange={handleChange} type="password" htmlFor="password" value={formData.password} placeholder="Password" text="Password" leftImage={lock1} rightImage={showPassword} />

                    <p className="flex justify-end mt-1 text-primary-blue-100 text-[14px] ">
                        <Link to={'/reset-password'}>Forgot Password?</Link>
                    </p>

                    <div className="bg-primary-yellow-100 cursor-pointer text-xl p-2 mt-4">
                        <Button bgColor="primary-yellow-100" color="primary-black-100" text="Log In"/>
                    </div>
                </form>
                {/*continue lines  */}
                <div className="mt-8">
                    <div className="w-full grid grid-cols-3 items-center">
                        <div className="h-px bg-primary-blue-100 "></div>
                        <p className="text-primary-blue-100 text-center">Or continue with</p>
                        <div className="h-px bg-primary-blue-100"></div>
                    </div>
                </div>

                {/* google autorization */}
                <div className="mt-8 border border-white ">
                    <div className="flex gap-4 justify-center text-white p-4">
                        <img src="/images/google.png" alt="google" />
                        <span>Google</span>
                    </div>
                </div>

                {/* restore password container */}

                <div className="mt-8 flex justify-center gap-1">
                    <p className="text-primary-blue-100">Don’t have an account? </p>
                    <Link className="text-primary-yellow-100" to={'/sign-up'}>Sign Up</Link>
                </div>
            </section>

            {
                loading && <Loading />
            }

            {
                error && <ErrorMessage text={errrorText} />
            }
        </main>
    )
}
