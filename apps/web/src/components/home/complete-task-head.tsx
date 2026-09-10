import { Link } from "react-router-dom";

export default function CompleteTaskHead(){
    return(
        <div className='flex justify-between mt-8'>
            <h3 className='text-primary-pure-white text-3xl font-bold'>Completed Tasks</h3>
            <Link className='text-primary-yellow-100' to={'/home'}>See all</Link>
        </div>
    )
}