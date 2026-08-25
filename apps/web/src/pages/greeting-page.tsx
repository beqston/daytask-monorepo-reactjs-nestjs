import { Link } from "react-router-dom"
import letsStart from "/images/lets-start.png"
import Button from "../components/ui/button"
import DayTask from "../components/day-task"

export default function GreetingPage(){
    return( 
        <div className="bg-primary-black-100 p-8 w-full min-h-screen grid content-between pb-12 md:pb-4 lg:justify-center lg:align-top">
            <DayTask justify="justify-start"/>

            <div className="mt-8">
                <img src={letsStart} alt="lets-start" />
            </div>

            <h2 className="text-primary-pure-white text-4xl mt-4">Manage Your Task With <span className="text-primary-yellow-100">DayTask</span></h2>
        
            <div className="bg-primary-yellow-100 mt-4 cursor-pointer text-2xl p-4 lg:p-7">
                <Link to={'/sign-in'}>
                    <Button bgColor="primary-yellow-100" color="primary-pure-black" text="Let’s Start"/>
                </Link>
            </div>
        </div>
    )
}