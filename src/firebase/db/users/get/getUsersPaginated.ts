import { UserT } from './../../../../types/user';
import { getSubjectById } from '../../subjects/get/getSubjectById';
import { getClassById } from '../../classes/get/getClassById';
import { collectionsKeys, coursesCollection, usersCollection } from '../../collectionsKeys';
import { query, startAt, limit, getDocs, orderBy, getCountFromServer, collection, where } from "firebase/firestore"
import { PaginationType } from '../../../../types/pagination';
import { CourseT } from '../../../../types/course';
import { db } from '../../../initializeFirebase';

export const getUsersPaginated = async (paginationData:PaginationType,email?:string) => {
    console.log(paginationData)
    const q = email ? query(usersCollection,orderBy('email','desc'),
                    where('email',">=",email || ''),   
                    where('email','<=',(email || '') + "\uf8ff"),
                    // startAt(paginationData.page - 1 * paginationData.pageSize),
                    // limit(paginationData.pageSize),
                    )
                   : query(usersCollection,orderBy('createdAt','desc'),
                    // startAt(paginationData.page - 1 * paginationData.pageSize),
                    // limit(paginationData.pageSize),
                   );
    const countSnapshot = await getCountFromServer(q);
    const docs = await getDocs(q);
    const items = docs.docs.map(doc => doc.data());

    docs.docs.forEach((doc,i) => {
        items[i].id = doc.id;
    });
    
    return {items:items as UserT[],count:countSnapshot.data().count};
}