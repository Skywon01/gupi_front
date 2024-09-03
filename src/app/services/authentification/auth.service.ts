import {HttpClient} from "@angular/common/http";
import {Observable, tap} from "rxjs";
import {Injectable} from "@angular/core";
import {UserModel} from "../../model/user.model";
import {BehaviorSubject} from "rxjs";
import {apiRoot, httpoptions} from "../api.service";
import {Router} from "@angular/router";

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private currentUserSubject: BehaviorSubject<UserModel | null>;
    public currentUser$: Observable<UserModel | null>;
    private tokenKey = 'jwt_token';

    constructor(private http: HttpClient, private router: Router) {
        this.currentUserSubject = new BehaviorSubject<UserModel | null>(this.getUserFromSession());
        this.currentUser$ = this.currentUserSubject.asObservable();
    }

    /**
     * Permet de connecter un utilisateur
     * @param email
     * @param password
     */
    login(email: string | undefined, password: string | undefined): Observable<any> {
        return this.http.post<any>(`${apiRoot}/login`, {email, password}, {withCredentials: true})
            .pipe(tap(response => {
                if (response && response.token) {
                    // console.log("Response User: ", response.user);
                    // console.log("Response Roles: ", response.roles);
                    this.setToken(response.token);
                    sessionStorage.setItem('user', JSON.stringify(response.user));
                    sessionStorage.setItem('roles', JSON.stringify(response.roles));
                    this.currentUserSubject.next(response.user);
                    // this.router.navigate(['/']);
                }
            }));
    }
    private setToken(token: string): void {
        localStorage.setItem(this.tokenKey, token);
    }

    getToken(): string | null {
        return localStorage.getItem(this.tokenKey);
    }

    /**
     * Actualise le profil de l'utilisateur
     */
    refreshUserProfile(): Observable<UserModel> {
        const userId = this.getCurrentUserId(); // Méthode pour obtenir l'ID de l'utilisateur connecté
        return this.http.get<UserModel>(`${apiRoot}/users/${userId}`, httpoptions).pipe(
            tap(user => {
                this.updateUserInSession(user);
            })
        );
    }
    private getUserFromSession(): UserModel | null {
        const userStr = sessionStorage.getItem('user');
        return userStr ? JSON.parse(userStr) : null;
    }

    /**
     * Récupère l'id de l'utilisateur connecté en session
     * @private
     */
    private getCurrentUserId(): number {
        const user = JSON.parse(sessionStorage.getItem('user') || '{}');
        return user.id;
    }

    /**
     * Met à jour l'utilisateur connecté en actualisant les informations dans la session lors d'une modification
     * @param user
     * @private
     */
    private updateUserInSession(user: UserModel): void {
        sessionStorage.setItem('user', JSON.stringify(user));
        if (user.role) {
            sessionStorage.setItem('roles', JSON.stringify(user.role));
        }
        this.currentUserSubject.next(user);
    }

    /**
     * Récupère les informations de l'utilisateur connecté en session
     */
    getUser(): any {
        const user = sessionStorage.getItem('user');
        return user ? JSON.parse(user) : null;
    }

    /**
     * Récupère les rôles de l'utilisateur connecté en session
     */
    getRoles(): { id: number, name: string, authority: string }[] {
        const roles = sessionStorage.getItem('roles');
        return roles ? JSON.parse(roles) : [];
    }

    /**
     * Vérifie si l'utilisateur est connecté ou non.
     * Redirige vers login ou accueil
     */
    isAuthenticated(): boolean {
        return !!this.getUser() && !!this.getToken(); // Vérifiez aussi la présence du token
    }

}
