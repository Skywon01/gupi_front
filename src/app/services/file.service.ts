import {HttpClient, HttpResponse} from "@angular/common/http";
import {apiRoot, httpoptions} from "./api.service";
import {Injectable} from "@angular/core";
import {Observable} from "rxjs";
import {FileModel} from "../model/file.model";

@Injectable({
    providedIn: 'root',
})
export class FileService {

    constructor(private http: HttpClient) {}


    /**
     * Récupère les fichiers contenus dans un dossier
     * @param directory_id
     */
    getFilesByDirectoryId(directory_id: number): Observable<FileModel[]> {
        return this.http.get<FileModel[]>(`${apiRoot}/file/directory/${directory_id}`, httpoptions);
    }

    /**
     * Télécharge un fichier
     * @param fileId
     */
    downloadFile(fileId: number): Observable<HttpResponse<Blob>> {
        return this.http.get(`${apiRoot}/file/download/${fileId}`, {
            responseType: 'blob',
            observe: 'response',
            withCredentials : true

        });
    }

    /**
     * Supprime un fichier
     * @param id
     */
    deleteFile(id: number): Observable<void> {
        return this.http.delete<void>(`${apiRoot}/file/${id}`, httpoptions);
    }
}
