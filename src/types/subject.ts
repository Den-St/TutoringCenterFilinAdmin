import { Timestamp } from 'firebase/firestore';
export type SubjectT = {
    id:string,
    name:string,
    isActive:boolean
    createdAt:Timestamp
}

export type CreateSubjectT = {
    name:string
    isActive:boolean,
}

export type ChangeSubjectT = {
    name:string
    isActive:boolean
    createdAt:Date
}