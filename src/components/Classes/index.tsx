import { useAdminClasses } from "../../hooks/classes";
import { ClassT, CreateClassType } from "../../types/class";
import { Button, Checkbox, Form, Input, Table } from "antd";
import { ColumnsType, TablePaginationConfig } from "antd/es/table";
import { ChangeClassForm } from "./ChangeForm";
import { Container, FormsContainer } from "./styles";
import { useEffect, } from "react";
import Title from "antd/es/typography/Title";

const columns:ColumnsType<ClassT> = [
    // {
    //     title:'ID',
    //     dataIndex:'id',
    //     key:'id'
    // },
    {
        title:'Number',
        dataIndex:'number',
        key:'number'
    },
    {
        title:'Is active',
        dataIndex:'isActive',
        key:'isActive',
        render:(value) => <Checkbox checked={value} onChange={() => {}} />
    }
];

export default function Classes() {
    const {loading,onChangePagination,classes,refetch,count,pagination,onCreateClass,onChangeClass,onRowEnter,pickedClass} = useAdminClasses();
    const [form] = Form.useForm<CreateClassType>(); 

    const paginationConfig:TablePaginationConfig = {
        onChange: onChangePagination,
        total:count,
        defaultPageSize:12,
        current:pagination.page,
        showSizeChanger:true,
        pageSizeOptions:[5,12,20,50],
        onShowSizeChange: onChangePagination,
        showPrevNextJumpers:true,
    }
    const rowSelection = {
        onChange: (selectedRowKeys: React.Key[], selectedRows: ClassT[]) => {
            onRowEnter(selectedRows[0]);
        },
        getCheckboxProps: (classItem: ClassT) => ({...classItem}),
    };
    useEffect(() => {
        form.setFieldValue('isActive',false);
    },[]);

    return <Container >
        <Table style={{width:'50%'}}
            rowSelection={{
                type: 'radio',
                ...rowSelection,
              }}
            columns={columns} 
            dataSource={classes.map(classItem => ({...classItem,key:classItem.id}))}
            loading={loading.classes} pagination={paginationConfig}
        />
        <FormsContainer>
            <Form onFinish={onCreateClass} form={form} autoComplete={'off'}>
                <Title level={4}>Create class</Title>
                <Form.Item
                    label="Number"
                    name="number"
                    rules={[{ required: true, message: 'Please input class number!' }]}
                >
                    <Input type="number"/>
                </Form.Item>
                <Form.Item
                    label="Is active"
                    name="isActive"
                    valuePropName="checked"
                    initialValue={false}
                >
                    <Checkbox defaultChecked={false}/>
                </Form.Item>
                <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                    <Button type="primary" htmlType="submit">
                        Submit
                    </Button>
                </Form.Item>
            </Form>
            <ChangeClassForm pickedClass={pickedClass} classes={classes} onChangeClass={onChangeClass}/>
        </FormsContainer>
    </Container>
}

