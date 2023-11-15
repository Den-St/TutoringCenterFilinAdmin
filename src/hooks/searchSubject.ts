import { getSubjectByName } from './../firebase/db/subjects/get/getSubjectByName';
import { SubjectT } from './../types/subject';
import { ClassT } from '../types/class';
import { useCallback, useState } from 'react';
import { getClassesByNumber } from '../firebase/db/classes/get/getClassesByNumber';
import _debounce from 'lodash/debounce';

export const useSearchSubject = () => {
    const [subjectsItems,setSubjectsItems] = useState<SubjectT[]>([]);
    const [loading,setLoading] = useState(false);

    const searchSubject = async (value?:string) => {
        if(!value){
            setSubjectsItems([]);
            return;
        }
        setLoading(true);

        const res = await getSubjectByName(value);
        setLoading(false);
        if(!res) return;
        setSubjectsItems(res);
    }

    const debounceSearchSubject = useCallback(_debounce(searchSubject, 400), []);

    return {debounceSearchSubject,subjectSearchLoading:loading,subjectsItems,};
}