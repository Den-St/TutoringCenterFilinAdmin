import { ChangeEventFormT } from './../types/event';
import { useCallback, useEffect } from 'react';
import { ref, uploadBytes } from "firebase/storage";
import { PaginationType } from '../types/pagination';
import { useState } from 'react';
import _debounce from 'lodash/debounce';
import { v4 } from 'uuid';
import { storage } from '../firebase/initializeFirebase';
import { CreateEventFormT, EventT } from '../types/event';
import { getEventsPaginated } from '../firebase/db/events/get/getEventsPaginated';
import { createEvent } from '../firebase/db/events/create/createEvent';
import { changeEvent } from '../firebase/db/events/edit/changeEvent';

export const useEvents = () => {
    const [items,setItems] = useState<EventT[]>([]);
    const [count,setCount] = useState<number>();
    const [loading,setLoading] = useState<{items:boolean,create:boolean}>({items:false,create:false});
    const [pagination,setPagination] = useState<PaginationType>({page:1,pageSize:5});
    const [pickedItem,setPickedItem] = useState<EventT | null>();

    const fetch = async (name?:string) => { 
        setLoading(prev => ({...prev,items:true}));
        const items = await getEventsPaginated(pagination,name);          
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
    const uploadImages = async (files:File[]) => {
        const imagesRef = files.map(file => ref(storage, `eventsImages/${file.name + v4()}`));
        const uploadQ = imagesRef.map(async (ref,i) => await uploadBytes(ref,files[i]));
        return await Promise.all(uploadQ);
    }
    const onCreateItem = async (data:CreateEventFormT) => {
        setLoading(prev => ({...prev,create:true}));
        const photos = await uploadImages(data.photos);
        await createEvent({...data,photos:photos?.map(image => image.metadata.fullPath)});
        setLoading(prev => ({...prev,create:false}));

        setLoading(prev => ({...prev,items:true}));
        await fetch();
        setLoading(prev => ({...prev,items:false}));
    }
    const onChangeItem = async (data:ChangeEventFormT) => {
        if(!pickedItem?.id) return;
        setLoading(prev => ({...prev,create:true}));
        const photos = await uploadImages(data.photos);
        await changeEvent(pickedItem?.id,{...data,photos:photos?.map(image => image.metadata.fullPath)});
        setLoading(prev => ({...prev,create:false}));

        setLoading(prev => ({...prev,classes:true}));
        await fetch();
        setLoading(prev => ({...prev,classes:false}));
    }
    const onRowEnter = (pickedItem:EventT) => {
        setPickedItem(pickedItem);
    }

    return {items,onChangePagination,loading,refetch:fetch,count,pagination,onChangeItem,onCreateItem,onRowEnter,pickedItem,debounceSearch};
}