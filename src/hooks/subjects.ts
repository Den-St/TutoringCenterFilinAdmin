import { getSubjectsPaginated } from './../firebase/db/subjects/get/getSubjectsPaginated';
import { ChangeSubjectT, CreateSubjectT, SubjectT } from './../types/subject';
import { SubmitHandler } from 'react-hook-form';
import { useEffect } from 'react';
import { PaginationType } from '../types/pagination';
import { getClassesPaginated } from '../firebase/db/classes/get/getClassesPaginated';
import { ChangeClassType, ClassT, CreateClassType } from '../types/class';
import { useState } from 'react';
import { createClass } from '../firebase/db/classes/create/createClass';
import { changeClass } from '../firebase/db/classes/edit/changeClass';
import { createSubject } from '../firebase/db/subjects/create/createSubject';
import { changeSubject } from '../firebase/db/subjects/edit/changeSubject';

export const useAdminSubjects = () => {
    const [items,setItems] = useState<SubjectT[]>([]);
    const [count,setCount] = useState<number>();
    const [loading,setLoading] = useState<{items:boolean,create:boolean}>({items:false,create:false});
    const [pagination,setPagination] = useState<PaginationType>({page:1,pageSize:12});
    const [pickedItem,setPickedItem] = useState<SubjectT | null>();

    const fetch = async () => { 
        setLoading(prev => ({...prev,items:true}));
        const res = await getSubjectsPaginated(pagination);          
        setItems(res.items);
        setCount(res.count);
        setLoading(prev => ({...prev,items:false}));
    }

    useEffect(() => {
        fetch();
    },[]);

    const onChangePagination = (page:number,pageSize:number) => {
        setPagination({page,pageSize});
    }
    const onCreateItem= async (data:CreateSubjectT) => {
        console.log(data);
        setLoading(prev => ({...prev,create:true}));
        await createSubject({...data});
        setLoading(prev => ({...prev,create:false}));

        setLoading(prev => ({...prev,items:true}));
        await fetch();
        setLoading(prev => ({...prev,items:false}));
    }
    const onChangeItem = async (data:ChangeSubjectT) => {
        if(!pickedItem?.id) return;
        setLoading(prev => ({...prev,create:true}));
        await changeSubject(pickedItem?.id,{...data});
        setLoading(prev => ({...prev,create:false}));

        setLoading(prev => ({...prev,items:true}));
        await fetch();
        setLoading(prev => ({...prev,items:false}));
    }
    const onRowEnter = (pickedItem:SubjectT) => {
        setPickedItem(pickedItem);
    }

    return {items,onChangePagination,loading,refetch:fetch,count,pagination,onCreateItem,onChangeItem,onRowEnter,pickedItem};
}