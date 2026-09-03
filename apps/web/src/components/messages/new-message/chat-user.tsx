interface ChatUserProps{
    name:string;
    image:string;
    isNewAlphabet:boolean;
    alphabet?:string;
}

export default function ChatUser({name, image, isNewAlphabet, alphabet}:ChatUserProps){
    return(
        <div className="flex justify-between items-center mt-4 ">
            <div className="flex gap-4 py-1 items-center ">
                <div className="w-14 h-14 rounded-full overflow-hidden shrink-0">
                    <img src={image} alt="profiile-image" className="w-full h-full object-cover "/>
                </div>

                <p className="text-primary-pure-white">{name}</p>
            </div>

            {
                isNewAlphabet && <span className="text-primary-yellow-100 text-xl">{alphabet}</span>
            }

        </div>
    )
}