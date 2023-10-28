import { getDocs, query, where } from "firebase/firestore";
import { adminUsersCollection } from "../adminUsers.collection";

export const getUserByEmail = async (email?:string | null) => {
    try{
        const q = query(adminUsersCollection,where('email', "==", email));
        const docs = await getDocs(q);
        const userDoc = docs.docs[0];
        console.log(docs.docs);
        const user = userDoc.data();
        user.id = userDoc.id;
        
        return user;
    }catch(err){
        console.error(err);
    }
}