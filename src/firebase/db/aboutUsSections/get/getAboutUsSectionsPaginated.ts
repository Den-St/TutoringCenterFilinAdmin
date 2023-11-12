import { aboutUsSectionCollection } from './../../collectionsKeys';
import { getClassById } from './../../classes/get/getClassById';
import { collectionsKeys, coursesCollection } from '../../collectionsKeys';
import { query, startAt, limit, getDocs, orderBy, getCountFromServer, collection, where } from "firebase/firestore"
import { PaginationType } from '../../../../types/pagination';
import { CourseT } from '../../../../types/course';
import { db } from '../../../initializeFirebase';
import { AboutUsSectionT } from '../../../../types/aboutUsSection';

export const getAboutUsSectionsPaginated = async (paginationData:PaginationType,name?:string) => {
    const q = name ? query(aboutUsSectionCollection,orderBy('number','asc'),
                    where('name',">=",name || ''),   
                    where('name','<=',(name || '') + "\uf8ff"),
                    // startAt(paginationData.page - 1 * paginationData.pageSize),
                    // limit(paginationData.pageSize),
                    )
                   : query(aboutUsSectionCollection,orderBy('number','asc'),
                    // startAt(paginationData.page - 1 * paginationData.pageSize),
                    // limit(paginationData.pageSize),
                   );

    const coll = collection(db, collectionsKeys.aboutUsSections);
    const countSnapshot = await getCountFromServer(coll);
    const docs = await getDocs(q);
    const items = docs.docs.map(doc => doc.data());

    docs.docs.forEach((doc,i) => {
        items[i].id = doc.id;
    });
    
    return {items:items as AboutUsSectionT[],count:countSnapshot.data().count};
}