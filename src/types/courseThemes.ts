import { CourseT } from './course';
import { VideoLessonT } from './videoLesson';

type videoLessonT = {
    name:string,
    videoURL:string,
    description:string
}
type ThemeTestT = {
    name:string,
    testURl:string,
}
type ThemeStudyMaterialT = {
    name:string,
    studyMaterialURL:string
}
export type CourseThemeT = {
    id:string
    course:CourseT
    name:string
    subscriptionDuration:number
    price:number,
    isActive:boolean,
    videoLessons:Record<number,videoLessonT>[],
    tests:Record<number,ThemeTestT>[],
    studyMaterials:Record<number,ThemeStudyMaterialT>[]
}

export type CreateCourseThemeT = {
    course:string
    name:string
    subscriptionDuration:number
    price:number
    isActive:boolean,
    videoLessons:Record<number,videoLessonT>[]
    tests:Record<number,ThemeTestT>[],
    studyMaterials:Record<number,ThemeStudyMaterialT>[]
}

export type ChangeCourseThemeT = {
    course:string
    name:string
    subscriptionDuration:number
    price:number
    isActive:boolean
    videoLessons:Record<number,videoLessonT>[]
    tests:Record<number,ThemeTestT>[],
    studyMaterials:Record<number,ThemeStudyMaterialT>[]
}
export type ChangeCourseThemeWithCourseT = {
    course:CourseT
    name:string
    subscriptionDuration:number
    price:number
    isActive:boolean
    videoLessons:Record<number,videoLessonT>[]
    tests:Record<number,ThemeTestT>[],
    studyMaterials:Record<number,ThemeStudyMaterialT>[]
}