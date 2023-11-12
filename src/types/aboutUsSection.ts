export type AboutUsSectionT = {
    id:string
    name:string
    text:string
    createdAt:Date
    isActive:boolean
}

export type CreateAboutUsSectionT = {
    name:string
    text:string
    createdAt:Date
    isActive:boolean
}

export type ChangeAboutUsSectionT = {
    name:string
    text:string
    isActive:boolean
}