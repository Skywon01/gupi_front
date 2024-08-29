import {Injectable} from "@angular/core";
import {apiRoot, httpoptions} from "./api.service";
import {lastValueFrom, Observable} from "rxjs";
import {UserModel} from "../model/user.model";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {AuthService} from "./authentification/auth.service";


@Injectable({
    providedIn: 'root',
})
export class UserService {

    constructor(
        private http: HttpClient, private authService: AuthService,
    ) {
    }

    /**
     * Récupère les informations contenues dans le header
     */
    public getAuthHeaders(): HttpHeaders {
        const token = this.authService.getUser();
        return new HttpHeaders({
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
        });
    }
    async getUserAll() {
        let res = await lastValueFrom(this.retrieveAllUsers())
        return this.formatData(res)
    }

    async getUserOne(id: string) {
        let res = await lastValueFrom(this.retrieveOneUser(id))
        return this.formatData([res])
    }

    formatData(rawdata: UserModel[]) {
        const temp: UserModel[] = []

        rawdata.map((el) => {
            let tempObj: UserModel = new UserModel(el.id, el.name, el.firstName, el.email, el.address, el.age, el.password, el.company, el.job, el.token, el.profile, el.directory, el.file, el.role)
            temp.push(tempObj);
        });
        // console.log('Data user: ', temp)
        return temp
    }
    retrieveAllUsers(): Observable<any> {

        return this.http.get(`${apiRoot}/users`,  httpoptions )
    }

    retrieveOneUser(id: string): Observable<UserModel> {
        return this.http.get<UserModel>(`${apiRoot}/users/${id}`, httpoptions);
    }

    /**
     * Récupère un utilisateur unique
     * @param user_id
     */
    retrieveUserById(user_id: number): Observable<any> {
        return this.http.get(`${apiRoot}/users/${user_id}`, httpoptions);
    }

    /**
     * Inscrit un utilisateur
     * @param user
     */
    registerUser(user: any): Observable<any> {
        return this.http.post(`${apiRoot}/register`, user, httpoptions)
    }

    /**
     * Met à jour un utilisateur
     * @param id
     * @param user
     */
    updateUser(id: number, user: any): Observable<any> {
        return this.http.put<UserModel>(`${apiRoot}/users/${id}`, user, httpoptions);
    }

    /**
     * Récupère tous les utilisateurs
     */
    getUsers() {
        return this.http.get<UserModel[]>(`${apiRoot}/users`, httpoptions)
    }
}

