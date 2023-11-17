import { SubjectT } from '../../../../types/subject';
import { ClassT } from '../../../../types/class';
import { query, where, getDocs } from 'firebase/firestore';
import { classesCollection, subjectsCollection } from '../../collectionsKeys';

export const getSubjectByName = async () => {
    try{
        const q = query(subjectsCollection,
        );
        
        const docs = await getDocs(q);
        const itemsDocs = docs.docs;
        const items = itemsDocs.map(doc => doc.data());
        console.log(itemsDocs[0]?.id)

        items.forEach((item,i) => item.id = itemsDocs[i]?.id);

        return items as SubjectT[];
    }catch(err){
        console.error(err);
    }
}