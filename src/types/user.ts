import { SubjectT } from './subject';

export type TeacherContactT = {
    name:string
    contactURL:string
}

export type TeacherInfoT = {
    contacts:TeacherContactT[]
    level:string
    aboutMe:string
    subjects:SubjectT[]
}

export type UserT = {
    id:string
    email:string ,
    name:string
    surname:string
    patronymic:string
    isTeacher:boolean
    displayName?:string | null,
    photoURL?:string
    teacherInfo?:TeacherInfoT;
    createdAt:Date | null
}

export type ChangeUserT = {
    email:string ,
    name:string
    surname:string
    patronymic:string
    isTeacher:boolean
    displayName?:string | null,
    photoURL?:string
    teacherInfo?:TeacherInfoT;
    createdAt:Date | null
}
export type ChangeUserFormT = {
    isTeacher:boolean
}   
export type CreateUserT = {
    name?:string | null,
    surname?:string,
    displayName?:string | null,
    email?:string | null,
    createdAt?:string,
    photoURL:string | null
}
