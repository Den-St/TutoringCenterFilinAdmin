import { CourseThemeT } from './courseThemes';

export type VideoLessonT = {
    name:string,
    videoURL:string,
    description:string
}
// export type VideoLessonT = {
//     id:string,
//     videoURL:string,
//     name:string,
//     description:string, 
//     courseTheme:CourseThemeT
//     number:number,
//     isActive:boolean
// }

// export type CreateVideoLessonT = {
//     videoURL:string,
//     name:string,
//     description:string,
//     createdAt:Date,
//     courseTheme:string
//     number:number,
//     isActive:boolean
// }

// export type ChangeVideoLessonT = {
//     videoURL:string,
//     name:string,
//     description:string,
//     courseTheme:string
//     createdAt:Date
//     number:number
//     isActive:boolean
// }