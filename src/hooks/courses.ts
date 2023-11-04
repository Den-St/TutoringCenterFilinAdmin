import { ClassT } from './../types/class';
import { createCourse } from './../firebase/db/courses/create/createCourse';
import { SubmitHandler } from 'react-hook-form';
import { useCallback, useEffect } from 'react';
import { PaginationType } from '../types/pagination';
import { getCoursesPaginated } from '../firebase/db/courses/get/getCoursesPaginated';
import { ChangeCourseT, CourseT, CreateCourseT } from '../types/course';
import { useState } from 'react';
import { changeCourse } from '../firebase/db/courses/edit/changeCourse';
import _debounce from 'lodash/debounce';

export const useCourses = () => {
    const [items,setItems] = useState<CourseT[]>([]);
    const [count,setCount] = useState<number>();
    const [loading,setLoading] = useState<{items:boolean,create:boolean}>({items:false,create:false});
    const [pagination,setPagination] = useState<PaginationType>({page:1,pageSize:5});
    const [pickedItem,setPickedItem] = useState<CourseT | null>();
    const [chosenClass,setChosenClass] = useState<ClassT | null>(null);

    const onChangeClass = (classStr:string) => {
        setChosenClass(JSON.parse(classStr) as ClassT);
    }

    const fetch = async (value?:string) => { 
        setLoading(prev => ({...prev,items:true}));
        const items = await getCoursesPaginated(pagination,value);          
        setItems(items.courses);
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
    const onCreateItem = async (data:CreateCourseT) => {
        if(!chosenClass) return;
        setLoading(prev => ({...prev,create:true}));
        await createCourse({...data,class:chosenClass.id});
        setLoading(prev => ({...prev,create:false}));

        setLoading(prev => ({...prev,items:true}));
        await fetch();
        setLoading(prev => ({...prev,items:false}));
    }
    const onChangeItem = async (data:ChangeCourseT) => {
        if(!pickedItem?.id || !chosenClass) return;
        setLoading(prev => ({...prev,create:true}));
        await changeCourse(pickedItem?.id,{...data,class:chosenClass.id});
        setLoading(prev => ({...prev,create:false}));

        setLoading(prev => ({...prev,classes:true}));
        await fetch();
        setLoading(prev => ({...prev,classes:false}));
    }
    const onRowEnter = (pickedItem:CourseT) => {
        setPickedItem(pickedItem);
    }

    return {items,onChangePagination,loading,refetch:fetch,count,pagination,onChangeItem,onCreateItem,onRowEnter,pickedItem,onChangeClass,chosenClass,debounceSearch};
}