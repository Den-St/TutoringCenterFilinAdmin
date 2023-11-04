import { CourseT } from './course';
import { VideoLessonT } from './videoLesson';

export type CourseThemeT = {
    id:string
    course:CourseT
    name:string
    subscriptionDuration:number
    price:number
    isActive:boolean
}

export type CreateCourseThemeT = {
    course:string
    name:string
    subscriptionDuration:number
    price:number
    isActive:boolean
}

export type ChangeCourseThemeT = {
    course:string
    name:string
    subscriptionDuration:number
    price:number
    isActive:boolean
}
export type ChangeCourseThemeWithCourseT = {
    course:CourseT
    name:string
    subscriptionDuration:number
    price:number
    isActive:boolean
}