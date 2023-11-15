import { collectionsKeys } from '../../collectionsKeys';
import { doc, getDoc } from "firebase/firestore"
import { db } from '../../../initializeFirebase';
import { getSubjectById } from '../../subjects/get/getSubjectById';
import { TestProductT } from '../../../../types/tests';

export const getCourseThemeById = async (id:string) => {
    try{
        const document = doc(db,collectionsKeys.tests,id);
        const tests = (await getDoc(document)).data();
        if(!tests) return;
        const subject = await getSubjectById(tests.subject);
        tests.subject = subject;
        
        return {...tests,id} as TestProductT;
    }catch(err){
        console.error(err);
    }
}
