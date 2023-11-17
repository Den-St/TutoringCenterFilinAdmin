import { ClassT } from './../types/class';
import { useCallback, useState, useEffect } from 'react';
import { getClassesByNumber } from '../firebase/db/classes/get/getClassesByNumber';
import _debounce from 'lodash/debounce';

export const useSearchClass = () => {
    const [classesItems,setClassesItems] = useState<ClassT[]>([]);
    const [loading,setLoading] = useState(false);

    const searchClass = async () => {
        setLoading(true);
        const res = await getClassesByNumber();
        setLoading(false);
        if(!res) return;
        setClassesItems(res);
    }
    useEffect(() => {
        searchClass();
    },[])
    // const debounceSearchClass = useCallback(_debounce(searchClass, 400), []);

    return {classSearchLoading:loading,classesItems,};
}