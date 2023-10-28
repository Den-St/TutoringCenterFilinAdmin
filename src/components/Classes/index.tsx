import { useAdminClasses } from "../../hooks/classes";
import { ClassT, CreateClassType } from "../../types/class";
import { Table } from "antd";
import { ColumnsType, TablePaginationConfig } from "antd/es/table";
import {  useForm } from "react-hook-form";
import { ChangeClassForm } from "./ChangeForm";
import { Container } from "./styles";
import { useState } from "react";

export default function Classes() {
    const {loading,onChangePagination,classes,refetch,count,pagination,onCreateClass,onChangeClass,onRowEnter,pickedClass} = useAdminClasses();
    const {
        register,
        handleSubmit,
        formState: { errors },
        watch,
    } = useForm<CreateClassType>();

    const columns:ColumnsType<ClassT> = [
        {
            title:'ID',
            dataIndex:'id',
            key:'id'
        },
        {
            title:'Number',
            dataIndex:'number',
            key:'number'
        },
        {
            title:'Is active',
            dataIndex:'isActive',
            key:'isActive'
        }
    ];

    const paginationConfig:TablePaginationConfig = {
        onChange: onChangePagination,
        total:count,
        defaultPageSize:6,
        current:pagination.page,
        onShowSizeChange: onChangePagination
    }
  
    const rowSelection = {
        onChange: (selectedRowKeys: React.Key[], selectedRows: ClassT[]) => {
            onRowEnter(selectedRows[0]);
        },
        getCheckboxProps: (classItem: ClassT) => ({...classItem}),
    };
    
    return <Container >
        <Table style={{width:'50%'}}
            rowSelection={{
                type: 'radio',
                ...rowSelection,
              }}
            //@ts-ignore
            columns={columns} 
            dataSource={classes.map(classItem => ({...classItem,key:classItem.id,isActive:classItem.isActive}))}
            loading={loading.classes} pagination={paginationConfig}/>
        <form onSubmit={handleSubmit(onCreateClass)} >
            <input {...register('number')} type={"number"} />
            <input {...register('isActive')} type={"checkbox"} />
            <input type={'submit'} value={'SUBMIT'} />
        </form>
        <ChangeClassForm pickedClass={pickedClass} classes={classes} onChangeClass={onChangeClass}/>
    </Container>
}

