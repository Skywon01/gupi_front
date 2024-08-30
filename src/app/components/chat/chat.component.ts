import {AfterViewChecked, Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {MessageService} from '../../services/message.service';
import {UserModel} from "../../model/user.model";
import {AuthService} from "../../services/authentification/auth.service";
import {UserService} from "../../services/user.service";
import {MessageDTO} from "../../model/message.model";
import {NzIconDirective} from "ng-zorro-antd/icon";
import {DatePipe, NgClass, NgForOf, NgIf, NgOptimizedImage} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {NzOptionComponent, NzSelectComponent} from "ng-zorro-antd/select";
import {Subscription} from "rxjs";
import {apiRoot} from "../../services/api.service";


@Component({
    selector: 'app-chat',
    templateUrl: './chat.component.html',
    standalone: true,
    imports: [
        NzIconDirective,
        DatePipe,
        FormsModule,
        NgForOf,
        NgClass,
        NgIf,
        NzSelectComponent,
        NzOptionComponent,
        NgOptimizedImage
    ],
    styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit, OnDestroy, AfterViewChecked {
    messages: MessageDTO[] = [];
    newMessageContent: string = '';
    currentUser!: UserModel;
    recipient!: UserModel;
    users: UserModel[] = [];
    filteredUsers: UserModel[] = [];
    chatIsOpen: boolean = false;
    private pollingSubscription!: Subscription;
    @ViewChild('messagesContainer') private messagesContainer!: ElementRef;
    profileImageUrl: string | null = null;
    currentUserProfile: string | null = null;

    constructor(
        private messageService: MessageService,
        private authService: AuthService,
        private userService: UserService
    ) {
    }

    ngOnInit(): void {
        this.loadCurrentUser();
        this.loadUsersAndMessages();
    }

    ngOnDestroy(): void {
        if (this.pollingSubscription) {
            this.pollingSubscription.unsubscribe();
        }
    }

    ngAfterViewChecked(): void {
        this.scrollToBottom();
    }

    loadCurrentUser(): void {
        const user = this.authService.getUser();
        if (user) {
            this.currentUser = user;
            const userId = this.currentUser.id
            this.currentUserProfile = `${apiRoot}/users/profile-image/${userId}`;
            // console.log('Utilisateur courant:', this.currentUser);
        }
    }


    loadUsersAndMessages(): void {
        this.userService.getUsers().subscribe(users => {
            this.users = users;
            this.filteredUsers = users.filter(user => user.id !== this.currentUser.id);
            // console.log('Utilisateurs chargés:', this.users);
            this.loadMessages();
        });
    }

    loadMessages(): void {
        if (this.currentUser && this.recipient) {
            this.messageService.getMessagesBetweenUsers(this.currentUser.id, this.recipient.id).subscribe(messages => {
                this.messages = messages.sort((a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime());

                this.messages.forEach(message => {
                    const senderId = message.senderId.id;
                    const recipientId = message.recipientId.id;

                    const sender = this.users.find(user => user.id === senderId);
                    const recipient = this.users.find(user => user.id === recipientId);

                    message.senderName = sender ? sender.name : 'Inconnu';
                    message.recipientName = recipient ? recipient.name : 'Inconnu';
                });
            });
            // Démarrer le polling pour les nouveaux messages
            this.pollingSubscription = this.messageService.pollMessages(this.currentUser.id, this.recipient.id).subscribe(messages => {
                this.messages = messages.sort((a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime());
                this.messages.forEach(message => {
                    const senderId = message.senderId.id;
                    const recipientId = message.recipientId.id;

                    const sender = this.users.find(user => user.id === senderId);
                    const recipient = this.users.find(user => user.id === recipientId);

                    message.senderName = sender ? sender.name : 'Inconnu';
                    message.recipientName = recipient ? recipient.name : 'Inconnu';
                });
            });
        }
    }

    selectRecipient(user: UserModel): void {
        this.recipient = user;

        const userId = this.recipient.id
        this.profileImageUrl = `${apiRoot}/users/profile-image/${userId}`;
        // console.log('Destinataire sélectionné:', this.recipient);
        this.loadMessages();
    }

    sendMessage(): void {
        if (this.currentUser && this.recipient && this.newMessageContent.trim()) {
            const newMessage: MessageDTO = {
                id: null,
                content: this.newMessageContent,
                senderId: {id: this.currentUser.id},
                recipientId: {id: this.recipient.id},
                timestamp: new Date()
            };
            this.messageService.createMessage(newMessage).subscribe(message => {
                message.senderName = this.currentUser.name;
                message.recipientName = this.recipient.name;
                this.messages.push(message);
                this.messages = this.messages.sort((a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime());
                this.newMessageContent = '';
                setTimeout(() => this.scrollToBottom(), 100);
            });
        }
    }

    private scrollToBottom(): void {
        if (this.messagesContainer) {
            try {
                this.messagesContainer.nativeElement.scrollTop = this.messagesContainer.nativeElement.scrollHeight;
            } catch (err) {
                console.error('Erreur lors du défilement vers le bas:', err);
            }
        }
    }
}
