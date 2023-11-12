import { createAboutUsSections } from './../firebase/db/aboutUsSections/create/createAboutUsSections';
import { CreateAboutUsSectionT, ChangeAboutUsSectionT } from './../types/aboutUsSection';
import { useCallback, useEffect } from 'react';
import { PaginationType } from '../types/pagination';
import { useState } from 'react';
import { AboutUsSectionT } from '../types/aboutUsSection';
import { getAboutUsSectionsPaginated } from '../firebase/db/aboutUsSections/get/getAboutUsSectionsPaginated';
import { changeAboutUsSections } from '../firebase/db/aboutUsSections/edit/changeAboutUsSections';
import _debounce from 'lodash/debounce';

export const useAdminAboutUsSections = () => {
    const [items,setItems] = useState<AboutUsSectionT[]>([]);
    const [count,setCount] = useState<number>();
    const [loading,setLoading] = useState<{items:boolean,create:boolean}>({items:false,create:false});
    const [pagination,setPagination] = useState<PaginationType>({page:1,pageSize:12});
    const [pickedItem,setPickedItem] = useState<AboutUsSectionT | null>();

    const fetch = async (name?:string) => { 
        setLoading(prev => ({...prev,classes:true}));
        const res = await getAboutUsSectionsPaginated(pagination,name);          
        setItems(res.items);
        setCount(res.count);
        setLoading(prev => ({...prev,classes:false}));
    }
    const search = async (value?:string) => {
        fetch(value?.trim());
    }
    const debounceSearch = useCallback(_debounce(search, 400), []);
    useEffect(() => {
        fetch();
    },[]);  
    console.log(items)
    const onChangePagination = (page:number,pageSize:number) => {
        setPagination({page,pageSize});
    }
    const onCreateItem = async (data:CreateAboutUsSectionT) => {
        console.log(data);
        setLoading(prev => ({...prev,create:true}));
        await createAboutUsSections({...data});
        setLoading(prev => ({...prev,create:false}));

        setLoading(prev => ({...prev,classes:true}));
        await fetch();
        setLoading(prev => ({...prev,classes:false}));
    }
    const onChangeItem = async (data:ChangeAboutUsSectionT) => {
        if(!pickedItem?.id) return;
        setLoading(prev => ({...prev,create:true}));
        await changeAboutUsSections(pickedItem?.id,{...data});
        setLoading(prev => ({...prev,create:false}));

        setLoading(prev => ({...prev,classes:true}));
        await fetch();
        setLoading(prev => ({...prev,classes:false}));
    }
    const onRowEnter = (pickedClass:AboutUsSectionT) => {
        setPickedItem(pickedClass);
    }

    return {items,onChangePagination,loading,refetch:fetch,count,pagination,onCreateItem,onChangeItem,onRowEnter,pickedItem,debounceSearch};
}