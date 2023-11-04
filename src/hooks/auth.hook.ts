import { UserT } from './../types/user';
import { onAuthStateChanged } from "firebase/auth";
import { useState, useEffect } from "react";
import { googleAuthProvider } from "../firebase/initializeFirebase";
import { setUser } from "../store/userSlice";
import { useAppDispacth } from "./redux";
import { getAdminUserByEmail } from '../firebase/db/adminUsers/get/getAdminUserByEmail';

export const useAuth = () => {
    const [loading, setLoading] = useState(true);
    const [isSignedIn,setIsSignedIn] = useState(true);
    const dispatch = useAppDispacth();
    
    useEffect(() => {
        onAuthStateChanged(googleAuthProvider,async () => {
            setIsSignedIn(true);
            if(!googleAuthProvider.currentUser) {
                setLoading(false);
                setIsSignedIn(false);
                return;
            }

            const user = await getAdminUserByEmail(googleAuthProvider.currentUser?.email);

            const userDataGoogle:UserT = {
                email:googleAuthProvider.currentUser?.email,
            }
            console.log('fd',userDataGoogle);
            dispatch(setUser({
                ...userDataGoogle,...user
            }));
        });
        setLoading(false);
    },[]);

    return {loading, isSignedIn, setIsSignedIn};
}