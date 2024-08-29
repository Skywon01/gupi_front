import {Injectable} from "@angular/core";
import {apiRoot, httpoptions} from "./api.service";
import {lastValueFrom, Observable} from "rxjs";
import {DirectoryModel} from "../model/directory.model";
import {HttpClient} from "@angular/common/http";

@Injectable({
    providedIn: 'root',
})
export class DirectoryService {

    constructor(
        private http: HttpClient,
    ) {
    }

    async getDirectoryAll() {
        let res = await lastValueFrom(this.retrieveAllDirectories())
        return this.formatData(res)
    }

    async getDirectoryOne(id: string) {
        let res = await lastValueFrom(this.retrieveOneDirectory(id))
        return this.formatData([res])
    }

    formatData(rawdata: DirectoryModel[]) {
        const temp: DirectoryModel[] = []

        rawdata.map((el) => {
            let tempObj: DirectoryModel = new DirectoryModel(el.id, el.name, el.user_id, el.parent_id, el.children)
            temp.push(tempObj);
        })
        // console.log('Data directory: ', temp)
        return temp
    }

    retrieveAllDirectories(): Observable<any> {
        return this.http.get(`${apiRoot}/directories`, httpoptions)
    }

    retrieveOneDirectory(id: string): Observable<any> {
        return this.http.get(`${apiRoot}/directories/${id}`, httpoptions)
    }


    createDirectory(name: { user_id: number; name: string }): Observable<any> {
        const user = JSON.parse(sessionStorage.getItem('user') || '{}');
        return this.http.post(`${apiRoot}/directories`, {name, user_id: user.id}, httpoptions);
    }

    createChildDirectory(parent_id: number, name: string): Observable<DirectoryModel> {
        const url = `${apiRoot}/directories/${parent_id}/children`;
        return this.http.post<DirectoryModel>(`${apiRoot}/directories/${parent_id}/children`, {name}, httpoptions);
    }

    uploadFile(file: File, directoryId: number): Observable<any> {
        const formData: FormData = new FormData();
        formData.append('file', file);
        formData.append('directoryId', directoryId.toString());
        return this.http.post<any>(`${apiRoot}/file/upload`, formData, httpoptions);
    }


    /**
     * Requêtes pour séparer les parents des enfants lors de l'affichage
     * Le tri est donc parent puis enfant
     * @param user_id
     */
    getUserParentDirectories(user_id: number | undefined): Observable<DirectoryModel[]> {
        return this.http.get<DirectoryModel[]>(`${apiRoot}/directories/user/${user_id}/parents`, httpoptions);
    }

    /**
     * Récupère les dossiers enfants
     * @param user_id
     */
    getUserChildDirectories(user_id: number | undefined): Observable<DirectoryModel[]> {
        return this.http.get<DirectoryModel[]>(`${apiRoot}/directories/user/${user_id}/children`, httpoptions);
    }

    /**
     * Envoie un fichier dans le répertoire "fichiers envoyés" d'un utilisateur
     * @param file
     * @param user_id
     * @param senderName
     * @param senderFirstName
     */
    uploadFileToUserFolder(file: File, user_id: number, senderName: string, senderFirstName: string): Observable<any> {
        const formData: FormData = new FormData();
        formData.append('file', file);
        formData.append('userId', user_id.toString());
        formData.append('senderName', senderName);
        formData.append('senderFirstName', senderFirstName);
        return this.http.post(`${apiRoot}/file/upload-to-user-folder/${user_id}`, formData, {
            responseType: 'text',
            withCredentials: true
        });
    }

    /**
     * Supprime un répertoire/dossier
     * @param id
     */
    deleteDirectory(id: number): Observable<void> {
        return this.http.delete<void>(`${apiRoot}/directories/${id}`, httpoptions);
    }

    renameDirectory(id: number, newName: string): Observable<void>{
        return this.http.put<void>(`${apiRoot}/directories/${id}`, { name: newName }, httpoptions)
    }
}
