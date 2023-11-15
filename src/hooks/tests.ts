import { getTestsPaginated } from './../firebase/db/tests/get/getTestsPaginated';
import { CreateTestProductT, TestProductT, ChangeTestProductT } from './../types/tests';
import { useCallback, useEffect } from 'react';
import { PaginationType } from '../types/pagination';
import { useState } from 'react';
import { CourseT } from '../types/course';
import _debounce from 'lodash/debounce';
import { createTest } from '../firebase/db/tests/create/createTest';
import { changeTest } from '../firebase/db/tests/edit/changeTest';

export const useTests = () => {
    const [items,setItems] = useState<TestProductT[]>([]);
    const [count,setCount] = useState<number>();
    const [loading,setLoading] = useState<{items:boolean,create:boolean}>({items:false,create:false});
    const [pagination,setPagination] = useState<PaginationType>({page:1,pageSize:5});
    const [pickedItem,setPickedItem] = useState<TestProductT | null>();
    const [chosenCourse,setChosenCourse] = useState<CourseT | null>(null);

    const onChangeCourse = (courseStringified:string) => {
        setChosenCourse(JSON.parse(courseStringified) as CourseT);
    }
    const fetch = async (value?:string) => { 
        setLoading(prev => ({...prev,items:true}));
        const res = await getTestsPaginated(pagination,value);          
        setItems(res.items);
        setCount(res.count);
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
    const onCreateItem = async (data:CreateTestProductT) => {
        console.log(data);
        if(!chosenCourse) return;
        setLoading(prev => ({...prev,create:true}));
        await createTest({...data,course:chosenCourse.id,subject:chosenCourse.subject.id});
        setLoading(prev => ({...prev,create:false}));

        setLoading(prev => ({...prev,items:true}));
        await fetch();
        setLoading(prev => ({...prev,items:false}));
    }
    const onChangeItem = async (data:ChangeTestProductT) => {
        if(!pickedItem?.id || !chosenCourse) return;
        setLoading(prev => ({...prev,create:true}));
        await changeTest(pickedItem?.id,{...data,course:chosenCourse.id,subject:chosenCourse.subject.id});
        setLoading(prev => ({...prev,create:false}));

        setLoading(prev => ({...prev,classes:true}));
        await fetch();
        setLoading(prev => ({...prev,classes:false}));
    }
    const onRowEnter = (pickedItem:TestProductT) => {
        setPickedItem(pickedItem);
    }

    return {items,onChangePagination,loading,refetch:fetch,count,pagination,onChangeItem,onCreateItem,onRowEnter,pickedItem,chosenCourse,onChangeCourse,debounceSearch};
}