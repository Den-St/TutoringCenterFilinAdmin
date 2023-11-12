import { doc, setDoc } from "firebase/firestore";
import { ChangeAboutUsSectionT } from "../../../../types/aboutUsSection";
import { ChangeClassType } from "../../../../types/class";
import { db } from "../../../initializeFirebase";
import { collectionsKeys } from "../../collectionsKeys";

export const changeAboutUsSections = async (id:string,newData:ChangeAboutUsSectionT) => {
    try{
        const classRef = doc(db,collectionsKeys.classes,id);
        await setDoc(classRef,{
            ...newData
        });
    }catch(err){
        console.error(err);
    }
   
}