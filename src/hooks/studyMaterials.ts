import { CreateStudyMaterialFormT, CreateStudyMaterialT, ChangeStudyMaterialFormT, ChangeStudyMaterialT } from './../types/studyMaterial';
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
import { StudyMaterialT } from '../types/studyMaterial';
import { getStudyMaterialsPaginated } from '../firebase/db/studyMaterials/get/getStudyMaterialsPaginated';
import { createStudyMaterial } from '../firebase/db/studyMaterials/create/createStudyMaterial';
import { changeStudyMaterial } from '../firebase/db/studyMaterials/edit/changeStudyMaterial';

export const useStudyMaterials = () => {
    const [items,setItems] = useState<StudyMaterialT[]>([]);
    const [count,setCount] = useState<number>();
    const [loading,setLoading] = useState<{items:boolean,create:boolean}>({items:false,create:false});
    const [pagination,setPagination] = useState<PaginationType>({page:1,pageSize:5});
    const [pickedItem,setPickedItem] = useState<StudyMaterialT | null>();
    const [chosenClass,setChosenClass] = useState<ClassT | null>(null);

    const onChangeClass = (classStr:string) => {
        setChosenClass(JSON.parse(classStr) as ClassT);
    }

    const fetch = async (value?:string) => { 
        setLoading(prev => ({...prev,items:true}));
        const items = await getStudyMaterialsPaginated(pagination,value);          
        setItems(items.items);
        setCount(items.count);
        setLoading(prev => ({...prev,items:false}));
    }

    const search = async (value?:string) => {
       fetch(value?.trim().toLowerCase());
    }
    const debounceSearch = useCallback(_debounce(search, 400), []);
    useEffect(() => {
        fetch();
    },[]);

    const onChangePagination = (page:number,pageSize:number) => {
        setPagination({page,pageSize});
    }
    const onCreateItem = async (data:CreateStudyMaterialFormT) => {
        if(!chosenClass) return;
        setLoading(prev => ({...prev,create:true}));
        await createStudyMaterial({...data,class:chosenClass.id});
        setLoading(prev => ({...prev,create:false}));

        setLoading(prev => ({...prev,items:true}));
        await fetch();
        setLoading(prev => ({...prev,items:false}));
    }
    const onChangeItem = async (data:ChangeStudyMaterialT) => {
        if(!pickedItem?.id || !chosenClass) return;
        setLoading(prev => ({...prev,create:true}));
        await changeStudyMaterial(pickedItem?.id,{...data,class:chosenClass.id,price:Number(data.price),subscriptionDuration:Number(data.subscriptionDuration),themes:data.themes.toLowerCase()});
        setLoading(prev => ({...prev,create:false}));

        setLoading(prev => ({...prev,classes:true}));
        await fetch();
        setLoading(prev => ({...prev,classes:false}));
    }
    const onRowEnter = (pickedItem:StudyMaterialT) => {
        setPickedItem(pickedItem);
    }

    return {items,onChangePagination,loading,refetch:fetch,count,pagination,onChangeItem,onCreateItem,onRowEnter,pickedItem,onChangeClass,chosenClass,debounceSearch};
}