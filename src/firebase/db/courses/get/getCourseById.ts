import { collectionsKeys } from '../../collectionsKeys';
import { doc, getDoc } from "firebase/firestore"
import { db } from '../../../initializeFirebase';
import { CourseT } from '../../../../types/course';
import { getSubjectById } from '../../subjects/get/getSubjectById';

export const getCourseById = async (id:string) => {
    try{
        const document = doc(db,collectionsKeys.courses,id);
        const courseItem = (await getDoc(document)).data();
        if(!courseItem) return;

        const subject = await getSubjectById(courseItem.subject);
        courseItem.subject = subject;
        
        return {...courseItem,id} as CourseT;
    }catch(err){
        console.error(err);
    }
}
