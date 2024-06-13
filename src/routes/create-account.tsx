import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { useState } from "react";
import { auth } from "./firebase";
import { Link, useNavigate } from "react-router-dom";
import { FirebaseError } from "firebase/app";
import { Form, Error, Input, Switcher, Title, Wrapper } from "../components/auth-components";
import GithubButton from "../components/github-btn";


export default function CreateAccount(){

    const[isLoading,setLoading] = useState(false);
    const[name,setName] = useState("");
    const[email,setEmail] = useState("");
    const[password,setPassword] = useState("");
    const[error,setError] = useState("");
    const navigate = useNavigate();
    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const{target:{name,value}} = e;
        if(name==="name"){
            setName(value)
        } else if (name ==="email"){
            setEmail(value)
        } else if (name ==="password"){
            setPassword(value)
        }

    };
    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) =>{
        e.preventDefault();
        setError("");
        if(isLoading || name===""|| email===""|| password==="")return;

        try{
            setLoading(true);
            const credentials = await createUserWithEmailAndPassword(auth,email,password);
            console.log(credentials.user);
            await updateProfile(credentials.user,{displayName: name,});
            navigate("/")
        //create an account
        //set the name of the user
        //reedirect tot the home page
        }catch(e){
            if(e instanceof FirebaseError){
                setError(e.message)
            }
        }finally{
            setLoading(false);
        }
        console.log(name,email,password);

    }
    return <Wrapper>
        <Title>Join X</Title>
        <Form onSubmit={onSubmit}>
            <Input onChange={onChange} name ="name" value={name} placeholder="Name" type="text" required/>
            <Input onChange={onChange} name="email" value={email} placeholder="Email" type="email" required/>
            <Input onChange={onChange} name="password" value={password} placeholder="Password" type="password" required/>
            <Input onChange={onChange} type="submit" value={isLoading ? "Loading": "create-account"}/>
        </Form>
        {error !=="" ? <Error>{error}</Error>:null}
        <Switcher>Already have an account?{""} <Link to ="/login">Log in&rarr;</Link></Switcher>
        <Switcher>Do you forget your password?{""} <Link to ="/password">Get Password</Link></Switcher>
        <GithubButton/>
    </Wrapper>
}