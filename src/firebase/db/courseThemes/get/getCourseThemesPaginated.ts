import { collectionsKeys, courseThemesCollection } from '../../collectionsKeys';
import { query, startAt, limit, getDocs, orderBy, getCountFromServer, collection, where } from "firebase/firestore"
import { PaginationType } from '../../../../types/pagination';
import { db } from '../../../initializeFirebase';
import { getCourseById } from '../../courses/get/getCourseById';
import { CourseThemeT } from '../../../../types/courseThemes';
import { getSubjectById } from '../../subjects/get/getSubjectById';

export const getCourseThemesPaginated = async (paginationData:PaginationType,name?:string) => {
    const q = name ? query(courseThemesCollection,orderBy('name','desc'),
                    where('name',">=",name || ''),   
                    where('name','<=',(name || '') + "\uf8ff"),
                    // startAt(paginationData.page - 1 * paginationData.pageSize),
                    // limit(paginationData.pageSize),
                    )
                   : query(courseThemesCollection,orderBy('createdAt','desc'),
                    // startAt(paginationData.page - 1 * paginationData.pageSize),
                    // limit(paginationData.pageSize),
                   );
    const coll = collection(db, collectionsKeys.courseThemes);
    const countSnapshot = await getCountFromServer(coll);
    const docs = await getDocs(q);
    const courseThemes = docs.docs.map(doc => doc.data());
    const coursesQ = courseThemes.map(async courseTheme => await getCourseById(courseTheme.course));
    const courses = await Promise.all(coursesQ);
    const subjectsQ = courseThemes.map(async theme => await getSubjectById(theme.subject));
    const subjects = await Promise.all(subjectsQ);
    
    courseThemes.forEach((theme,i) => {
        theme.id = docs.docs[i].id;
        theme.course = courses[i];
        theme.subject = subjects[i];
    });
    
    return {courseThemes:courseThemes as CourseThemeT[],count:countSnapshot.data().count};
}