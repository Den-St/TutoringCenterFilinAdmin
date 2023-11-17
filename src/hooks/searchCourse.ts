import { CourseT } from './../types/course';
import {  useState, useEffect } from 'react';
import _debounce from 'lodash/debounce';
import { getCoursesBySecondName } from '../firebase/db/courses/get/getCoursesBySecondName';

export const useSearchCourse = () => {
    const [coursesItems,setCoursesItems] = useState<CourseT[]>([]);
    const [loading,setLoading] = useState(false);

    const searchClass = async () => {
        setLoading(true);
        const res = await getCoursesBySecondName();
        setLoading(false);
        if(!res) return;
        setCoursesItems(res);
    }
    useEffect(() => {
        searchClass()
    },[]);

    return {classSearchLoading:loading,coursesItems,};
}