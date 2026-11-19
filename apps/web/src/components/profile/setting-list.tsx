import { useAppDispatch, useAppSelector } from "../../store/hooks"
import { changeTheme } from "../../store/slices/themSlice";

export default function SettingList(){
    const {theme} = useAppSelector(state=>state.theme);
    const dispatch = useAppDispatch();
    return(
        <div className="text-primary-pure-white flex justify-between mt-2">
            Change Theme
            <div className="flex gap-2">
                <span>Dark</span>
                <div onClick={()=>dispatch(changeTheme())} className="w-12 h-6 rounded-2xl bg-primary-yellow-100 cursor-pointer">
                    <div className={`rounded-full w-4 h-4 transition-transform duration-300 translate-y-1 ${theme=="Dark"?"translate-x-1":"translate-x-7"} bg-primary-blue-200`}></div>
                </div>
                <span>Light</span>
            </div>
        </div>
    )
}