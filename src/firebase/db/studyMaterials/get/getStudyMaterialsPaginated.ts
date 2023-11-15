import { getClassById } from '../../classes/get/getClassById';
import { collectionsKeys, coursesCollection, studyMaterialsCollection } from '../../collectionsKeys';
import { query, startAt, limit, getDocs, orderBy, getCountFromServer, collection, where } from "firebase/firestore"
import { PaginationType } from '../../../../types/pagination';
import { CourseT } from '../../../../types/course';
import { db } from '../../../initializeFirebase';
import { StudyMaterialT } from '../../../../types/studyMaterial';

export const getStudyMaterialsPaginated = async (paginationData:PaginationType,name?:string) => {
    console.log(paginationData)
    const q = name ? query(studyMaterialsCollection,orderBy('name','desc'),
                    where('name',">=",name || ''),   
                    where('name','<=',(name || '') + "\uf8ff"),
                    // startAt(paginationData.page - 1 * paginationData.pageSize),
                    // limit(paginationData.pageSize),
                    )
                   : query(studyMaterialsCollection,orderBy('createdAt','desc'),
                    // startAt(paginationData.page - 1 * paginationData.pageSize),
                    // limit(paginationData.pageSize),
                   );
    const coll = collection(db, collectionsKeys.courses);
    const countSnapshot = await getCountFromServer(coll);
    const docs = await getDocs(q);
    const items = docs.docs.map(doc => doc.data());
    const classesQ = items.map(async item => await getClassById(item.class));
    const classes = await Promise.all(classesQ);

    docs.docs.forEach((doc,i) => {
        items[i].id = doc.id;
        items[i].class = classes[i];
    });
    
    return {items:items as StudyMaterialT[],count:countSnapshot.data().count};
}