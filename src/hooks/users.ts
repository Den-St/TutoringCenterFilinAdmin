import { ChangeUserT, UserT } from './../types/user';
import { SubjectT } from '../types/subject';
import { ClassT } from '../types/class';
import { createCourse } from '../firebase/db/courses/create/createCourse';
import { SubmitHandler } from 'react-hook-form';
import { useCallback, useEffect } from 'react';
import { PaginationType } from '../types/pagination';
import { getCoursesPaginated } from '../firebase/db/courses/get/getCoursesPaginated';
import { ChangeCourseT, CourseT, CreateCourseT } from '../types/course';
import { useState } from 'react';
import { changeCourse } from '../firebase/db/courses/edit/changeCourse';
import _debounce from 'lodash/debounce';
import { getUsersPaginated } from '../firebase/db/users/get/getUsersPaginated';
import { changeUser } from '../firebase/db/users/edit/changeCourse';

export const useUsers = () => {
    const [items,setItems] = useState<UserT[]>([]);
    const [count,setCount] = useState<number>();
    const [loading,setLoading] = useState<{items:boolean}>({items:false,});
    const [pagination,setPagination] = useState<PaginationType>({page:1,pageSize:5});
    const [pickedItem,setPickedItem] = useState<UserT | null>();


    const fetch = async (value?:string) => { 
        setLoading(prev => ({...prev,items:true}));
        const items = await getUsersPaginated(pagination,value);          
        setItems(items.items);
        setCount(items.count);
        setLoading(prev => ({...prev,items:false}));
    }

    const search = async (value?:string) => {
       fetch(value?.trim());
    }
    const debounceSearch = useCallback(_debounce(search, 400), []);
    useEffect(() => {
        fetch();
    },[]);

    const onChangePagination = (page:number,pageSize:number) => {
        setPagination({page,pageSize});
    }

    const onChangeItem = async (data:ChangeUserT) => {
        if(!pickedItem?.id) return;
        setLoading(prev => ({...prev,create:true}));
        await changeUser(pickedItem?.id,{...pickedItem,...data,});
        setLoading(prev => ({...prev,create:false}));

        setLoading(prev => ({...prev,items:true}));
        await fetch();
        setLoading(prev => ({...prev,items:false}));
    }
    const onRowEnter = (pickedItem:UserT) => {
        setPickedItem(pickedItem);
    }

    return {items,onChangePagination,loading,refetch:fetch,count,pagination,onChangeItem,onRowEnter,pickedItem,debounceSearch,};
}