import { Link } from 'react-router-dom'
import profile from '/images/home/profile.png'

export default function HomeHead(){
    return(
        <div className='flex justify-between mt-8 content-center'>
            <div>
                <p className='text-primary-yellow-100'>Welcome Back!</p>
                <h2 className='text-primary-pure-white text-3xl font-bold'>Fazil Lagar</h2>
            </div>

            <div>
                <Link to={'/profile'}><img width={48} height={48} src={profile} alt='profile' /></Link>
            </div>
        </div>
    )
}