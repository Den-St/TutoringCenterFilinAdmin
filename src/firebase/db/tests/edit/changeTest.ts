import { ChangeTestProductT } from '../../../../types/tests';
import { doc, setDoc } from "firebase/firestore";
import { ChangeCourseT } from "../../../../types/course";
import { ChangeCourseThemeT, ChangeCourseThemeWithCourseT } from "../../../../types/courseThemes";
import { db } from "../../../initializeFirebase";
import { collectionsKeys } from "../../collectionsKeys";

export const changeTest = async (id:string,newData:ChangeTestProductT) => {
    try{
        const ref = doc(db,collectionsKeys.tests,id);
        await setDoc(ref,{
            ...newData
        });
    }catch(err){
        console.error(err);
    }
   
}