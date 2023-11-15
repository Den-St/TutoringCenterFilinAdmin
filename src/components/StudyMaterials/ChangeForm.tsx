import { useEffect } from "react";
import { Button, Checkbox, Form, Input, Select, Space, TimePicker } from "antd";
import Title from "antd/es/typography/Title";
import { ChangeCourseThemeT, CourseThemeT } from "../../types/courseThemes";
import { useSearchCourse } from "../../hooks/searchCourse";
import { CourseT } from "../../types/course";
import {MinusCircleOutlined,PlusOutlined} from '@ant-design/icons';
import { ChangeStudyMaterialFormT, ChangeStudyMaterialT, StudyMaterialT } from "../../types/studyMaterial";
import { ClassT } from "../../types/class";
import { useSearchClass } from "../../hooks/searchClassNumber";
import ReactQuill from "react-quill";
const {Option} = Select;

type Props = {
    onChangeItem:(data:ChangeStudyMaterialT) => void,
    pickedItem?:StudyMaterialT | null,
    chosenClass:ClassT | null
    onChangeClass:(stringified:string) => void
}

export const ChangeItemForm:React.FC<Props> = ({onChangeItem,pickedItem,chosenClass,onChangeClass}) => {
    const {debounceSearchClass,classesItems,classSearchLoading} = useSearchClass();
    const [form] = Form.useForm<ChangeStudyMaterialT>();
    const description = Form.useWatch('description',form);

    useEffect(() => {
        if(!pickedItem) return;
        form.setFieldsValue({...pickedItem,class:JSON.stringify(pickedItem?.class)});
        onChangeClass(JSON.stringify(pickedItem?.class));
    },[pickedItem]);
    const onChangeDescription = (value?:string) => {
        form.setFieldValue('description',value);
    }

    return <Form onFinish={onChangeItem} form={form} disabled={!pickedItem} autoComplete={'off'}>
            <Title level={4}>Створити посібник</Title>
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
                label="Назва"
                name="name"
                rules={[{ required: true, message: 'Оберіть назву теми!'}]}
            >
                <Input />
            </Form.Item>
            <Form.Item
                label="Тривалисть підписки(місяці)"
                name="subscriptionDuration"
                rules={[{ required: true, message: 'Оберіть тривалість підписки!' }]}
            >
                <Input type={"number"} />
            </Form.Item>
            <Form.Item
                label="Ціна"
                name="price"
                rules={[{ required: true, message: 'Оберіть ціну!' }]}
            >
                <Input type={'number'} />
            </Form.Item>
            <Form.Item
                label='Опис'
                name='description'
            >
            </Form.Item>
            <ReactQuill onChange={onChangeDescription} value={description} placeholder='Введіть текст'/>

            <Form.List name="videoLessons">
                {(fields, { add, remove }) => (
                <>
                {fields.map(({ key, name, ...restField }) => (
                    <Space key={key} style={{ display: 'flex', flexDirection:'column',gap:'3px'}} >
                    <Form.Item
                        {...restField}
                        name={[name, 'name']}
                        rules={[{ required: true, message: 'Уведіть назву відео'}]}
                    >
                        <Input placeholder="Назва відео" />
                    </Form.Item>
                    <Form.Item
                        {...restField}
                        name={[name, 'videoURL']}
                        rules={[{ required: true, message: 'Увведіть посилання на відео' }]}
                    >
                        <Input placeholder="Посилання на відео" />
                    </Form.Item>
                    <Form.Item
                        {...restField}
                        name={[name, 'description']}
                        rules={[{ required: true, message: 'Уведіть опис відео' }]}
                    >
                        <Input.TextArea autoSize={true} placeholder="Опис відео"/>
                    </Form.Item>
                    <MinusCircleOutlined onClick={() => remove(name)} />
                    </Space>
                ))}
                <Form.Item>
                    <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
                        Додати відео
                    </Button>
                </Form.Item>
                </>
            )}
            </Form.List>
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
            <Form.List name="documents">
                {(fields, { add, remove }) => (
                <>
                {fields.map(({ key, name, ...restField }) => (
                    <Space key={key} style={{ display: 'flex', flexDirection:'column',gap:'3px'}} >
                    <Form.Item
                        {...restField}
                        name={[name, 'name']}
                        rules={[{ required: true, message: 'Уведіть назву учбового матеріалу'}]}
                    >
                        <Input placeholder="Назва учбового матеріалу" />
                    </Form.Item>
                    <Form.Item
                        {...restField}
                        name={[name, 'documentURL']}
                        rules={[{ required: true, message: 'Увведіть посилання на учбовий матеріал'}]}
                    >
                        <Input placeholder="Посилання на учбовий матеріал" />
                    </Form.Item>
                    <MinusCircleOutlined onClick={() => remove(name)} />
                    </Space>
                ))}
                <Form.Item>
                    <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
                        Додати документ
                    </Button>
                </Form.Item>
                </>
            )}
            </Form.List>
            {/* <Form.List name="themes">
                {(fields, { add, remove }) => (
                <>
                {fields.map(({ key, name, ...restField }) => (
                    <Space key={key} style={{ display: 'flex', flexDirection:'column',gap:'3px'}} >
                    <Form.Item
                        {...restField}
                        name={[name, 'name']}
                        rules={[{ required: true, message: 'Уведіть назву теми'}]}
                    >
                        <Input placeholder="Назва теми" />
                    </Form.Item>
                    <MinusCircleOutlined onClick={() => remove(name)} />
                    </Space>
                ))}
                <Form.Item>
                    <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
                        Додати документ
                    </Button>
                </Form.Item>
                </>
            )}
            </Form.List> */}
            <Form.Item
                label="Теми"
                name="themes">
                <Input placeholder="Теми"/>
            </Form.Item>
            <Form.Item
                label="Для вчителя?"
                name="forTeacher"
                valuePropName="checked"
            >
                <Checkbox/>
            </Form.Item>
            <Form.Item
                label="Активний?"
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