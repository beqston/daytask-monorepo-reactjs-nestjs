import profile from '/images/home/profile.png'
import search from '/images/home/search.png'
import setting from '/images/home/setting.png'
export default function Home(){
    return(
        <main className='bg-primary-black-100 min-h-screen'>

            <section className='w-full lg:w-[50%] m-auto p-4'>
                {/* head of home page*/}
                <div className='flex justify-between m-4 content-center'>
                    <div>
                        <p className='text-primary-yellow-100'>Welcome Back!</p>
                        <h2 className='text-primary-pure-white text-3xl'>Fazil Lagar</h2>
                    </div>

                    <div>
                        <img width={48} height={48} src={profile} alt='profile' />
                    </div>
                </div>

                {/* input container */}

                <div className='grid  grid-cols-[1fr_58px] gap-2 p-4 '>
                    <div className='h-14.5 relative'>
                        <img src={search} alt="search" width={24} height={24} className='absolute  left-4 top-4' />
                        <input className='bg-light-blue-100 text-white w-full h-full pl-14' type="text" name="search" id="search"  placeholder='Seach tasks'/>
                    </div>
                    
                    {/* filter container */}
                    <div className='w-14.5 h-14.5 bg-primary-yellow-100 flex justify-center items-center cursor-pointer '>
                        <img width={24} height={24} src={setting} alt='filter' />
                    </div>
                </div>
            </section>

        </main>
    )
}