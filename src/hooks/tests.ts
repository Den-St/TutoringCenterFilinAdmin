import { changeTest } from './../firebase/db/tests/edit/changeTest';
import { CreateTestT, TestT, ChangeTestT, CreateTestFormT, ChangeTestFormT } from './../types/test';
import { changeVideoLesson } from '../firebase/db/videoLessons/edit/changeVideoLessons';
import { getVideoLessonsPaginated } from '../firebase/db/videoLessons/get/getVideoLessonsPaginated';
import { CourseThemeT } from '../types/courseThemes';
import { useCallback, useEffect } from 'react';
import { ref, uploadBytes } from "firebase/storage";
import { PaginationType } from '../types/pagination';
import { useState } from 'react';
import { ChangeVideoLessonT, CreateVideoLessonT, VideoLessonT } from '../types/videoLesson';
import { createVideoLesson } from '../firebase/db/videoLessons/create/createVideoLesson';
import _debounce from 'lodash/debounce';
import { getTestsPaginated } from '../firebase/db/tests/get/getTestsPaginated';
import { createTest } from '../firebase/db/tests/create/createTest';
import { v4 } from 'uuid';
import { storage } from '../firebase/initializeFirebase';

export const useTests = () => {
    const [items,setItems] = useState<TestT[]>([]);
    const [count,setCount] = useState<number>();
    const [loading,setLoading] = useState<{items:boolean,create:boolean}>({items:false,create:false});
    const [pagination,setPagination] = useState<PaginationType>({page:1,pageSize:5});
    const [pickedItem,setPickedItem] = useState<TestT | null>();
    const [chosenTheme,setChosenTheme] = useState<CourseThemeT | null>(null);
    
    const onChangeChosenTheme = (themeStringified:string) => {
        setChosenTheme(JSON.parse(themeStringified) as CourseThemeT);
    }
    const fetch = async (description?:string) => { 
        setLoading(prev => ({...prev,items:true}));
        const items = await getTestsPaginated(pagination,description);          
        setItems(items.tests);
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
    const uploadImages = async (files:File[]) => {
        const imagesRef = files.map(file => ref(storage, `testImages/${file.name + v4()}`));
        const uploadQ = imagesRef.map(async (ref,i) => await uploadBytes(ref,files[i]));
        return await Promise.all(uploadQ);
    }
    const onCreateItem = async (data:CreateTestFormT) => {
        if(!chosenTheme) return;
        setLoading(prev => ({...prev,create:true}));
        const photos = await uploadImages(data.photos);
        await createTest({...data,courseTheme:chosenTheme.id,photos:photos?.map(image => image.metadata.fullPath),number:Number(data.number)});
        setLoading(prev => ({...prev,create:false}));

        setLoading(prev => ({...prev,items:true}));
        await fetch();
        setLoading(prev => ({...prev,items:false}));
    }
    const onChangeItem = async (data:ChangeTestFormT) => {
        if(!pickedItem?.id || !chosenTheme) return;
        setLoading(prev => ({...prev,create:true}));
        const photos = await uploadImages(data.photos);
        await changeTest(pickedItem?.id,{...data,courseTheme:chosenTheme.id,photos:photos?.map(image => image.metadata.fullPath)});
        setLoading(prev => ({...prev,create:false}));

        setLoading(prev => ({...prev,classes:true}));
        await fetch();
        setLoading(prev => ({...prev,classes:false}));
    }
    const onRowEnter = (pickedItem:TestT) => {
        setPickedItem(pickedItem);
    }

    return {items,onChangePagination,loading,refetch:fetch,count,pagination,onChangeItem,onCreateItem,onRowEnter,pickedItem,onChangeChosenTheme,chosenTheme,debounceSearch};
}