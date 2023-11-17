import { SubmitHandler } from 'react-hook-form';
import { useEffect } from 'react';
import { PaginationType } from '../types/pagination';
import { getClassesPaginated } from '../firebase/db/classes/get/getClassesPaginated';
import { ChangeClassType, ClassT, CreateClassType } from '../types/class';
import { useState } from 'react';
import { createClass } from '../firebase/db/classes/create/createClass';
import { changeClass } from '../firebase/db/classes/edit/changeClass';

export const useAdminClasses = () => {
    const [classes,setClasses] = useState<ClassT[]>([]);
    const [count,setCount] = useState<number>();
    const [loading,setLoading] = useState<{classes:boolean,create:boolean}>({classes:false,create:false});
    const [pagination,setPagination] = useState<PaginationType>({page:1,pageSize:12});
    const [pickedClass,setPickedClass] = useState<ClassT | null>();

    const fetch = async () => { 
        setLoading(prev => ({...prev,classes:true}));
        const classes = await getClassesPaginated(pagination);          
        setClasses(classes.classes);
        setCount(classes.count);
        setLoading(prev => ({...prev,classes:false}));
    }

    useEffect(() => {
        fetch();
    },[]);

    const onChangePagination = (page:number,pageSize:number) => {
        setPagination({page,pageSize});
    }
    const onCreateClass= async (data:CreateClassType) => {
        console.log(data);
        setLoading(prev => ({...prev,create:true}));
        await createClass({...data});
        setLoading(prev => ({...prev,create:false}));

        setLoading(prev => ({...prev,classes:true}));
        await fetch();
        setLoading(prev => ({...prev,classes:false}));
    }
    const onChangeClass:SubmitHandler<ChangeClassType> = async (data:ChangeClassType) => {
        if(!pickedClass?.id) return;
        setLoading(prev => ({...prev,create:true}));
        await changeClass(pickedClass?.id,{...data});
        setLoading(prev => ({...prev,create:false}));

        setLoading(prev => ({...prev,classes:true}));
        await fetch();
        setLoading(prev => ({...prev,classes:false}));
    }
    const onRowEnter = (pickedClass:ClassT) => {
        setPickedClass(pickedClass);
    }

    return {classes,onChangePagination,loading,count,pagination,onCreateClass,onChangeClass,onRowEnter,pickedClass};
}