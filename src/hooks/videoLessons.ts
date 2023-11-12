import { changeVideoLesson } from './../firebase/db/videoLessons/edit/changeVideoLessons';
import { getVideoLessonsPaginated } from './../firebase/db/videoLessons/get/getVideoLessonsPaginated';
import { CourseThemeT } from '../types/courseThemes';
import { useCallback, useEffect } from 'react';
import { PaginationType } from '../types/pagination';
import { useState } from 'react';
import { ChangeVideoLessonT, CreateVideoLessonT, VideoLessonT } from '../types/videoLesson';
import { createVideoLesson } from '../firebase/db/videoLessons/create/createVideoLesson';
import _debounce from 'lodash/debounce';

export const useVideoLessons = () => {
    const [items,setItems] = useState<VideoLessonT[]>([]);
    const [count,setCount] = useState<number>();
    const [loading,setLoading] = useState<{items:boolean,create:boolean}>({items:false,create:false});
    const [pagination,setPagination] = useState<PaginationType>({page:1,pageSize:5});
    const [pickedItem,setPickedItem] = useState<VideoLessonT | null>();
    const [chosenTheme,setChosenTheme] = useState<CourseThemeT | null>(null);
    
    const onChangeChosenTheme = (themeStringified:string) => {
        setChosenTheme(JSON.parse(themeStringified) as CourseThemeT);
    }
    const fetch = async (name?:string) => { 
        setLoading(prev => ({...prev,items:true}));
        const items = await getVideoLessonsPaginated(pagination,name);          
        setItems(items.videoLessons);
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
    const onCreateItem = async (data:CreateVideoLessonT) => {
        if(!chosenTheme) return;
        setLoading(prev => ({...prev,create:true}));
        await createVideoLesson({...data,courseTheme:chosenTheme.id,number:Number(data.number)});
        setLoading(prev => ({...prev,create:false}));

        setLoading(prev => ({...prev,items:true}));
        await fetch();
        setLoading(prev => ({...prev,items:false}));
    }
    const onChangeItem = async (data:ChangeVideoLessonT) => {
        if(!pickedItem?.id || !chosenTheme) return;
        setLoading(prev => ({...prev,create:true}));
        await changeVideoLesson(pickedItem?.id,{...data,courseTheme:chosenTheme.id});
        setLoading(prev => ({...prev,create:false}));

        setLoading(prev => ({...prev,classes:true}));
        await fetch();
        setLoading(prev => ({...prev,classes:false}));
    }
    const onRowEnter = (pickedItem:VideoLessonT) => {
        setPickedItem(pickedItem);
    }

    return {items,onChangePagination,loading,refetch:fetch,count,pagination,onChangeItem,onCreateItem,onRowEnter,pickedItem,onChangeChosenTheme,chosenTheme,debounceSearch};
}