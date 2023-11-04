import { doc, setDoc } from "firebase/firestore";
import { ChangeCourseT } from "../../../../types/course";
import { db } from "../../../initializeFirebase";
import { collectionsKeys } from "../../collectionsKeys";

export const changeCourse = async (id:string,newData:ChangeCourseT) => {
    try{
        console.log(':)',newData.createdAt);
        const courseRef = doc(db,collectionsKeys.courses,id);
        await setDoc(courseRef,{
            ...newData
        });
    }catch(err){
        console.error(err);
    }
   
}