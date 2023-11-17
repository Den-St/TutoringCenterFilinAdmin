import { ChangeClassType, ClassT } from "../../types/class";
import { useEffect } from "react";
import { Button, Checkbox, Form, Input } from "antd";
import Title from "antd/es/typography/Title";

type Props = {
    onChangeClass:(data:ChangeClassType) => void,
    pickedClass?:ClassT | null
}

export const ChangeClassForm:React.FC<Props> = ({onChangeClass,pickedClass}) => {
    const [form] = Form.useForm();
    const onSubmit = (data: ChangeClassType) => {
        onChangeClass(data);
        form.resetFields();
    }
    useEffect(() => {
        form.setFieldsValue({number:pickedClass?.number,isActive:pickedClass?.isActive});
    },[pickedClass]);

    return <Form onFinish={onSubmit} form={form} disabled={!pickedClass} autoComplete={'off'}>
        <Title level={4}>Змінити клас</Title>
        <Form.Item
            label="Номер"
            name="number"
            rules={[{ required: true, message: 'Введіть клас' }]}
        >
            <Input type="number"/>
        </Form.Item>
        <Form.Item
            label="Активний"
            name="isActive"
            valuePropName="checked"
        >
            <Checkbox/>
        </Form.Item>
        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button type="primary" htmlType="submit">
                Змінити
            </Button>
        </Form.Item>
    </Form>
}