import { useState } from "react";
import { Container, Form, Input, Title, Wrapper,Error } from "../components/auth-components";
import { auth } from "./firebase";
import { styled } from "styled-components";
import { fetchSignInMethodsForEmail, sendPasswordResetEmail, signInWithEmailAndPassword } from "firebase/auth";
import { FirebaseError } from "firebase/app";

const Button = styled.span`
background-color:white;
font-weight:500;
padding:10px 20px;
border-radius : 50px;
border:0;
display:flex;
color:black;
margin-top:20px;
width:50%;
gap:5px;
align-items:center;
justify-content:center;
cursor:pointer;
&:hover,&:active{ opacity:0.9;
}

`;
export default function Password(){
    const [email,setEmail] = useState("");
    const [error, setError] = useState("");
    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const{target:{name,value}} = e;
        
        if (name ==="email"){
            setEmail(value)
            setError("");
        }
    }; 
    const onClick =async() => {
        
        try{
            const signInMethods = await fetchSignInMethodsForEmail(auth, email);
            if (signInMethods.length === 0) {
            setError('가입되지 않은 이메일입니다.');
            return;
            }
            await sendPasswordResetEmail(auth,email)
        }catch(e){
            if(e instanceof FirebaseError){
                // if(e.message === "Firebase: Error (auth/missing-email).")
                //     {setError("이메일을 입력해주세요")}
                // else if(e.message === "Firebase: Error (auth/invalid-email)."){
                //     setError("잘못된 이메일 형식입니다.")
                // };
                setError(e.message)    
            }
        }
    };
    return <Wrapper>
        <Title>Reset Password</Title>
        <Form>
        
        <Input onChange={onChange} name="email" value={email} placeholder="Email" type="email" required/>
        <Container>{error !=="" ? <Error>{error}</Error>:null}</Container>
        <Container>
            
            <Button onClick={onClick}>Send Reset Email</Button></Container>
        </Form>
    </Wrapper>

}