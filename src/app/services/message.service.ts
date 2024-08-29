import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {interval, Observable, switchMap} from 'rxjs';
import {MessageDTO} from "../model/message.model";
import {apiRoot, httpoptions} from "./api.service";

@Injectable({
    providedIn: 'root'
})
export class MessageService {


    constructor(private http: HttpClient) {}

    getMessages(): Observable<MessageDTO[]> {
        return this.http.get<MessageDTO[]>(apiRoot);
    }

    getMessagesForUser(userId: number): Observable<MessageDTO[]> {
        return this.http.get<MessageDTO[]>(`${apiRoot}/messages/user/${userId}`, httpoptions);
    }

    /**
     * Permet d'envoyer un message à un utilisateur
     * @param message
     */
    createMessage(message: MessageDTO): Observable<MessageDTO> {
        return this.http.post<MessageDTO>(`${apiRoot}/messages`, message, httpoptions);
    }

    /**
     * Récupère tous les messages d'une conversation entre 2 utilisateurs
     * @param senderId
     * @param recipientId
     */
    getMessagesBetweenUsers(senderId: number, recipientId: number): Observable<MessageDTO[]> {
        return this.http.get<MessageDTO[]>(`${apiRoot}/messages/conversation/${senderId}/${recipientId}`, httpoptions);
    }

    /**
     * Met à jour la fenêtre de chat toutes les 5000ms
     * A noter que la prochaine version utilisera une mise à jour en temps réel
     * @param senderId
     * @param recipientId
     */
    pollMessages(senderId: number, recipientId: number): Observable<MessageDTO[]> {
        return interval(5000).pipe( // Interroger toutes les 5 secondes
            switchMap(() => this.getMessagesBetweenUsers(senderId, recipientId))
        );
    }

}
