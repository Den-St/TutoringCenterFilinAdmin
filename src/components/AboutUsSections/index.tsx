import { Button, Checkbox, Form, Input, Table } from "antd";
import { ColumnsType, TablePaginationConfig } from "antd/es/table";
import { ChangeAboutUsSectionsForm, } from "./ChangeForm";
import { Container, FormsContainer } from "./styles";
import { useEffect, } from "react";
import Title from "antd/es/typography/Title";
import { AboutUsSectionT, CreateAboutUsSectionT } from "../../types/aboutUsSection";
import { useAdminAboutUsSections } from "../../hooks/aboutUsSections";
import ReactQuill from "react-quill";
import './styles.scss';
import 'react-quill/dist/quill.snow.css';
import { Timestamp } from "firebase/firestore";

export default function AboutUsSections() {
    const {loading,onChangePagination,items,count,pagination,onCreateItem,onChangeItem,onRowEnter,pickedItem,debounceSearch} = useAdminAboutUsSections();
    const [form] = Form.useForm<CreateAboutUsSectionT>();
    const text = Form.useWatch('text',form);

    const onSubmit = (data: CreateAboutUsSectionT) => {
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
        onChange: (selectedRowKeys: React.Key[], selectedRows: AboutUsSectionT[]) => {
            onRowEnter(selectedRows[0]);
        },
        getCheckboxProps: (classItem: AboutUsSectionT) => ({...classItem}),
    };
    const columns:ColumnsType<AboutUsSectionT> = [
        {
            title:'Назва розділу',
            dataIndex:'name',
            key:'name',
            filterDropdown:() => {
                return <Input onChange={(e) => debounceSearch(e.target.value)}/>
            }
        },
        {
            title:'Текст',
            dataIndex:'text',
            key:'text',
            render:(value:string) => <div style={{'maxHeight':'100px',overflow:'scroll'}} dangerouslySetInnerHTML={{__html:value}}/>
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
            render:(value) => <Checkbox checked={value} disabled onChange={() => {}} />
        }
    ];
    useEffect(() => {
        form.setFieldValue('isActive',false);
    },[]);
    const onChangeText = (value?:string) => {
        form.setFieldValue('text',value);
    }
    console.log('g',items)
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
                <Title level={4}>Створити розділ "Про нас"</Title>
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
            <ChangeAboutUsSectionsForm pickedItem={pickedItem} onChangeItem={onChangeItem}/>
        </FormsContainer>
    </Container>
}

