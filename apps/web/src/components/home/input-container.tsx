import search from '/images/home/search.png'
import setting from '/images/home/setting.png'

export default function InputContainer(){
    return(
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
    )
}