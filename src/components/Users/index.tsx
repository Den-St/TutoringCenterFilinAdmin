import { useAdminClasses } from "../../hooks/classes";
import { ClassT, CreateClassType } from "../../types/class";
import { Button, Checkbox, Form, Input, Table } from "antd";
import { ColumnsType, TablePaginationConfig } from "antd/es/table";
import {  ChangeUserForm } from "./ChangeForm";
import { Container, FormsContainer } from "./styles";
import { useEffect, } from "react";
import Title from "antd/es/typography/Title";
import { Timestamp } from "firebase/firestore";
import { useUsers } from "../../hooks/users";
import { UserT } from "../../types/user";


export default function Users() {
    const {loading,onChangePagination,items,refetch,count,pagination,onRowEnter,pickedItem,onChangeItem} = useUsers();
    // const [form] = Form.useForm<CreateClassType>(); 
    console.log(items)
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
        onChange: (selectedRowKeys: React.Key[], selectedRows: UserT[]) => {
            onRowEnter(selectedRows[0]);
        },
        getCheckboxProps: (item: UserT) => ({...item,}),
    };
    const columns:ColumnsType<UserT> = [
        {
            title:'Ім\'я',
            dataIndex:'name',
            key:'name'
        },
        {
            title:'Призвіще',
            dataIndex:'surname',
            key:'surname'
        },
        {
            title:'По батькові',
            dataIndex:'patronymic',
            key:'patronymic'
        },
        {
            title:'Нікнейм',
            dataIndex:'displayName',
            key:'displayName'
        },
        {
            title:'Створено',
            dataIndex:'createdAt',
            key:'createdAt',
            render:(value:Timestamp) => value?.toDate()?.toLocaleString()
        },
        {
            title:'Вчитель',
            dataIndex:'isTeacher',
            key:'isTeacher',
            render:(value) => <Checkbox checked={value} onChange={() => {}} />
        },

    ];
    
    // useEffect(() => {
    //     form.setFieldValue('isActive',false);
    // },[]);

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
            <ChangeUserForm pickedItem={pickedItem} onChangeItem={onChangeItem}/>
        </FormsContainer>
    </Container>
}

