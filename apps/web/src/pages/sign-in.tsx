import DayTask from "../components/day-task";
import Input from "../components/input";
import usertag from "/images/usertag.png"
import lock1 from "/images/lock1.png"
import showPassword from "/images/show-password.png"
import { Link } from "react-router-dom";
import Button from "../components/button";

export default function SignIn(){
    return(
        <main className="bg-primary-black-100 p-8 md:p-12 w-full min-h-screen ">
            <section className="grid content-start grid-cols-1 lg:w-[40%] m-auto pb-12 md:pb-4 lg:justify-center lg:align-top">

                <DayTask justify="justify-center"/>

                <h2 className="text-2xl text-primary-pure-white mt-8">Welcome Back!</h2>

                <div>
                    <Input type="email" htmlFor="email" placehoolder="fazzzil72@gmail.com" text="Email Address" leftImage={usertag} />
                    <Input type="Password" htmlFor="Password" placehoolder="Password" text="Password" leftImage={lock1}  rightImage={showPassword} />

                    <p className="flex justify-end mt-1 text-primary-blue-100 text-[14px] ">
                        <Link to={'/reset-password'}>Forgot Password?</Link>
                    </p>

                    <div className="bg-primary-yellow-100 cursor-pointer text-xl p-2 mt-4">
                        <Button bgColor="primary-yellow-100" color="primary-black-100" text="Log In"/>
                    </div>
                </div>
                
                
            </section>
        </main>

    )
}