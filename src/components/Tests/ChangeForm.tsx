import { useEffect } from "react";
import { Button, Checkbox, Form, Input, Select, Space, TimePicker } from "antd";
import Title from "antd/es/typography/Title";
import { ChangeCourseThemeT, CourseThemeT } from "../../types/courseThemes";
import { useSearchCourse } from "../../hooks/searchCourse";
import { CourseT } from "../../types/course";
import {MinusCircleOutlined,PlusOutlined} from '@ant-design/icons';
import { ChangeTestProductT, TestProductT } from "../../types/tests";
const {Option} = Select;

type Props = {
    onChangeItem:(data:ChangeTestProductT) => void,
    pickedItem?:TestProductT | null,
    chosenCourse:CourseT | null
    onChangeCourse:(stringified:string) => void
}

export const ChangeItemForm:React.FC<Props> = ({onChangeItem,pickedItem,chosenCourse,onChangeCourse}) => {
    const {coursesItems,classSearchLoading} = useSearchCourse();
    const [form] = Form.useForm<ChangeTestProductT>();

    useEffect(() => {
        if(!pickedItem) return;
        form.setFieldsValue({...pickedItem,course:JSON.stringify(pickedItem?.course),subject:pickedItem.course.subject.id,class:pickedItem.class.id});
        onChangeCourse(JSON.stringify(pickedItem?.course));
    },[pickedItem]);

    return <Form onFinish={onChangeItem} form={form} disabled={!pickedItem} autoComplete={'off'}>
        <Title level={4}>Змінити тест</Title>
        <Form.Item
            label="Курс"
            name="course"
            rules={[{ required: true, message: 'Оберіть курс' }]}
        >
            <Select 
                showSearch={true}
                loading={classSearchLoading}
                value={chosenCourse ? JSON.stringify(chosenCourse) : ''}
                onChange={onChangeCourse}
                >
                    {coursesItems?.length ? coursesItems.map(courseItem => 
                        <Option key={courseItem.id} value={JSON.stringify(courseItem)}>
                            {courseItem.secondName}
                        </Option>
                    ) : pickedItem?.course &&
                    <Option key={pickedItem?.course?.id} value={JSON.stringify(pickedItem?.course)}>
                        {pickedItem?.course?.secondName}
                    </Option>}
            </Select>  
        </Form.Item>
        <Form.Item
            label="Назва"
            name="name"
            rules={[{ required: true, message: 'Введіть назву' }]}
        >
            <Input />
        </Form.Item>
        <Form.Item
            label="Тривалість підписки"
            name="subscriptionDuration"
            rules={[{ required: true, message: 'Введіть тривалість підписки' }]}
        >
            <Input type={"number"} />
        </Form.Item>
        <Form.Item
            label="Ціна"
            name="price"
            rules={[{ required: true, message: 'Уведіть ціну' }]}
        >
            <Input type={'number'} />
        </Form.Item>
        <Form.List name="tests">
            {(fields, { add, remove }) => (
            <>
            {fields.map(({ key, name, ...restField }) => (
                <Space key={key} style={{ display: 'flex', flexDirection:'column',gap:'3px'}} >
                <Form.Item
                    {...restField}
                    name={[name, 'name']}
                    rules={[{ required: true, message: 'Уведіть назву тесту'}]}
                >
                    <Input placeholder="Назва тесту" />
                </Form.Item>
                <Form.Item
                    {...restField}
                    name={[name, 'testURL']}
                    rules={[{ required: true, message: 'Уведіть посилання на тест' }]}
                >
                    <Input placeholder="Посилання на тест" />
                </Form.Item>
                <Form.Item
                    {...restField}
                    name={[name, 'isFree']}
                    label={'Безкоштовний'}
                    rules={[{ required: true, message: 'Чи тест платний?' }]}
                >
                    <Checkbox/>
                </Form.Item>
                <MinusCircleOutlined onClick={() => remove(name)} />
                </Space>
            ))}
            <Form.Item>
                <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
                    Додати тест
                </Button>
            </Form.Item>
            </>
        )}
        </Form.List>
        <Form.Item
            label="Is active"
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
                Змінити
            </Button>
        </Form.Item>
    </Form>
}