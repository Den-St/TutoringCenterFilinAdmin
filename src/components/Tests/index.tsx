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
import { SubjectT } from "../../types/subject";
import { useTests } from "../../hooks/tests";
import { TestProductT } from "../../types/tests";
const {Option} = Select;

export default function Tests() {
    const {loading,onChangePagination,items,refetch,count,pagination,onChangeItem,onCreateItem,onRowEnter,pickedItem,onChangeCourse,chosenCourse,debounceSearch} = useTests();
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
        onChange: (selectedRowKeys: React.Key[], selectedRows: TestProductT[]) => {
            onRowEnter(selectedRows[0]);
        },
        getCheckboxProps: (item: TestProductT) => ({...item}),
    };
    const columns:ColumnsType<TestProductT> = [
        {
            title:'Назва',
            dataIndex:'name',
            key:'name',
            filterDropdown:() => {
                return <Input onChange={(e) => debounceSearch(e.target.value)}/>
            }
        },
        {
            title:'Ціна',
            dataIndex:'price',
            key:'price'
        },
        {
            title:'Тривалість підписки',
            dataIndex:'subscriptionDuration',
            key:'subscriptionDuration'
        },
        {
            title:'Назва курсу',
            dataIndex:'course',
            key:'course',
            render:(value:CourseT) => value?.secondName
        },
        {
            title:'Назва предмету',
            dataIndex:'subject',
            key:'subject',
            render:(value:SubjectT) => value?.name
        },
        {
            title:'Створено',
            dataIndex:'createdAt',
            key:'createdAt',
            render:(value:Timestamp) => value?.toDate()?.toLocaleString()
        },
        {
            title:'Активний?',
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
                <Title level={4}>Створити тест</Title>
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
                            initialValue={false}
                            rules={[{ required: true, message: 'Чи тест платний?' }]}
                        >
                            <Checkbox defaultChecked={false}/>
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

