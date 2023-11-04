import { doc, setDoc } from "firebase/firestore";
import { ChangeCourseT } from "../../../../types/course";
import { ChangeCourseThemeT, ChangeCourseThemeWithCourseT } from "../../../../types/courseThemes";
import { db } from "../../../initializeFirebase";
import { collectionsKeys } from "../../collectionsKeys";

export const changeCourseTheme = async (id:string,newData:ChangeCourseThemeT) => {
    try{
        const courseRef = doc(db,collectionsKeys.courseThemes,id);
        await setDoc(courseRef,{
            ...newData
        });
    }catch(err){
        console.error(err);
    }
   
}