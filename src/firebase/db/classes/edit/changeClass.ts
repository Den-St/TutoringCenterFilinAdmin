import { doc, setDoc } from "firebase/firestore";
import { ChangeClassType } from "../../../../types/class";
import { db } from "../../../initializeFirebase";
import { collectionsKeys } from "../../collectionsKeys";

export const changeClass = async (id:string,newData:ChangeClassType) => {
    try{
        const classRef = doc(db,collectionsKeys.classes,id);
        await setDoc(classRef,{
            ...newData
        });
    }catch(err){
        console.error(err);
    }
   
}