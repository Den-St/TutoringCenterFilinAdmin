import { getDocs, query, where } from "firebase/firestore";
import { AdminT } from "../../../../types/admin";
import { adminUsersCollection } from "../../collectionsKeys";

export const getAdminUserByEmail = async (email?:string | null) => {
    try{
        const q = query(adminUsersCollection,where('email', "==", email));
        const docs = await getDocs(q);
        const userDoc = docs.docs[0];

        const user = userDoc.data();
        user.id = userDoc.id;
        
        return user as AdminT;
    }catch(err){
        console.error(err);
    }
}