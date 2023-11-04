import { changeCourseTheme } from './../firebase/db/courseThemes/edit/changeCourseTheme';
import { createCourseTheme } from './../firebase/db/courseThemes/create/createCourseTheme';
import { getCourseThemesPaginated } from './../firebase/db/courseThemes/get/getCourseThemesPaginated';
import { CourseThemeT, CreateCourseThemeT, ChangeCourseThemeT } from './../types/courseThemes';
import { SubmitHandler } from 'react-hook-form';
import { useCallback, useEffect } from 'react';
import { PaginationType } from '../types/pagination';
import { useState } from 'react';
import { CourseT } from '../types/course';
import _debounce from 'lodash/debounce';

export const useCourseThemes = () => {
    const [items,setItems] = useState<CourseThemeT[]>([]);
    const [count,setCount] = useState<number>();
    const [loading,setLoading] = useState<{items:boolean,create:boolean}>({items:false,create:false});
    const [pagination,setPagination] = useState<PaginationType>({page:1,pageSize:5});
    const [pickedItem,setPickedItem] = useState<CourseThemeT | null>();
    const [chosenCourse,setChosenCourse] = useState<CourseT | null>(null);

    const onChangeCourse = (courseStringified:string) => {
        setChosenCourse(JSON.parse(courseStringified) as CourseT);
    }
    const fetch = async (value?:string) => { 
        setLoading(prev => ({...prev,items:true}));
        const items = await getCourseThemesPaginated(pagination,value);          
        setItems(items.courseThemes);
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
    const onCreateItem = async (data:CreateCourseThemeT) => {
        if(!chosenCourse) return;
        setLoading(prev => ({...prev,create:true}));
        await createCourseTheme({...data,course:chosenCourse.id});
        setLoading(prev => ({...prev,create:false}));

        setLoading(prev => ({...prev,items:true}));
        await fetch();
        setLoading(prev => ({...prev,items:false}));
    }
    const onChangeItem = async (data:ChangeCourseThemeT) => {
        if(!pickedItem?.id || !chosenCourse) return;
        setLoading(prev => ({...prev,create:true}));
        await changeCourseTheme(pickedItem?.id,{...data,course:chosenCourse.id});
        setLoading(prev => ({...prev,create:false}));

        setLoading(prev => ({...prev,classes:true}));
        await fetch();
        setLoading(prev => ({...prev,classes:false}));
    }
    const onRowEnter = (pickedItem:CourseThemeT) => {
        setPickedItem(pickedItem);
    }

    return {items,onChangePagination,loading,refetch:fetch,count,pagination,onChangeItem,onCreateItem,onRowEnter,pickedItem,chosenCourse,onChangeCourse,debounceSearch};
}