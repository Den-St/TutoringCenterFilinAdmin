import { doc, setDoc } from "firebase/firestore";
import { ChangeVideoLessonT } from "../../../../types/videoLesson";
import { db } from "../../../initializeFirebase";
import { collectionsKeys } from "../../collectionsKeys";

export const changeVideoLesson = async (id:string,newData:ChangeVideoLessonT) => {
    try{
        console.log(newData);
        const courseRef = doc(db,collectionsKeys.videoLessons,id);
        await setDoc(courseRef,{
            ...newData
        });
    }catch(err){
        console.error(err);
    }
   
}