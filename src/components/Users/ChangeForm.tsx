import { ChangeClassType, ClassT } from "../../types/class";
import { useEffect } from "react";
import { Button, Checkbox, Form, Input } from "antd";
import Title from "antd/es/typography/Title";
import { ChangeUserT, UserT } from "../../types/user";

type Props = {
    onChangeItem:(data:ChangeUserT) => void,
    pickedItem?:UserT | null
}

export const ChangeUserForm:React.FC<Props> = ({onChangeItem,pickedItem}) => {
    const [form] = Form.useForm();

    const onSubmit = (data: ChangeUserT) => {
        onChangeItem(data);
        form.resetFields();
    }
    useEffect(() => {
        form.setFieldsValue({...pickedItem});
    },[pickedItem]);

    return <Form onFinish={onSubmit} form={form} disabled={!pickedItem} autoComplete={'off'}>
        <Title level={4}>Змінити користувача</Title>
        <Form.Item
            label="Вчитель"
            name="isTeacher"
            valuePropName="checked"
        >
            <Checkbox/>
        </Form.Item>
        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button type="primary" htmlType="submit">
                Створити
            </Button>
        </Form.Item>
    </Form>
}