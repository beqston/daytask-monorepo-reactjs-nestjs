import ProjectProgress from '../project-progress';
import ellipse1 from '/images/home/team-members/Ellipse1.png'
import ellipse2 from '/images/home/team-members/Ellipse2.png'
import ellipse3 from '/images/home/team-members/Ellipse3.png'

interface ProjectPorops{
    title:string;
    percentage:number;
}
export default function ProjectContaiiner({title, percentage}:ProjectPorops){
    return(
        <article className='text-primary-pure-white bg-light-blue-100 flex flex-col gap-8 p-8 mt-8 '>
            <h2 className='text-3xl'>{title}</h2>
            <div className="flex justify-between">
                <div className="flex flex-col gap-2">
                    <p className='text-xl'>Team members</p>
                    <div className='flex relative w-full'>
                        <img width={24} height={24} className='rounded-[50%]' src={ellipse1} alt="members"/>
                        <img width={24} height={24} className={`rounded-[50%] absolute left-3`} src={ellipse2} alt="members"/>
                        <img width={24} height={24} className={`rounded-[50%] absolute left-6`} src={ellipse3} alt="members"/>
                    </div>

                    <p className='text-xl'>Due on:20 June</p>

                </div>

                {/* progress  */}
                <ProjectProgress percentage={percentage} />
            </div>
        </article>
    )
}