import DayTask from "../components/day-task";
import Input from "../components/ui/input";
import usertag from "/images/usertag.png"
import lock1 from "/images/lock1.png"
import userImage from "/images/user.png"
import ticksquare from "/images/ticksquare.png"
import showPassword from "/images/show-password.png"
import { Link } from "react-router-dom";
import Button from "../components/ui/button";

export default function SignUp(){
    return(
        <main className="bg-primary-black-100 p-8 md:p-12 w-full min-h-screen ">
            <section className="grid content-start grid-cols-1 lg:w-[40%] m-auto pb-12 md:pb-4 lg:justify-center lg:align-top">

                {/* dayli task logo */}
                <DayTask justify="justify-center"/>

                {/* welcome back heading */}
                <h2 className="text-2xl text-primary-pure-white mt-8">Create your account</h2>

                {/* inputs container */}
                <form>
                    <Input type="text" htmlFor="username" placehoolder="Fazil Laghari" text="Full Name" leftImage={userImage} />
                    <Input type="email" htmlFor="email" placehoolder="fazzzil72@gmail.com" text="Email Address" leftImage={usertag} />
                    <Input type="Password" htmlFor="Password" placehoolder="Password" text="Password" leftImage={lock1}  rightImage={showPassword} />

                    <p className="flex justify-end mt-1 text-primary-blue-100 text-[14px] ">
                        <Link to={'/reset-password'}>Forgot Password?</Link>
                    </p>
                    {/* sign up button congainer */}
                    <div className="bg-primary-yellow-100 cursor-pointer text-xl p-2 mt-4">
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
        </main>

    )
}