import { ClassT, } from "../../types/class";
import { Button, Checkbox, Form, Input, Select, Table } from "antd";
import { ColumnsType, ColumnType, TablePaginationConfig } from "antd/es/table";
import {ChangeItemForm } from "./ChangeForm";
import { Container } from "./styles";
import { CourseT, } from "../../types/course";
import { useCourses } from "../../hooks/courses";
import { useSearchClass } from "../../hooks/searchClassNumber";
import { Timestamp } from "firebase/firestore";
import Title from "antd/es/typography/Title";
import { FormsContainer } from "../Classes/styles";
const {Option} = Select;


export default function Courses() {
    const {loading,onChangePagination,items,refetch,count,pagination,onChangeItem,onCreateItem,onRowEnter,pickedItem,onChangeClass,chosenClass,debounceSearch} = useCourses();
    const {debounceSearchClass,classesItems,classSearchLoading} = useSearchClass();

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
            title:'Short name',
            dataIndex:'shortName',
            key:'shortName',
            filterDropdown:() => {
                return <Input onChange={(e) => debounceSearch(e.target.value)}/>
            }
        },
        {
            title:'Second name',
            dataIndex:'secondName',
            key:'secondName',
        },
        {
            title:'Description',
            dataIndex:'description',
            key:'description'
        },
        {
            title:'Class number',
            dataIndex:'class',
            key:'class',
            render:(value:ClassT) => value?.number
        },
        {
            title:'Created at',
            dataIndex:'createdAt',
            key:'createdAt',
            render:(value:Timestamp) => value?.toDate().toLocaleString()
        },
        {
            title:'Is active',
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
                    label="Class number"
                    name="class"
                    rules={[{ required: true, message: 'Please choose class!' }]}
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
                    label="Description"
                    name="description"
                    rules={[{ required: true, message: 'Please input description of course!' }]}
                >
                    <Input.TextArea autoSize={true}  />
                </Form.Item>
                <Form.Item<CourseT>
                    label="Short name"
                    name="shortName"
                    rules={[{ required: true, message: 'Please input short name of course!' }]}
                >
                    <Input.TextArea autoSize={true}  />
                </Form.Item>
                <Form.Item
                    label="Second name"
                    name="secondName"
                    rules={[{ required: true, message: 'Please input second name of course!' }]}
                >
                    <Input.TextArea autoSize={true}  />
                </Form.Item>
                <Form.Item
                    label="Is active"
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
            <ChangeItemForm onChangeClass={onChangeClass} chosenClass={chosenClass} pickedItem={pickedItem} onChangeItem={onChangeItem}/>
        </FormsContainer>
    </Container>
}

