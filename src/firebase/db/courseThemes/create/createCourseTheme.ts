import { courseThemesCollection } from './../../collectionsKeys';
import { addDoc } from 'firebase/firestore';
import { CreateCourseThemeT } from '../../../../types/courseThemes';

export const createCourseTheme = async (data:CreateCourseThemeT) => {
    try{
        await addDoc(courseThemesCollection,{...data,createdAt:new Date(),price:+data.price,subscriptionDuration:+data.subscriptionDuration,videoLessons:[]});
    }catch(err){
        console.error(err);
    }
}