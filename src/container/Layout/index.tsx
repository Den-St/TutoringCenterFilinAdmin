import React from "react"
import { NavPanel } from "../../components/NavPanel"
import { useAppSelector } from "../../hooks/redux"
import { Container } from "./styles";

export const Layout:React.FC<{children:React.ReactNode}> = ({children}) => {
    const isAuthed = !!useAppSelector(state => state.user.id);

    return <Container $isAuthed={isAuthed}>
        {isAuthed && <NavPanel/>}
        {children}
    </Container>
}