import { ChangeStudyMaterialT } from './../../../../types/studyMaterial';
import { doc, setDoc } from "firebase/firestore";
import { ChangeCourseT } from "../../../../types/course";
import { db } from "../../../initializeFirebase";
import { collectionsKeys } from "../../collectionsKeys";

export const changeStudyMaterial = async (id:string,newData:ChangeStudyMaterialT) => {
    try{
        const ref = doc(db,collectionsKeys.studyMaterials,id);
        await setDoc(ref,{
            ...newData
        });
    }catch(err){
        console.error(err);
    }
   
}