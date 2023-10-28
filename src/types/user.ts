export type UserT = {
    id?:string | null
    email?:string | null,
}

export type CreateUserT = {
    name?:string | null,
    surname?:string,
    displayName?:string | null,
    email?:string | null,
    createdAt?:string,
    photoURL:string | null
}
