import { testsCollection } from './../../collectionsKeys';
import { query, where, getDocs } from 'firebase/firestore';
import { getSubjectById } from '../../subjects/get/getSubjectById';
import { TestProductT } from '../../../../types/tests';

export const getTestsByName = async (name:string) => {
    try{
        const q = query(testsCollection,
            where('name',">=",name || ''),   
            where('name','<=',(name || '') + "\uf8ff"),);
        const docs = await getDocs(q);
        const testsDocs = docs.docs;
        const tests = testsDocs.map(test => test.data());
        const subjectsQ = tests.map(async test => await getSubjectById(test.subject));
        const subjects = await Promise.all(subjectsQ);

        tests.forEach((test,i) => {
            test.id = testsDocs[i]?.id
            test.subject = subjects[i];
        });

        return tests as TestProductT[];
    }catch(err){
        console.error(err);
    }
}