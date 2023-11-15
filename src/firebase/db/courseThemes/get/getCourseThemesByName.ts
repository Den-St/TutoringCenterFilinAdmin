import { coursesCollection, courseThemesCollection } from './../../collectionsKeys';
import { query, where, getDocs } from 'firebase/firestore';
import { CourseThemeT } from '../../../../types/courseThemes';
import { getSubjectById } from '../../subjects/get/getSubjectById';

export const getCourseThemesByName = async (name:string) => {
    try{
        const q = query(courseThemesCollection,
            where('name',">=",name || ''),   
            where('name','<=',(name || '') + "\uf8ff"),);
        const docs = await getDocs(q);
        const courseThemesDocs = docs.docs;
        const themes = courseThemesDocs.map(classDoc => classDoc.data());
        const subjectsQ = themes.map(async theme => await getSubjectById(theme.subject));
        const subjects = await Promise.all(subjectsQ);

        themes.forEach((theme,i) => {
            theme.id = courseThemesDocs[i]?.id
            theme.subject = subjects[i];
        });

        return themes as CourseThemeT[];
    }catch(err){
        console.error(err);
    }
}