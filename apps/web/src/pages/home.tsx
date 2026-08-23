import { Link } from 'react-router-dom'
import profile from '/images/home/profile.png'
import search from '/images/home/search.png'
import setting from '/images/home/setting.png'
import CompleteTask from '../components/complete-task'
import ProjectsContaiiner from '../components/projects'
import Navbar from '../components/navbar'
export default function Home(){
    return(
        <main className='bg-primary-black-100 min-h-screen'>

            <section className='w-full lg:w-[50%] m-auto p-4 relative pb-28'>
                {/* head of home page*/}
                <div className='flex justify-between mt-8 content-center'>
                    <div>
                        <p className='text-primary-yellow-100'>Welcome Back!</p>
                        <h2 className='text-primary-pure-white text-3xl font-bold'>Fazil Lagar</h2>
                    </div>

                    <div>
                        <img width={48} height={48} src={profile} alt='profile' />
                    </div>
                </div>

                {/* input container */}
                <div className='grid  grid-cols-[1fr_58px] gap-2 mt-8'>
                    <div className='h-14.5 relative'>
                        <img src={search} alt="search" width={24} height={24} className='absolute  left-4 top-4' />
                        <input className='bg-light-blue-100 text-white w-full h-full pl-14' type="text" name="search" id="search"  placeholder='Seach tasks'/>
                    </div>
                    
                    {/* filter container */}
                    <div className='w-14.5 h-14.5 bg-primary-yellow-100 flex justify-center items-center cursor-pointer '>
                        <img width={24} height={24} src={setting} alt='filter' />
                    </div>
                </div>

                {/* complete task head */}
                <div className='flex justify-between mt-8'>
                    <h3 className='text-primary-pure-white text-3xl font-bold'>Completed Tasks</h3>
                    <Link className='text-primary-yellow-100' to={'/home'}>See all</Link>
                </div>

                {/* complete tasks */}
                <div className='m-2 flex gap-2 overflow-hidden'>
                    <CompleteTask title='Real Estate Website'/>
                    <CompleteTask title='Finance Mobile App Desing' />
                    <CompleteTask title='Real Finance Task' />
                </div>

                {/* ongoing projects */}
                <div className='flex justify-between mt-8'>
                    <h3 className='text-primary-pure-white text-3xl font-bold'>Ongoing Projects</h3>
                    <Link className='text-primary-yellow-100' to={'/home'}>See all</Link>
                </div>
                {/* ongoing projects container */}
                <ProjectsContaiiner title='Mobile App Wireframe' percentage={75} />
                <ProjectsContaiiner title='Real Estate Desings App' percentage={70} />
                <ProjectsContaiiner title='Dashboards & App Desings' percentage={40} />
                <Navbar />
            </section>

        </main>
    )
}