import { ChangeUserT } from './../../../../types/user';
import { doc, setDoc } from "firebase/firestore";
import { db } from "../../../initializeFirebase";
import { collectionsKeys } from "../../collectionsKeys";

export const changeUser = async (id:string,newData:ChangeUserT) => {
    try{
        const ref = doc(db,collectionsKeys.users,id);
        await setDoc(ref,{
            ...newData
        });
    }catch(err){
        console.error(err);
    }
   
}