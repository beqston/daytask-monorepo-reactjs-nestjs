import Elementequal from "../../assets/icons/elementequal.svg?react"
import Microphone from "../../assets/icons/microphone.svg?react"
import Send from "../../assets/icons/send.svg?react"

export default function SendMessage(){
    return(
        <div className="fixed w-full bottom-8 lg:w-1/2 min-h-12 grid grid-cols-[9fr_1fr] gap-x-4 items-center">

            {/* write text container */}
            <div className="bg-primary-blue-200 flex p-4">
                <Elementequal className="float-left text-primary-blue-100 hover:text-primary-yellow-100 transition-colors duration-200 cursor-pointer"/>
                <input type="text" placeholder="Type a message" name="message" className="ml-4 outline-0 w-full h-full text-primary-blue-100 placeholder:text-primary-blue-100" />
                <Microphone className="float-right text-primary-blue-100 hover:text-primary-yellow-100 transition-colors duration-200 cursor-pointer" />
            </div>

            {/* send message button container */}
            <div className="bg-primary-blue-200 p-4 flex justify-center items-center">
                <Send className="text-primary-blue-100 hover:text-primary-yellow-100 transition-colors duration-200 cursor-pointer"/>
            </div>

        </div>
    )
}