import { SubjectT } from './subject';
import { CourseT } from './course';
import { CreateDocumentT, DocumentT } from './document';
import { TestT } from './test';
import { VideoLessonT } from './videoLesson';


export type CourseThemeT = {
    id:string
    course:CourseT
    name:string
    subscriptionDuration:number
    price:number,
    isActive:boolean,
    videoLessons:Record<number,VideoLessonT>[],
    tests:Record<number,TestT>[],
    documents:Record<number,DocumentT>[]
    subject:SubjectT
}

export type CreateCourseThemeT = {
    course:string
    name:string
    subscriptionDuration:number
    price:number
    isActive:boolean,
    videoLessons:Record<number,VideoLessonT>[]
    tests:Record<number,TestT>[],
    documents:DocumentT[]
    subject:string
}

export type CreateCourseThemeFormT = {
    course:string
    name:string
    subscriptionDuration:number
    price:number
    isActive:boolean,
    videoLessons:Record<number,VideoLessonT>[]
    tests:Record<number,TestT>[],
    documents:CreateDocumentT[]
    subject:string
}

export type ChangeCourseThemeT = {
    course:string
    name:string
    subscriptionDuration:number
    price:number
    isActive:boolean
    videoLessons:Record<number,VideoLessonT>[]
    tests:Record<number,TestT>[],
    documents:Record<number,DocumentT>[]
    subject:string
}
export type ChangeCourseThemeWithCourseT = {
    course:CourseT
    name:string
    subscriptionDuration:number
    price:number
    isActive:boolean
    videoLessons:Record<number,VideoLessonT>[]
    tests:Record<number,TestT>[],
    documents:Record<number,DocumentT>[]
}