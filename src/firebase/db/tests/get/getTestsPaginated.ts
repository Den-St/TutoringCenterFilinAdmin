import { TestProductT } from './../../../../types/tests';
import { testsCollection } from './../../collectionsKeys';
import { collectionsKeys, courseThemesCollection } from '../../collectionsKeys';
import { query, startAt, limit, getDocs, orderBy, getCountFromServer, collection, where } from "firebase/firestore"
import { PaginationType } from '../../../../types/pagination';
import { db } from '../../../initializeFirebase';
import { getCourseById } from '../../courses/get/getCourseById';
import { getSubjectById } from '../../subjects/get/getSubjectById';

export const getTestsPaginated = async (paginationData:PaginationType,name?:string) => {
    const q = name ? query(testsCollection,orderBy('name','desc'),
                    where('name',">=",name || ''),   
                    where('name','<=',(name || '') + "\uf8ff"),
                    // startAt(paginationData.page - 1 * paginationData.pageSize),
                    // limit(paginationData.pageSize),
                    )
                   : query(testsCollection,orderBy('createdAt','desc'),
                    // startAt(paginationData.page - 1 * paginationData.pageSize),
                    // limit(paginationData.pageSize),
                   );
    const coll = collection(db, collectionsKeys.tests);
    const countSnapshot = await getCountFromServer(coll);
    const docs = await getDocs(q);
    const items = docs.docs.map(doc => doc.data());
    const coursesQ = items.map(async item => await getCourseById(item.course));
    const courses = await Promise.all(coursesQ);
    const subjectsQ = items.map(async item => await getSubjectById(item.subject));
    const subjects = await Promise.all(subjectsQ);
    
    items.forEach((item,i) => {
        item.id = docs.docs[i].id;
        item.course = courses[i];
        item.subject = subjects[i];
    });
    
    return {items:items as TestProductT[],count:countSnapshot.data().count};
}