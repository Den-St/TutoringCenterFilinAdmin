import { CourseT } from '../../../../types/course';
import { coursesCollection } from '../../collectionsKeys';
import { query, where, getDocs } from 'firebase/firestore';
import { getSubjectById } from '../../subjects/get/getSubjectById';

export const getCoursesBySecondName = async (secondName:string) => {
    try{
        const q = query(coursesCollection,
            where('secondName',">=",secondName || ''),   
            where('secondName','<=',(secondName || '') + "\uf8ff"),
        );
        const docs = await getDocs(q);
        const coursesDocs = docs.docs;
        const courses = coursesDocs.map(classDoc => classDoc.data());
        const subjectsQ = courses.map(async course => await getSubjectById(course.subject));
        const subjects = await Promise.all(subjectsQ);
        
        courses.forEach((classItem,i) => {
            classItem.id = coursesDocs[i]?.id
            classItem.subject = subjects[i]
        });

        return courses as CourseT[];
    }catch(err){
        console.error(err);
    }
}