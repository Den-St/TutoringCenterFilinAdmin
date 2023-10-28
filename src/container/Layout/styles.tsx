import { styled } from "styled-components";

export const Container = styled.div<{$isAuthed:boolean}>`
   display:flex;
   width:100vw;
   height:100vh;
   ${({$isAuthed}) => $isAuthed && `paddingLeft:200px;`}
`;