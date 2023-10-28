import { useLogin } from "../../hooks/login.hook";
import { LoginInterface } from "../../types/login";
import { useForm } from "react-hook-form";
import { Navigate } from "react-router-dom";
import { adminNavRoutes } from "../../consts/routes";
import { useAppSelector } from "../../hooks/redux";
import { Container, Form, Input } from "./styles";

export const Login = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
        watch,
    } = useForm<LoginInterface>();
    const {onSubmit,showError,signInWithGoogle,success,contextHolder} = useLogin();
    const userId = useAppSelector(state => state.user?.id);

    if(success || userId) <Navigate to={adminNavRoutes.classes.route}/>;
    
    return <Container>
        {contextHolder}
        <Form onSubmit={handleSubmit(onSubmit)}>
            <Input {...register('email')} placeholder="email" type="email" />
            <Input {...register('password',{minLength:6})} type={'password'} placeholder="password" />
            <Input type={'submit'} value="SUBMIT"/>
        </Form>
        <button onClick={signInWithGoogle}>GOOGLE</button>
    </Container>
}