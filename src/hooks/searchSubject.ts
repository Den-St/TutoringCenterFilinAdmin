import { getSubjectByName } from './../firebase/db/subjects/get/getSubjectByName';
import { SubjectT } from './../types/subject';
import { ClassT } from '../types/class';
import { useCallback, useState, useEffect } from 'react';
import { getClassesByNumber } from '../firebase/db/classes/get/getClassesByNumber';
import _debounce from 'lodash/debounce';

export const useSearchSubject = () => {
    const [subjectsItems,setSubjectsItems] = useState<SubjectT[]>([]);
    const [loading,setLoading] = useState(false);

    const searchSubject = async () => {
        setLoading(true);
        const res = await getSubjectByName();
        setLoading(false);
        if(!res) return;
        setSubjectsItems(res);
    }
    useEffect(() => {
        searchSubject()
    },[]);

    return {subjectSearchLoading:loading,subjectsItems,};
}