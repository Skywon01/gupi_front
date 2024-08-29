import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {apiRoot, httpoptions} from "./api.service";

@Injectable({
    providedIn: "root"
})
export class PasswordService {
constructor(private http: HttpClient) {
}

    sendResetPasswordEmail(email: string | undefined): Observable<any>{
    return this.http.post(`${apiRoot}/users/forgot-password`, {email: email}, httpoptions)
}
}
