import { Timestamp } from 'firebase/firestore';
import { VideoLessonT } from './videoLesson';
import { ClassT } from './class';
import { TestT } from './test';
import { DocumentT } from './document';

export type StudyMaterialT = {
    id:string,
    forTeachers:boolean,
    class:ClassT
    name:string;
    description:string
    createdAt:Timestamp
    videoLessons:Record<number,VideoLessonT>[]
    tests:Record<number,TestT>[]
    documents:Record<number,DocumentT>[]
    price:number,
    themes:string
    subscriptionDuration:number
}

export type CreateStudyMaterialT = {
    forTeachers:boolean,
    class:string
    name:string;
    description:string
    videoLessons:Record<number,VideoLessonT>[]
    tests:Record<number,TestT>[]
    documents:Record<number,DocumentT>[]
    price:number
    createdAt:Date
    themes:string
    subscriptionDuration:number

}

export type CreateStudyMaterialFormT = {
    forTeachers:boolean,
    class:ClassT
    name:string;
    description:string
    videoLessons:Record<number,VideoLessonT>[]
    tests:Record<number,TestT>[]
    documents:Record<number,DocumentT>[]
    price:number
    themes:string
    subscriptionDuration:number
    createdAt:Date
}

export type ChangeStudyMaterialT = {
    forTeachers:boolean,
    class:string
    name:string;
    description:string
    videoLessons:Record<number,VideoLessonT>[]
    tests:Record<number,TestT>[]
    documents:Record<number,DocumentT>[]
    price:number
    themes:string
    subscriptionDuration:number
    createdAt:Date
}

export type ChangeStudyMaterialFormT = {
    forTeachers:boolean,
    class:ClassT
    name:string;
    description:string
    videoLessons:Record<number,VideoLessonT>[]
    tests:Record<number,TestT>[]
    documents:Record<number,DocumentT>[]
    price:number
    themes:string
    subscriptionDuration:number
    createdAt:Date
}