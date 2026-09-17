import DayTask from "../components/day-task";
import Input from "../components/ui/input";
import usertag from "/images/usertag.png"
import lock1 from "/images/lock1.png"
import userImage from "/images/user.png"
import ticksquare from "/images/ticksquare.png"
import showPassword from "/images/show-password.png"
import { Link, useNavigate } from "react-router-dom";
import Button from "../components/ui/button";
import { useState } from "react";
import { Loading } from "../components/ui/loading";

export default function SignUp(){

    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        fullname:"",
        email:"",
        password:""
    });
    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    function handleChange(e:React.ChangeEvent<HTMLInputElement>){
        const { name, value } = e.target;
        setFormData((prev)=> ({
            ...prev,
            [name]:value
        }))
    }

    async function handleSubmit(e: React.FormEvent){
        e.preventDefault();
        try {
            setLoading(true);
            const res = await fetch("/api/v1/users", {
                method:"POST",
                body:JSON.stringify(formData)
            });

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.message || "Something went wrong");
            }

            navigate('/sign-in')
        } catch (err:any) {
            setErrorMessage("Please enter al value");

        }finally{
            setLoading(false);
        }
    }

    return(
        <main className="bg-primary-black-100 p-8 md:p-12 w-full min-h-screen">
            <section className="grid content-start grid-cols-1 lg:w-[40%] m-auto pb-12 md:pb-4 lg:justify-center lg:align-top">

                {/* dayli task logo */}
                <DayTask justify="justify-center"/>

                {/* welcome back heading */}
                <h2 className="text-2xl text-primary-pure-white mt-8">Create your account</h2>

                {/* inputs container */}
                <form className="flex flex-col gap-2" onSubmit={handleSubmit}>
                    <Input onChange={handleChange} type="text" htmlFor="fullname" placehoolder="Fazil Laghari" text="Full Name" leftImage={userImage} />
                    <Input onChange={handleChange} type="email" htmlFor="email" placehoolder="fazzzil72@gmail.com" text="Email Address" leftImage={usertag} />
                    <Input onChange={handleChange} type="Password" htmlFor="Password" placehoolder="Password" text="Password" leftImage={lock1}  rightImage={showPassword} />

                    <p className="flex justify-end mt-1 text-primary-blue-100 text-[14px] ">
                        <Link to={'/reset-password'}>Forgot Password?</Link>
                    </p>
                    {/* sign up button congainer */}
                    <div className="bg-primary-yellow-100 cursor-pointer text-xl text-center font-medium p-2 mt-4">
                        <Button bgColor="primary-yellow-100" color="primary-black-100" text="Sign Up"/>
                    </div>

                    {/* checkbox container */}
                    <div className="flex gap-4 mt-4 items-start">
                        <label htmlFor="checkbox" className="relative cursor-pointer">
                            <input
                                type="checkbox"
                                name="checkbox"
                                id="checkbox"
                                className="sr-only peer"
                            />
                            <img
                                width={24}
                                height={24}
                                src={ticksquare}
                                alt="tick-square"
                                className="opacity-30 peer-checked:opacity-100 transition-opacity"
                            />
                        </label>
                        <p className="text-primary-blue-100">
                            I have read & agreed to DayTask{" "}
                            <span className="text-primary-yellow-100">
                                Privacy Policy, Terms & Condition
                            </span>
                        </p>
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
                    <Link className="text-primary-yellow-100" to={'/sign-in'}>Sign In</Link>
                </div>
                
            </section>
            {loading && <Loading />}
            {errorMessage && <p className="absolute right-1 top-1 p-2 bg-white text-red-400">{errorMessage}</p>}
        </main>

    )
}