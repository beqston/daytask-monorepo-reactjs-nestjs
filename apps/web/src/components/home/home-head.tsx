import { Link } from 'react-router-dom'
import profile from '/images/profile-default.png'
import { useAppSelector } from '../../store/hooks'

export default function HomeHead(){
    const {user} = useAppSelector((state)=>state.auth);
    return(
        <div className='flex justify-between mt-8 content-center'>
            <div>
                <p className='text-primary-yellow-100'>Welcome Back!</p>
                <h2 className='text-primary-pure-white text-3xl font-bold'>{user?.fullName}</h2>
            </div>

            <div>
                <Link to={'/profile'}><img width={48} height={48} src={user?.imageUrl ?? profile} alt='profile' /></Link>
            </div>
        </div>
    )
}