import { ChangeClassType, ClassT } from "../../types/class";
import { useEffect } from "react";
import { Button, Checkbox, Form, Input } from "antd";
import Title from "antd/es/typography/Title";

type Props = {
    onChangeClass:(data:ChangeClassType) => void,
    classes:ClassT[],
    pickedClass?:ClassT | null
}

export const ChangeClassForm:React.FC<Props> = ({onChangeClass,classes,pickedClass}) => {
    const [form] = Form.useForm();
    console.log('t',pickedClass)
    const onSubmit = (data: ChangeClassType) => {
        onChangeClass(data);
        form.resetFields();
    }
    useEffect(() => {
        form.setFieldsValue({number:pickedClass?.number,isActive:pickedClass?.isActive});
    },[pickedClass]);

    return <Form onFinish={onSubmit} form={form} disabled={!pickedClass} autoComplete={'off'}>
        <Title level={4}>Change class</Title>
        <Form.Item
            label="Номер"
            name="number"
            rules={[{ required: true, message: 'Please input class number!' }]}
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
                Submit
            </Button>
        </Form.Item>
    </Form>
}