import { Button, Checkbox, Form, Input, Select, Space, Table, Upload } from "antd";
import { ColumnsType, TablePaginationConfig } from "antd/es/table";
import {ChangeItemForm } from "./ChangeForm";
import { Container } from "./styles";
import { Timestamp } from "firebase/firestore";
import Title from "antd/es/typography/Title";
import { FormsContainer } from "../Classes/styles";
import {MinusCircleOutlined,PlusOutlined} from '@ant-design/icons';
import { useStudyMaterials } from "../../hooks/studyMaterials";
import { CreateStudyMaterialFormT, StudyMaterialT } from "../../types/studyMaterial";
import { ClassT } from "../../types/class";
import { useSearchClass } from "../../hooks/searchClassNumber";
import ReactQuill from "react-quill";
import { useEffect } from "react";
const {Option} = Select;


export default function StudyMaterials() {
    const {loading,onChangePagination,items,refetch,count,pagination,onChangeItem,onCreateItem,onRowEnter,pickedItem,debounceSearch,chosenClass,onChangeClass,} = useStudyMaterials();
    const {classesItems,classSearchLoading} = useSearchClass();
    const [form] = Form.useForm<CreateStudyMaterialFormT>();
    const description = Form.useWatch('description',form);

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
        onChange: (selectedRowKeys: React.Key[], selectedRows: StudyMaterialT[]) => {
            onRowEnter(selectedRows[0]);
        },
        getCheckboxProps: (item: StudyMaterialT) => ({...item}),
    };
    const columns:ColumnsType<StudyMaterialT> = [
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
            title:'Опис',
            dataIndex:'description',
            key:'description',
            render:(value:string) => <div style={{'maxHeight':'100px',overflow:'scroll'}} dangerouslySetInnerHTML={{__html:value}}/>
        },
        {
            title:'Клас',
            dataIndex:'class',
            key:'class',
            render:(value:ClassT) => value?.number
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
    useEffect(() => {
        form.setFieldValue('description','');
    },[])
    const onChangeDescription = (value?:string) => {
        form.setFieldValue('description',value);
        console.log(description)
    }

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
            <Form onFinish={onCreateItem} form={form} autoComplete={'off'}>
                <Title level={4}>Створити посібник</Title>
                <Form.Item
                    label="Номер класу"
                    name="class"
                    rules={[{ required: true, message: 'Оберіть клас' }]}
                >
                      <Select 
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
                    label="Назва"
                    name="name"
                    rules={[{ required: true, message: 'Оберіть назву теми'}]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label="Тривалисть підписки(місяці)"
                    name="subscriptionDuration"
                    rules={[{ required: true, message: 'Оберіть тривалість підписки' }]}
                >
                    <Input type={"number"} />
                </Form.Item>
                <Form.Item
                    label="Ціна"
                    name="price"
                    rules={[{ required: true, message: 'Оберіть ціну' }]}
                >
                    <Input type={'number'} />
                </Form.Item>
                <Form.Item
                    label='Опис'
                    name='description'
                >
                </Form.Item>
                <ReactQuill onChange={onChangeDescription} value={description} placeholder='Введіть опис'/>

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
                            label={'Файл'}
                            name={[name, 'document']}
                            rules={[{ required: true, message: 'Уведіть документ'}]}
                        >
                            <Upload>
                                <div>
                                    <PlusOutlined />
                                </div>
                            </Upload>
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
                <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                    <Button type="primary" htmlType="submit">
                        Створити
                    </Button>
                </Form.Item>
            </Form>
            <ChangeItemForm chosenClass={chosenClass} onChangeClass={onChangeClass} pickedItem={pickedItem} onChangeItem={onChangeItem}/>
        </FormsContainer>
    </Container>
}

