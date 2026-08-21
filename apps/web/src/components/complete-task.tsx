import ellipse1 from '/images/home/team-members/Ellipse1.png'
import ellipse2 from '/images/home/team-members/Ellipse2.png'
import ellipse3 from '/images/home/team-members/Ellipse3.png'
import ellipse4 from '/images/home/team-members/Ellipse4.png'
import ellipse5 from '/images/home/team-members/Ellipse5.png'

interface CompleteTaskProps{
    bgColor?:string;
    isCompleted?:boolean;
    parcentage?:number;
}
export default function CompleteTask({bgColor="#FED36A", isCompleted=false, parcentage=0,}:CompleteTaskProps){
    return(
        <div className={`mt-4 bg-[${bgColor}] text-${isCompleted?'white':'black'} overflow-hidden border-2 shrink flex-1 p-2 border-white min-w-[80%] lg:min-w-58`}>
            <h3 className={`text-3xl font-bold `}>Real Estate Website</h3>

            <div className='flex gap-4'>
                <p className='text-primary-black-200'>Team members</p>
                <div className='flex gap-1'>
                    <img width={14} height={10} className='rounded-[50%] ' src={ellipse1} alt="members"/>
                    <img width={14} height={10} className='rounded-[50%] ' src={ellipse2} alt="members"/>
                    <img width={14} height={10} className='rounded-[50%] ' src={ellipse3} alt="members"/>
                    <img width={14} height={10} className='rounded-[50%] ' src={ellipse4} alt="members"/>
                    <img width={14} height={10} className='rounded-[50%] ' src={ellipse5} alt="members"/>
                </div>
            </div>

               <div className="w-full">
            <div className="flex justify-between mb-1 text-sm font-medium mt-4 text-primary-black-200">
                <span>Completed</span>
                <span>{parcentage}%</span>
            </div>
            <progress
                value={parcentage}
                max={100}
                className="w-full h-2.5 rounded-full overflow-hidden
                        [&::-webkit-progress-bar]:#212832
                        [&::-webkit-progress-value]:bg-white
                        [&::-moz-progress-bar]:bg-[#212832]
                        bg-white"
            />
            </div>
        </div>
    )
}