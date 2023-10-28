import { collection } from "firebase/firestore";
import { db } from "../../initializeFirebase";
import { collectionsKeys } from "../collectionsKeys";

export const adminUsersCollection = collection(db,collectionsKeys.admins);