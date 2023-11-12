import { doc, setDoc } from "firebase/firestore";
import { ChangeEventT } from "../../../../types/event";
import { db } from "../../../initializeFirebase";
import { collectionsKeys } from "../../collectionsKeys";

export const changeEvent = async (id:string,newData:ChangeEventT) => {
    try{
        const ref = doc(db,collectionsKeys.events,id);
        await setDoc(ref,{
            ...newData
        });
    }catch(err){
        console.error(err);
    }
   
}