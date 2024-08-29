import {FileModel} from "./file.model";

export class DirectoryModel {
    constructor(
        public id: number,
        public name: string,
        public user_id: number,
        public parent_id: number | null,
        public children: DirectoryModel[],
        public files?: FileModel[],
        public parents?: DirectoryModel[]
    ) {
    }
}

