import { useState } from "react";
import { Form, Input, Title, Wrapper } from "../components/auth-components";

export default function Password(){
    const [email,setEmail] = useState("");
    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const{target:{name,value}} = e;
        if (name ==="email"){
            setEmail(value)
        }
    }; 
    return <Wrapper>
        <Title>Reset Password to X</Title>
        <Form>
        <Input onChange={onChange} name="email" value={email} placeholder="Email" type="email" required/>
        </Form>
    </Wrapper>

}