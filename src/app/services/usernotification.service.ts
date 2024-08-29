import {EventEmitter, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {apiRoot, httpoptions} from "./api.service";
import {NotificationModel} from "../model/userNotification.model";

@Injectable({
    providedIn: 'root'
})
export class UsernotificationService {

    public notificationAdded = new EventEmitter<void>();

    constructor(private http: HttpClient) {
    }

    /**
     * On récupère les notifications
     * @param userId
     */
    getNotifications(userId: number): Observable<NotificationModel[]> {
        return this.http.get<NotificationModel[]>(`${apiRoot}/notifications/user/${userId}`, httpoptions);
    }

    /**
     * Affiche le nombre de notifications non lues dans l'icône utilisateur
     * @param userId
     */
    getActiveNotificationsCount(userId: number): Observable<number> {
        return this.http.get<number>(`${apiRoot}/notifications/active/count/${userId}`, httpoptions);
    }

    /**
     * Lorsque la page de notification se charge, on marque les notifications comme inactives
     * @param userId
     */
    markNotificationsAsInactive(userId: number): Observable<void> {
        return this.http.post<void>(`${apiRoot}/notifications/markAsInactive/${userId}`, {userId}, httpoptions);
    }

    addNotification(notification: NotificationModel): Observable<NotificationModel> {
        return this.http.post<NotificationModel>(`${apiRoot}/notifications`, notification, httpoptions);
    }

    /**
     * Ecouteur d'événement pour compter les notifications
     */
    notifyNotificationAdded() {
        this.notificationAdded.emit();
    }
}


