import TaskMembers from './task-members'
import ellipse1 from '/images/home/team-members/Ellipse1.png'
import ellipse2 from '/images/home/team-members/Ellipse2.png'
import ellipse3 from '/images/home/team-members/Ellipse3.png'
import ellipse4 from '/images/home/team-members/Ellipse4.png'
import ellipse5 from '/images/home/team-members/Ellipse5.png'

interface CompleteTaskProps{
    isCompleted?:boolean;
    parcentage?:number;
    title:string;
}
export default function CompleteTask({isCompleted=false, parcentage=0, title}:CompleteTaskProps){
    return(
        <div style={{backgroundColor:isCompleted?'#455A64':'#FED36A'}} className={`mt-4 text-${isCompleted?'white':'black'} overflow-hidden border-2 shrink flex-1 p-2 border-white min-w-[80%] lg:min-w-58`}>
            <div className='grid grid-rows-2'>
                {/* title of complete task */}
                <h3 className={`text-3xl font-bold `}>{title}</h3>
                {/* task information details congtainer */}
                <div className='mt-4'>
                    <div className='flex gap-4'>
                        <p className={`text-${isCompleted?'white':'primary-black-200'}`}>Team members</p>
                        
                        {/* members imgages container */}
                        <TaskMembers members={[ellipse1, ellipse2, ellipse3, ellipse4, ellipse5]} />
                    </div>

                    <div className="w-full">
                        <div className={`flex justify-between mb-1 text-sm font-medium mt-4 text-${isCompleted?'white':'primary-black-200'}`}>
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
            </div>
        </div>
    )
}