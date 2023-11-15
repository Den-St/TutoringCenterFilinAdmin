import { CourseThemeT } from './../../../../types/courseThemes';
import { collectionsKeys } from '../../collectionsKeys';
import { doc, getDoc } from "firebase/firestore"
import { db } from '../../../initializeFirebase';
import { getSubjectById } from '../../subjects/get/getSubjectById';

export const getCourseThemeById = async (id:string) => {
    try{
        const document = doc(db,collectionsKeys.courseThemes,id);
        const courseTheme = (await getDoc(document)).data();
        if(!courseTheme) return;
        const subject = await getSubjectById(courseTheme.subject);
        courseTheme.subject = subject;
        
        return {...courseTheme,id} as CourseThemeT;
    }catch(err){
        console.error(err);
    }
}
