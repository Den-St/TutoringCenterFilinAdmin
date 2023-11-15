import { collection } from 'firebase/firestore';
import { db } from '../initializeFirebase';
export enum collectionsKeys {
    users = "users",
    classes = "classes",
    admins = "admins",
    courses = "courses",
    courseThemes = "courseThemes",
    videoLessons = "videoLessons",
    tests = "tests",
    aboutUsSections = "aboutUsSections",
    events = "events",
    studyMaterials = "studyMaterials",
    subjects = "subjects",
};

export const classesCollection = collection(db,collectionsKeys.classes);
export const coursesCollection = collection(db,collectionsKeys.courses);
export const adminUsersCollection = collection(db,collectionsKeys.admins);
export const courseThemesCollection = collection(db,collectionsKeys.courseThemes);
export const videoLessonsCollection = collection(db,collectionsKeys.videoLessons);
export const testsCollection = collection(db,collectionsKeys.tests);
export const aboutUsSectionCollection = collection(db,collectionsKeys.aboutUsSections);
export const eventsCollection = collection(db,collectionsKeys.events);
export const studyMaterialsCollection = collection(db,collectionsKeys.studyMaterials);
export const subjectsCollection = collection(db,collectionsKeys.subjects);
