import { auth } from "./firebase"

export default function home(){
    const logOut = () => {
        auth.signOut();
    }
    return <h1><button onClick={logOut}>Log Out</button></h1>

}