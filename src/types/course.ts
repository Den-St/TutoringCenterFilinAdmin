import { Timestamp } from 'firebase/firestore';
import { ClassT } from './class';

export type CourseT = {
    id:string;
    class:ClassT,
    shortName?:string
    description:string
    secondName:string
    createdAt:Timestamp
    isActive:boolean
}

export type CreateCourseT = {
    class:string,
    shortName?:string
    description:string
    secondName:string
    createdAt:Date
    isActive:boolean
}

export type ChangeCourseT = {
    class:string,
    shortName?:string
    description:string
    secondName:string
    isActive:boolean
    createdAt:Date
}
