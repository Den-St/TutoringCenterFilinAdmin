import { Button, Checkbox, Form, Input, Select, Space, Table } from "antd";
import { ColumnsType, ColumnType, TablePaginationConfig } from "antd/es/table";
import {ChangeItemForm } from "./ChangeForm";
import { Container } from "./styles";
import { CourseT } from "../../types/course";
import { Timestamp } from "firebase/firestore";
import Title from "antd/es/typography/Title";
import { FormsContainer } from "../Classes/styles";
import { CourseThemeT } from "../../types/courseThemes";
import { VideoLessonT } from "../../types/videoLesson";
import { Link } from "react-router-dom";
import { useCourseThemes } from "../../hooks/courseThemes";
import { useSearchCourse } from "../../hooks/searchCourse";
import {MinusCircleOutlined,PlusOutlined} from '@ant-design/icons';
const {Option} = Select;


export default function StudyMaterials() {
    const {loading,onChangePagination,items,refetch,count,pagination,onChangeItem,onCreateItem,onRowEnter,pickedItem,onChangeCourse,chosenCourse,debounceSearch} = useCourseThemes();
    const {debounceSearchClass,coursesItems,classSearchLoading} = useSearchCourse();

    const paginationConfig:TablePaginationConfig = {
        onChange: onChangePagination,
        total:count,
        defaultPageSize:5,
        current:pagination.page,
        onShowSizeChange: onChangePagination,
        showSizeChanger:true,
        pageSizeOptions:[5,10,20,50],
        showPrevNextJumpers:true
    }
    const rowSelection = {
        onChange: (selectedRowKeys: React.Key[], selectedRows: CourseThemeT[]) => {
            onRowEnter(selectedRows[0]);
        },
        getCheckboxProps: (item: CourseThemeT) => ({...item}),
    };
    const columns:ColumnsType<CourseThemeT> = [
        {
            title:'Name',
            dataIndex:'name',
            key:'name',
            filterDropdown:() => {
                return <Input onChange={(e) => debounceSearch(e.target.value)}/>
            }
        },
        {
            title:'Price',
            dataIndex:'price',
            key:'price'
        },
        {
            title:'Subscription duration',
            dataIndex:'subscriptionDuration',
            key:'subscriptionDuration'
        },
        {
            title:'Course',
            dataIndex:'course',
            key:'course',
            render:(value:CourseT) => value?.secondName
        },
        {
            title:'Created at',
            dataIndex:'createdAt',
            key:'createdAt',
            render:(value:Timestamp) => value?.toDate()?.toLocaleString()
        },
        {
            title:'Is active',
            dataIndex:'isActive',
            key:'isActive',
            render:(value) => <Checkbox checked={value} onChange={() => {}} />
        }
    ];
    console.log(items)
    return <Container >
        <Table style={{width:'50%'}}
            rowSelection={{
                type: 'radio',
                ...rowSelection,
            }}
            columns={columns} 
            dataSource={items.map(item => ({...item,key:item.id}))}
            loading={loading.items} pagination={paginationConfig}/>
        <FormsContainer>
            <Form onFinish={onCreateItem} autoComplete={'off'}>
                <Title level={4}>Створити тему</Title>
                <Form.Item
                    label="Курс"
                    name="course"
                    rules={[{ required: true, message: 'Оберіть курс!' }]}
                >
                    <Select 
                        onSearch={debounceSearchClass}
                        showSearch={true}
                        loading={classSearchLoading}
                        value={chosenCourse ? JSON.stringify(chosenCourse) : ''}
                        onChange={onChangeCourse}
                        >
                            {coursesItems && coursesItems.map(courseItem => 
                                <Option key={courseItem.id} value={JSON.stringify(courseItem)}>
                                    {courseItem.secondName}
                                </Option>
                            )}
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
                <Form.List name="studyMaterials">
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
                            name={[name, 'studyMaterialURL']}
                            rules={[{ required: true, message: 'Увведіть посилання на учбовий матеріал'}]}
                        >
                            <Input placeholder="Посилання на учбовий матеріал" />
                        </Form.Item>
                        <MinusCircleOutlined onClick={() => remove(name)} />
                        </Space>
                    ))}
                    <Form.Item>
                        <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
                            Додати учбовий матеріал
                        </Button>
                    </Form.Item>
                    </>
                )}
                </Form.List>
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
            <ChangeItemForm chosenCourse={chosenCourse} onChangeCourse={onChangeCourse} pickedItem={pickedItem} onChangeItem={onChangeItem}/>
        </FormsContainer>
    </Container>
}

