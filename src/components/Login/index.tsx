import { useLogin } from "../../hooks/login.hook";
import { LoginInterface } from "../../types/login";
import { useForm } from "react-hook-form";
import { Navigate } from "react-router-dom";
import { adminNavRoutes } from "../../consts/routes";
import { useAppSelector } from "../../hooks/redux";
import { Container } from "./styles";
import { Button, Form, Input } from "antd";
import Title from "antd/es/typography/Title";

export const Login = () => {
    const {onSubmit,success,contextHolder} = useLogin();
    const userId = useAppSelector(state => state.user?.id);

    if(success || userId) return <Navigate to={adminNavRoutes.classes.route}/>;
    
    return <Container>
        {contextHolder}
         <Form onFinish={onSubmit} autoComplete={'off'}>
            <Title level={4}>Login</Title>
            <Form.Item
                label="Email"
                name="email"
                rules={[{ required: true, message: 'Please input email!' }]}
            >
                <Input type={'email'} placeholder={'email'}/>
            </Form.Item>
            <Form.Item
                label="Password"
                name="password"
                rules={[{ required: true, message: 'Please input password!' }]}
            >
                <Input type={"password"} placeholder={'placeholder'} />
            </Form.Item>
            <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                <Button type="primary" htmlType="submit">
                    Submit
                </Button>
            </Form.Item>
        </Form>
    </Container>
}