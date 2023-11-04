import { AnswerT } from './answer';
import { CourseThemeT } from './courseThemes';

export type TestT = {
    id:string
    courseTheme:CourseThemeT,
    number:number,
    photos:string[]
    description:string,
    answers:Record<number,AnswerT>
    isActive:boolean
}

export type CreateTestT = {
    courseTheme:string,
    number:number,
    photos:string[]
    description:string,
    answers:Record<number,AnswerT>
    isActive:boolean
}
export type CreateTestFormT = {
    courseTheme:string,
    number:number,
    photos:File[]
    description:string,
    // answers:AnswerT[]
    answers:Record<number,AnswerT>
    isActive:boolean
}
export type ChangeTestT = {
    courseTheme:string,
    number:number,
    photos:string[]
    description:string,
    answers:Record<number,AnswerT>
    isActive:boolean
}
export type ChangeTestFormT = {
    courseTheme:string,
    number:number,
    photos:File[]
    description:string,
    answers:Record<number,AnswerT>
    isActive:boolean
}