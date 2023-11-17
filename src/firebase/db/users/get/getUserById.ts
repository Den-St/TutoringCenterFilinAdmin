import { UserT } from './../../../../types/user';
import { collectionsKeys } from '../../collectionsKeys';
import { doc, getDoc } from "firebase/firestore"
import { db } from '../../../initializeFirebase';
import { CourseT } from '../../../../types/course';
import { getSubjectById } from '../../subjects/get/getSubjectById';

export const getUserById = async (id:string) => {
    try{
        const document = doc(db,collectionsKeys.users,id);
        const item = (await getDoc(document)).data();
        if(!item) return;

        return {...item,id} as UserT;
    }catch(err){
        console.error(err);
    }
}
