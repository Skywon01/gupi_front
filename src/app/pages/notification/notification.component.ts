import {Component, EventEmitter, Input, OnInit} from '@angular/core';
import {PageService} from "../../services/page/page.component";
import {NotificationListComponent} from "../../components/notification-list/notification-list.component";
import {UserService} from "../../services/user.service";

import {NgIf} from "@angular/common";
import {AuthService} from "../../services/authentification/auth.service";

@Component({
  selector: 'app-notification',
  standalone: true,
    imports: [
        NotificationListComponent,
        NgIf
    ],
  templateUrl: './notification.component.html',
  styleUrl: './notification.component.css'
})
export class NotificationComponent implements OnInit{
    @Input() userId!: number;
    public notificationAdded = new EventEmitter<void>();

    constructor(private pageService: PageService, private userService: UserService, private authService: AuthService,) {
        this.pageService.setComponentType('bell', 'Notifications', 'Veuillez trouver toutes vos notifications');

    }

    ngOnInit(): void {
        const user = this.authService.getUser();
        this.userId = user.id;

    }

    notifyNotificationAdded() {
        this.notificationAdded.emit();
    }
}

