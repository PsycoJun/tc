import { styled } from "styled-components";
import PostTweetForm from "../components/post-tweet-form";


const Wrapper = styled.div``;

export default function home(){
    return (
        <Wrapper>
        <PostTweetForm/>
        </Wrapper>
    )

}