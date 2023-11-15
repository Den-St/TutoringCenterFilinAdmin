import { ClassT, } from "../../types/class";
import { Button, Checkbox, Form, Input, Select, Table } from "antd";
import { ColumnsType, TablePaginationConfig } from "antd/es/table";
import {ChangeItemForm } from "./ChangeForm";
import { Container } from "./styles";
import { CourseT, } from "../../types/course";
import { useCourses } from "../../hooks/courses";
import { useSearchClass } from "../../hooks/searchClassNumber";
import { Timestamp } from "firebase/firestore";
import Title from "antd/es/typography/Title";
import { FormsContainer } from "../Classes/styles";
import { useSearchSubject } from "../../hooks/searchSubject";
import { SubjectT } from "../../types/subject";
const {Option} = Select;


export default function Courses() {
    const {loading,onChangePagination,items,refetch,count,pagination,onChangeItem,onCreateItem,
           onRowEnter,pickedItem,onChangeClass,chosenClass,debounceSearch,chosenSubject,onChangeSubject} = useCourses();
    const {debounceSearchClass,classesItems,classSearchLoading} = useSearchClass();
    const {debounceSearchSubject,subjectsItems,subjectSearchLoading} = useSearchSubject();
        console.log('ite,s',items)
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
        onChange: (selectedRowKeys: React.Key[], selectedRows: CourseT[]) => {
            onRowEnter(selectedRows[0]);
        },
        getCheckboxProps: (item: CourseT) => ({...item}),
    };
    const columns:ColumnsType<CourseT> = [
        // {
        //     title:'ID',
        //     dataIndex:'id',
        //     key:'id'
        // },
        {
            title:'Коротка назва',
            dataIndex:'shortName',
            key:'shortName',
            filterDropdown:() => {
                return <Input onChange={(e) => debounceSearch(e.target.value)}/>
            }
        },
        {
            title:'Друга назва',
            dataIndex:'secondName',
            key:'secondName',
        },
        {
            title:'Опис',
            dataIndex:'description',
            key:'description',
            render:(text:string) => text.length >= 100 ? text.slice(0,100) + '...' : text
        },
        {
            title:'Номер класу',
            dataIndex:'class',
            key:'class',
            render:(value:ClassT) => value?.number
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
            render:(value:Timestamp) => value?.toDate().toLocaleString()
        },
        {
            title:'Активний',
            dataIndex:'isActive',
            key:'isActive',
            render:(value) => <Checkbox checked={value} onChange={() => {}} />
        }
    ];
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
                <Title level={4}>Create course</Title>
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
                            {classesItems && classesItems.map(classItem => 
                                <Option key={classItem.id} value={JSON.stringify(classItem)}>
                                    {classItem.number}
                                </Option>
                            )}
                    </Select>  
                </Form.Item>
                <Form.Item
                    label="Назва предмету"
                    name="subject"
                    rules={[{ required: true, message: 'Оберіть предмет!' }]}
                >
                        <Select 
                        onSearch={debounceSearchSubject}
                        showSearch={true}
                        loading={subjectSearchLoading}
                        value={chosenSubject ? JSON.stringify(chosenSubject) : ''}
                        onChange={onChangeSubject}
                        >
                            {subjectsItems && subjectsItems.map(subjectItem => 
                                <Option key={subjectItem.id} value={JSON.stringify(subjectItem)}>
                                    {subjectItem.name}
                                </Option>
                            )}
                    </Select>  
                </Form.Item>
                <Form.Item
                    label="Опис"
                    name="description"
                    rules={[{ required: true, message: 'Введіть опис курсу!' }]}
                >
                    <Input.TextArea autoSize={true}  />
                </Form.Item>
                <Form.Item<CourseT>
                    label="Коротка назва"
                    name="shortName"
                    rules={[{ required: true, message: 'Введіть коротку назву курсу!' }]}
                >
                    <Input.TextArea autoSize={true}  />
                </Form.Item>
                <Form.Item
                    label="Друга назва"
                    name="secondName"
                    rules={[{ required: true, message: 'Введіть другу назву!' }]}
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
                <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                    <Button type="primary" htmlType="submit">
                        Submit
                    </Button>
                </Form.Item>
            </Form>
            <ChangeItemForm chosenSubject={chosenSubject} onChangeSubject={onChangeSubject}
                            onChangeClass={onChangeClass} chosenClass={chosenClass} pickedItem={pickedItem}
                            onChangeItem={onChangeItem}/>
        </FormsContainer>
    </Container>
}

