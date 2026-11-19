import React from "react"
import { useAppSelector } from "../../store/hooks"
export default function PagesWrapper({children}:{children:React.ReactNode}){
    const {theme } = useAppSelector(state=>state.theme);
    return(
        <main className={`min-h-screen ${theme=="Dark"?"bg-primary-grey-300":"bg-primary-pure-white"}`}>
            <section className={`w-full min-h-screen lg:w-[70%] xl:w-[50%] ${theme=="Dark"?"bg-primary-black-100":"bg-primary-blue-100"} m-auto p-4 md:px-14 relative pb-28`}>
                {children}
            </section>
        </main>
    )
}