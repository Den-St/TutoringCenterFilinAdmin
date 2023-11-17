export type DocumentT = {
    name:string,
    documentURL:string
}

export type CreateDocumentT = {
    name:string,
    document:{file:File,fileList:FileList}
}