import InputsWrapper from "../components/profile/inputs-wrapper";
import ProfileHead from "../components/profile/profile-head";
import ProfileImageContainer from "../components/profile/profile-image-container";
import PagesWrapper from "../components/ui/pages-wrapper";

export default function Profile(){
    return(
        <PagesWrapper>
            <ProfileHead />
            <ProfileImageContainer />
            <InputsWrapper />
        </PagesWrapper>
    )
}