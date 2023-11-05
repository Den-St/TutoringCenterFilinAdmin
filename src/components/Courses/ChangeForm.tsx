import { ChangeCourseT, CourseT } from "../../types/course";
import { Button, Checkbox, Form, Input, Select, TimePicker } from "antd";
import Title from "antd/es/typography/Title";
import { useSearchClass } from "../../hooks/searchClassNumber";
import { useEffect } from "react";
import { ClassT } from "../../types/class";
const {Option} = Select;

type Props = {
    onChangeItem:(data:ChangeCourseT) => void,
    pickedItem?:CourseT | null
    chosenClass:ClassT | null
    onChangeClass:(stringified:string) => void
}

export const ChangeItemForm:React.FC<Props> = ({onChangeItem,pickedItem,onChangeClass,chosenClass}) => {
    const {debounceSearchClass,classesItems,classSearchLoading} = useSearchClass();
    const [form] = Form.useForm<ChangeCourseT>();

    useEffect(() => {
        if(!pickedItem) return;
        form.setFieldsValue({...pickedItem,class:JSON.stringify(pickedItem?.class)});
        onChangeClass(JSON.stringify(pickedItem?.class));
    },[pickedItem]);

    return <Form onFinish={onChangeItem} form={form} disabled={!pickedItem} autoComplete={'off'}>
        <Title level={4}>Change course</Title>
        <Form.Item
            label="Номер класу"
            name="class"
            rules={[{ required: true, message: 'Оберіть клас!' }]}
        >
              <Select 
                onSearch={debounceSearchClass}
                showSearch={true}
                loading={classSearchLoading}
                value={chosenClass ? JSON.stringify(chosenClass) : ''}
                onChange={onChangeClass}
                >
                    {classesItems?.length ? classesItems.map(classItem => 
                        <Option key={classItem.id} value={JSON.stringify(classItem)}>
                            {classItem.number}
                        </Option>
                    ) : pickedItem?.class &&
                    <Option key={pickedItem?.class?.id} value={JSON.stringify(pickedItem?.class)}>
                        {pickedItem?.class?.number}
                    </Option>}
            </Select>  
        </Form.Item>
        <Form.Item
            label="Опис"
            name="description"
            rules={[{ required: true, message: 'Please input description of course!' }]}
        >
            <Input.TextArea autoSize={true}  />
        </Form.Item>
        <Form.Item
            label="Коротка назва"
            name="shortName"
            rules={[{ required: true, message: 'Please input short name of course!' }]}
        >
            <Input.TextArea autoSize={true}  />
        </Form.Item>
        <Form.Item
            label="Друга назва"
            name="secondName"
            rules={[{ required: true, message: 'Please input second name of course!' }]}
        >
            <Input.TextArea autoSize={true}  />
        </Form.Item>
        <Form.Item
            label="Активний"
            name="isActive"
            valuePropName="checked"
        >
            <Checkbox/>
        </Form.Item>
        <Form.Item
            style={{display:'none'}}
            label="Created time"
            name="createdAt"
            valuePropName="checked"
        >
            <TimePicker disabled/>
        </Form.Item>
        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button type="primary" htmlType="submit">
                Submit
            </Button>
        </Form.Item>
    </Form>
}