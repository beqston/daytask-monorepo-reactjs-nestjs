import { useState } from "react";
import type { ProfileDetailsProps } from "../../types/profile-details-props";
import ProfileDetail from "./profile-detail";
import PrivacyList from "./privacy-list";

export default function PrivacyContainer({leftImage, rightImage}:ProfileDetailsProps){
    const[showPrivacy, setShowPrivacy] = useState(false);

    function handleShowPrivacy(){
        setShowPrivacy(prev=>!prev);
    }

    return(
        <>
            <ProfileDetail onClick={handleShowPrivacy} leftImage={leftImage} value="Privacy" rightImage={rightImage}/>
            <PrivacyList />
        </>
    )
}