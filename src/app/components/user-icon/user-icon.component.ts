import { Component, Input, OnInit } from '@angular/core';
import { NzIconDirective } from "ng-zorro-antd/icon";
import { NzButtonComponent } from "ng-zorro-antd/button";
import { NzPopoverDirective } from "ng-zorro-antd/popover";
import { NavigationEnd, Router, RouterLink } from "@angular/router";
import { NzBadgeComponent } from "ng-zorro-antd/badge";
import { NzAvatarComponent } from "ng-zorro-antd/avatar";
import { UsernotificationService } from "../../services/usernotification.service";
import { AuthService } from "../../services/authentification/auth.service";

@Component({
    selector: 'app-user-icon',
    standalone: true,
    imports: [
        NzIconDirective,
        NzButtonComponent,
        NzPopoverDirective,
        RouterLink,
        NzBadgeComponent,
        NzAvatarComponent
    ],
    templateUrl: './user-icon.component.html',
    styleUrls: ['./user-icon.component.css']
})
export class UserIconComponent implements OnInit {
    visible: boolean = false;
    activeCount: number = 0;
    @Input() userId!: number;

    constructor(
        private userNotificationService: UsernotificationService,
        private authService: AuthService,
        private router: Router
    ) {}

    ngOnInit(): void {
        const user = this.authService.getUser();
        if (user) {
            this.userId = user.id;
            this.loadActiveNotificationsCount();
        }

        this.userNotificationService.notificationAdded.subscribe(() => {
            this.loadActiveNotificationsCount();
        });

        this.router.events.subscribe(event => {
            if (event instanceof NavigationEnd) {
                if (event.url === '/notification') {
                    this.markNotificationsAsInactive();
                }
            }
        });
    }

    /**
     * Compte les notifications actives
     */
    loadActiveNotificationsCount(): void {
        if (this.userId !== undefined) {
            this.userNotificationService.getActiveNotificationsCount(this.userId).subscribe(count => {
                this.activeCount = count;
            }, error => {
                console.error('Error fetching active notifications count:', error);
            });
        }
    }

    /**
     * Désactive les notifications lues
     */
    markNotificationsAsInactive(): void {
        if (this.userId !== undefined) {
            this.userNotificationService.markNotificationsAsInactive(this.userId).subscribe(() => {
                this.activeCount = 0;
            }, error => {
                console.error('Error marking notifications as inactive:', error);
            });
        }
    }

    clickMe(): void {
        this.visible = false;
    }

    change(value: boolean): void {
        // console.log(value);
    }

    logout(): void {
        sessionStorage.removeItem('roles');
        sessionStorage.removeItem('user');
        window.location.reload();
    }
}
