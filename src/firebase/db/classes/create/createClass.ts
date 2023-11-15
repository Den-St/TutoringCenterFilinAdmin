import { CreateClassType } from './../../../../types/class';
import { addDoc } from 'firebase/firestore';
import { classesCollection } from '../../collectionsKeys';

export const createClass = async (data:CreateClassType) => {
    try{
        await addDoc(classesCollection,{...data,number:+data.number,createdAt:new Date()});
    }catch(err){
        console.error(err);
    }
}