import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {AuthService} from "./authentification/auth.service";

/**
 * Nom de domaine de l'api GUPI en environnement de développement local
 */
export const apiRoot = "http://srv591226.hstgr.cloud/api"

/**
 * Ici on commence la communication Http
 */

export const httpoptions = {
    header: new HttpHeaders({
        'content-type': 'application/json',
        'Accept': 'text/html, application/xhtml+xml, */*'
    }),
    responseType: 'json' as 'json',
    withCredentials: true
}

@Injectable(
    {
        providedIn: 'root',
    }
)
export class ApiService {
    //On ne renvoie que des observables ici grâce au back

    constructor(
        private http: HttpClient,
        private authService: AuthService,
    ) {
    }

    public getAuthHeaders(): HttpHeaders {
        const token = this.authService.getUser();
        return new HttpHeaders({
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
        });
    }

    /**
     * Filtre l'affichage des éléments de la page en fonction des rôles de l'utilisateur
     * @param requiredRole
     */
    public isAuthorized(requiredRole: string): boolean {
        const userRoles = this.authService.getRoles();
        // console.log("Rôles récupérés:", userRoles);
        return userRoles.some(role => role.name === requiredRole);
    }
}


