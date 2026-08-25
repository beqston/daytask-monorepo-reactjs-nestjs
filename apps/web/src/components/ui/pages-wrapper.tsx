import React from "react"
export default function PagesWrapper({children}:{children:React.ReactNode}){
    return(
        <main className='bg-primary-black-100 min-h-screen'>
            <section className='w-full lg:w-[50%] m-auto p-4 relative pb-28'>
                {children}
            </section>
        </main>
    )
}