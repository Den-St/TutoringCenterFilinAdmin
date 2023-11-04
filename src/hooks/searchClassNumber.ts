import { ClassT } from './../types/class';
import { useCallback, useState } from 'react';
import { getClassesByNumber } from '../firebase/db/classes/get/getClassesByNumber';
import _debounce from 'lodash/debounce';

export const useSearchClass = () => {
    const [classesItems,setClassesItems] = useState<ClassT[]>([]);
    const [loading,setLoading] = useState(false);

    const searchClass = async (value?:string) => {
        if(!value){
            setClassesItems([]);
            return;
        }
        setLoading(true);

        const res = await getClassesByNumber(+value);
        setLoading(false);
        if(!res) return;
        setClassesItems(res);
    }

    const debounceSearchClass = useCallback(_debounce(searchClass, 400), []);

    return {debounceSearchClass,classSearchLoading:loading,classesItems,};
}