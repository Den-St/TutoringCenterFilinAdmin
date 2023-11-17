import { ClassT } from './class';
import { SubjectT } from './subject';
import { CourseT } from './course';
import { DocumentT } from './document';
import { TestForTestProductT } from './test';
import { VideoLessonT } from './videoLesson';


export type TestProductT = {
    id:string
    course:CourseT
    name:string
    subscriptionDuration:number
    price:number,
    isActive:boolean,
    tests:Record<number,TestForTestProductT>[],
    subject:SubjectT
    class:ClassT
}

export type CreateTestProductT = {
    course:string
    name:string
    subscriptionDuration:number
    price:number
    isActive:boolean,
    tests:Record<number,TestForTestProductT>[],
    subject:string
    class:string
}

export type ChangeTestProductT = {
    course:string
    name:string
    subscriptionDuration:number
    price:number
    isActive:boolean
    tests:Record<number,TestForTestProductT>[],
    subject:string
    class:string
}
export type ChangeTestProductWithCourseT = {
    course:CourseT
    name:string
    subscriptionDuration:number
    price:number
    isActive:boolean
    tests:Record<number,TestForTestProductT>[],
}