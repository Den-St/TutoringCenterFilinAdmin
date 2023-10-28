import { styled } from "styled-components";

export const Container = styled.main`
    width:100%;
    height:100%;
    display:flex;
    flex-direction:column;
    align-items:center;
    justify-content:center;
`;

export const Form = styled.form`
    display:flex;
    flex-direction:column;
    gap:10px;
    align-items:center;
    border:1px solid black;
    padding:15px;
    border-radius:5px;
`;

export const Input = styled.input`
    height:40px;
    width:250px;
    border-radius:5px;
    font-size:20px;
`;

export const SubmitButton = styled.input`

`;