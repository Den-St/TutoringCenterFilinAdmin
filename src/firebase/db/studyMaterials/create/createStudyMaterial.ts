import { CreateStudyMaterialT } from './../../../../types/studyMaterial';
import { coursesCollection, studyMaterialsCollection } from '../../collectionsKeys';
import { addDoc } from 'firebase/firestore';

export const createStudyMaterial = async (data:CreateStudyMaterialT) => {
    try{
        console.log('data',data)
        await addDoc(studyMaterialsCollection,{...data,createdAt:new Date(),price:Number(data.price),subscriptionDuration:Number(data.subscriptionDuration),themes:data.themes.toLowerCase()});
    }catch(err){
        console.error(err);
    }
}