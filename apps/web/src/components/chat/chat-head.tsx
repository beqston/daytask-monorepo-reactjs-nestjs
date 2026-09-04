import arrowleft from '/images/arrowleft.png'
import profile from '/images/profile1.png'
import videoCall from '/images/chat/video.png'
import audioCall from '/images/chat/call.png'
import { Link } from 'react-router-dom';


interface ChatHeadProps{
    username:string;
    isActive:boolean;
}

export default function ChatHead({username, isActive}:ChatHeadProps){
    return(
        <div className='grid grid-cols-[3fr_2fr] pt-8'>
            {/* arrow and user's info container */}
            <div className='grid grid-cols-[1fr_4fr] items-center'>
                {/* arrow image container */}
                <div>
                    <Link to={'/messages'}><img src={arrowleft} alt="arrow-icon" /></Link>
                </div>

                {/* user's info */}
                <div className='grid grid-cols-[47px_1fr] overflow-hidden gap-x-4'>
                    <div className='max-w-11.75'>
                        <img className='object-fill w-full h-full' src={profile} alt="profile-image" />
                    </div>

                    <div>
                        <p className='text-primary-pure-white text-nowrap'>{username}</p>
                        <p className='text-primary-grey-100'>{isActive?"Online":"offline"}</p>
                    </div>
                    <div>
                    </div>

                </div>

            </div>

            {/* call container */}
            <div className='flex gap-4 justify-end pr-4 items-center'>
                <div>
                    <img src={videoCall} alt="video-call" />
                </div>
                <div>
                    <img src={audioCall} alt="audio-call" />
                </div>
            </div>
        </div>
    )
}