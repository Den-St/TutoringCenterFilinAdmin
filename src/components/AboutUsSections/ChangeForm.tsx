import { ChangeClassType, ClassT } from "../../types/class";
import { useEffect } from "react";
import { Button, Checkbox, Form, Input } from "antd";
import Title from "antd/es/typography/Title";
import { AboutUsSectionT, ChangeAboutUsSectionT } from "../../types/aboutUsSection";
import ReactQuill from "react-quill";
import './styles.scss';
import 'react-quill/dist/quill.snow.css';

type Props = {
    onChangeItem:(data:ChangeAboutUsSectionT) => void,
    pickedItem?:AboutUsSectionT | null
}

export const ChangeAboutUsSectionsForm:React.FC<Props> = ({onChangeItem,pickedItem}) => {
    const [form] = Form.useForm();
    const text = Form.useWatch('text',form);

    const onSubmit = (data: ChangeAboutUsSectionT) => {
        onChangeItem(data);
        form.resetFields();
    }
    useEffect(() => {
        form.setFieldsValue({...pickedItem});
    },[pickedItem]);
    const onChangeText = (value?:string) => {
        form.setFieldValue('text',value);
    }
    return <Form onFinish={onSubmit} form={form} disabled={!pickedItem} autoComplete={'off'}>
        <Title level={4}>Змінити секцію "про нас"</Title>
        <Form.Item
            label="Номер"
            name="number"
            rules={[{ required: true, message: 'Будь ласка введіть номер!' }]}
        >
            <Input type="number"/>
        </Form.Item>
        <Form.Item
            label="Назва"
            name="name"
            rules={[{ required: true, message:'Будь ласка введіть назву!'}]}
        >
            <Input/>
        </Form.Item>
        <Form.Item
            label='Текст'
            name='text'
        >
        </Form.Item>
        <ReactQuill onChange={onChangeText} value={text} placeholder='Введіть текст'/>
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