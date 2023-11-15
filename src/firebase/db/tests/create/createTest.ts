import { testsCollection } from './../../collectionsKeys';
import { courseThemesCollection } from '../../collectionsKeys';
import { addDoc } from 'firebase/firestore';
import { CreateCourseThemeT } from '../../../../types/courseThemes';
import { CreateTestProductT } from '../../../../types/tests';

export const createTest = async (data:CreateTestProductT) => {
    try{
        await addDoc(testsCollection,{...data,createdAt:new Date(),price:+data.price,subscriptionDuration:+data.subscriptionDuration});
    }catch(err){
        console.error(err);
    }
}