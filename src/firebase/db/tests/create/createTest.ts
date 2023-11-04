import { CreateTestT } from './../../../../types/test';
import { testsCollection, videoLessonsCollection } from '../../collectionsKeys';
import { courseThemesCollection } from '../../collectionsKeys';
import { addDoc } from 'firebase/firestore';
import { CreateCourseThemeT } from '../../../../types/courseThemes';
import { CreateVideoLessonT } from '../../../../types/videoLesson';

export const createTest = async (data:CreateTestT) => {
    try{
        await addDoc(testsCollection,{...data,createdAt:new Date(),isActive:!!data.isActive});
    }catch(err){
        console.error(err);
    }
}