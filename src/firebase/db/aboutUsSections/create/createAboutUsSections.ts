import { CreateAboutUsSectionT } from './../../../../types/aboutUsSection';
import { CreateClassType } from '../../../../types/class';
import { addDoc } from 'firebase/firestore';
import { aboutUsSectionCollection, classesCollection } from '../../collectionsKeys';

export const createAboutUsSections = async (data:CreateAboutUsSectionT) => {
    try{
        await addDoc(aboutUsSectionCollection,{...data,createdAt:new Date()});
    }catch(err){
        console.error(err);
    }
}