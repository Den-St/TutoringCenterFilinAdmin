import { videoLessonsCollection } from './../../collectionsKeys';
import { courseThemesCollection } from '../../collectionsKeys';
import { addDoc } from 'firebase/firestore';
import { CreateCourseThemeT } from '../../../../types/courseThemes';
import { CreateVideoLessonT } from '../../../../types/videoLesson';

export const createVideoLesson = async (data:CreateVideoLessonT) => {
    try{
        await addDoc(videoLessonsCollection,{...data,createdAt:new Date(),isActive:!!data.isActive});
    }catch(err){
        console.error(err);
    }
}