import { eventsCollection } from '../../collectionsKeys';
import { addDoc } from 'firebase/firestore';
import { CreateEventT } from '../../../../types/event';

export const createEvent = async (data:CreateEventT) => {
    try{
        await addDoc(eventsCollection,{...data,createdAt:new Date(),});
    }catch(err){
        console.error(err);
    }
}