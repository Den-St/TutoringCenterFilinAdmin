import { collectionsKeys } from './../../collectionsKeys';
import { db } from './../../../initializeFirebase';
import { doc, getDoc, setDoc } from "firebase/firestore"

export const changeVideoLesson = async (themeId:string,videoLessonId:string) => {
    const themeDoc = doc(db,collectionsKeys.courseThemes,themeId);
    const theme = await getDoc(themeDoc);
    await setDoc(themeDoc,{
        videoLessons:[...theme.data()?.videoLessons,videoLessonId]
    });
}