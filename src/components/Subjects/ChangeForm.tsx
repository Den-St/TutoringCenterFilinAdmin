import { ChangeClassType, ClassT } from "../../types/class";
import { useEffect } from "react";
import { Button, Checkbox, Form, Input } from "antd";
import Title from "antd/es/typography/Title";
import { ChangeSubjectT, SubjectT } from "../../types/subject";

type Props = {
    onChangeItem:(data:ChangeSubjectT) => void,
    pickedItem?:SubjectT | null
}

export const ChangeClassForm:React.FC<Props> = ({onChangeItem,pickedItem}) => {
    const [form] = Form.useForm();
    const onSubmit = (data: ChangeSubjectT) => {
        onChangeItem(data);
        form.resetFields();
    }
    useEffect(() => {
        form.setFieldsValue({name:pickedItem?.name,isActive:pickedItem?.isActive});
    },[pickedItem]);

    return <Form onFinish={onSubmit} form={form} disabled={!pickedItem} autoComplete={'off'}>
        <Title level={4}>Змінити предмет</Title>
        <Form.Item
            label="Назва"
            name="name"
            rules={[{ required: true, message: 'Введіть назву' }]}
        >
            <Input/>
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
                Submit
            </Button>
        </Form.Item>
    </Form>
}