import React from "react"
export default function PagesWrapper({children}:{children:React.ReactNode}){
    return(
        <main className='min-h-screen bg-primary-grey-300'>
            <section className='w-full min-h-screen lg:w-[50%] bg-primary-black-100  m-auto p-4 relative pb-28'>
                {children}
            </section>
        </main>
    )
}