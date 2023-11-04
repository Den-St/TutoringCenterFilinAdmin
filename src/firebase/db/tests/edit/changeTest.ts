import { doc, setDoc } from "firebase/firestore";
import { ChangeTestT } from "../../../../types/test";
import { db } from "../../../initializeFirebase";
import { collectionsKeys } from "../../collectionsKeys";

export const changeTest= async (id:string,newData:ChangeTestT) => {
    try{
        const ref = doc(db,collectionsKeys.tests,id);
        await setDoc(ref,{
            ...newData
        });
    }catch(err){
        console.error(err);
    }
   
}