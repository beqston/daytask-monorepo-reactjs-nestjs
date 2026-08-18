import LoginLayout from "./login-layout";
import ProtectedLayout from "./protected-layout";

export default function Layout(){
    let isLogin = true;

    return isLogin? <ProtectedLayout />:<LoginLayout/>
}