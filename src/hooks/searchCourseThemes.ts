import { useCallback, useState } from 'react';
import _debounce from 'lodash/debounce';
import { CourseThemeT } from '../types/courseThemes';
import { getCourseThemesByName } from '../firebase/db/courseThemes/get/getCourseThemesByName';

export const useSearchCourseThemes = () => {
    const [courseThemesItems,setCourseThemesItems] = useState<CourseThemeT[]>([]);
    const [loading,setLoading] = useState(false);

    const searchClass = async (value?:string) => {
        if(!value){
            setCourseThemesItems([]);
            return;
        }
        setLoading(true);

        const res = await getCourseThemesByName(value);
        setLoading(false);
        if(!res) return;
        setCourseThemesItems(res);
    }

    const debounceSearchClass = useCallback(_debounce(searchClass, 400), []);

    return {debounceSearchClass,classSearchLoading:loading,courseThemesItems,};
}