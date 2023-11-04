import { CreateCourseT } from './../../../../types/course';
import { coursesCollection } from '../../collectionsKeys';
import { addDoc } from 'firebase/firestore';

export const createCourse = async (data:CreateCourseT) => {
    try{
        await addDoc(coursesCollection,{...data,createdAt:new Date()});
    }catch(err){
        console.error(err);
    }
}