import { EventT } from './../../../../types/event';
import { eventsCollection } from './../../collectionsKeys';
import { collectionsKeys, courseThemesCollection } from '../../collectionsKeys';
import { query, startAt, limit, getDocs, orderBy, getCountFromServer, collection, where } from "firebase/firestore"
import { PaginationType } from '../../../../types/pagination';
import { db } from '../../../initializeFirebase';
import { getCourseById } from '../../courses/get/getCourseById';
import { CourseThemeT } from '../../../../types/courseThemes';

export const getEventsPaginated = async (paginationData:PaginationType,name?:string) => {
    const q = name ? query(eventsCollection,orderBy('name','desc'),
                    where('name',">=",name || ''),   
                    where('name','<=',(name || '') + "\uf8ff"),
                    // startAt(paginationData.page - 1 * paginationData.pageSize),
                    // limit(paginationData.pageSize),
                    )
                   : query(eventsCollection,orderBy('createdAt','desc'),
                    // startAt(paginationData.page - 1 * paginationData.pageSize),
                    // limit(paginationData.pageSize),
                   );
    const coll = collection(db, collectionsKeys.courseThemes);
    const countSnapshot = await getCountFromServer(coll);
    const docs = await getDocs(q);
    const items = docs.docs.map(doc => doc.data());

    docs.docs.forEach((doc,i) => {
        items[i].id = doc.id;
    });
    
    return {items:items as EventT[],count:countSnapshot.data().count};
}