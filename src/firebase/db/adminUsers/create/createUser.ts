import { adminUsersCollection } from '../../collectionsKeys';
import { addDoc } from "firebase/firestore";
import { CreateUserT } from '../../../../types/user';

export const createUser = async (user:CreateUserT) => {
    try{
        await addDoc(adminUsersCollection,
            {
                ...user,
            });
    }catch(err){
        console.error(err);
    }
}