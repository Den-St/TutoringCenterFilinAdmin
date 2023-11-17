import { Button, Checkbox, Form, Input, Table } from "antd";
import { ColumnsType, TablePaginationConfig } from "antd/es/table";
import { ChangeClassForm } from "./ChangeForm";
import { Container, FormsContainer } from "./styles";
import Title from "antd/es/typography/Title";
import { useAdminSubjects } from "../../hooks/subjects";
import { CreateSubjectT, SubjectT } from "../../types/subject";

const columns:ColumnsType<SubjectT> = [
    {
        title:'Назва',
        dataIndex:'name',
        key:'name'
    },
    {
        title:'Активний',
        dataIndex:'isActive',
        key:'isActive',
        render:(value) => <Checkbox checked={value} disabled={true} onChange={() => {}} />
    }
];

export default function Subjects() {
    const {loading,onChangePagination,items,refetch,count,pagination,onChangeItem,onCreateItem,onRowEnter,pickedItem} = useAdminSubjects();
    const [form] = Form.useForm< CreateSubjectT>(); 

    const onSubmit = (data: CreateSubjectT) => {
        onCreateItem(data);
        form.resetFields();
    }
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
        onChange: (selectedRowKeys: React.Key[], selectedRows: SubjectT[]) => {
            onRowEnter(selectedRows[0]);
        },
        getCheckboxProps: (item: SubjectT) => ({...item}),
    };


    return <Container >
        <Table style={{width:'50%'}}
            rowSelection={{
                type: 'radio',
                ...rowSelection,
              }}
            columns={columns} 
            dataSource={items.map(item => ({...item,key:item.id}))}
            loading={loading.items} pagination={paginationConfig}
        />
        <FormsContainer>
            <Form onFinish={onSubmit} form={form} autoComplete={'off'} >
                <Title level={4}>Створити предмет</Title>
                <Form.Item
                    label="Назва"
                    name="name"
                    rules={[{ required: true, message: 'Введіть назву' }]}
                >
                    <Input/>
                </Form.Item>
                <Form.Item
                    label="Активний"
                    name="isActive"
                    valuePropName="checked"
                    initialValue={false}
                >
                    <Checkbox defaultChecked={false}/>
                </Form.Item>
                <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                    <Button type="primary" htmlType="submit">
                        Створити
                    </Button>
                </Form.Item>
            </Form>
            <ChangeClassForm pickedItem={pickedItem} onChangeItem={onChangeItem}/>
        </FormsContainer>
    </Container>
}

