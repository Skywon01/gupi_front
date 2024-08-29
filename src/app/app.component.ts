import {Component, OnInit} from '@angular/core';
import {CommonModule, NgOptimizedImage} from '@angular/common';
import {ActivatedRoute, Router, RouterLink, RouterLinkActive, RouterOutlet} from '@angular/router';
import {NzIconModule} from 'ng-zorro-antd/icon';
import {NzLayoutModule} from 'ng-zorro-antd/layout';
import {NzMenuModule} from 'ng-zorro-antd/menu';
import {BreadcrumbComponent} from "./components/breadcrumb/breadcrumb.component";
import {UserIconComponent} from "./components/user-icon/user-icon.component";
import {NzColDirective} from "ng-zorro-antd/grid";
import {SingleEmployeeDisplayerComponent} from "./components/single-employee-displayer/single-employee-displayer.component";
import {UserModel} from "./model/user.model";
import {UserService} from "./services/user.service";
import {EmployeeListComponent} from "./components/employee-list/employee-list.component";
import {NzCardComponent} from "ng-zorro-antd/card";
import {NzInputDirective, NzInputGroupComponent} from "ng-zorro-antd/input";
import {NzFlexDirective} from "ng-zorro-antd/flex";
import {ChatComponent} from "./components/chat/chat.component";
import {AuthService} from "./services/authentification/auth.service";
import {LoginComponent} from "./pages/login/login.component";
import {ApiService} from "./services/api.service";
import {Observable} from "rxjs";
import {NzSpinComponent} from "ng-zorro-antd/spin";
import { NzMessageModule} from "ng-zorro-antd/message";
import { NzModalModule } from 'ng-zorro-antd/modal';
@Component({
    selector: 'app-root',
    standalone: true,
    imports: [NzModalModule, CommonModule, RouterOutlet, NzIconModule, NzLayoutModule, NzMenuModule, RouterLink, BreadcrumbComponent, UserIconComponent, NzColDirective, RouterLinkActive, SingleEmployeeDisplayerComponent, EmployeeListComponent, NzCardComponent, NzInputGroupComponent, NzInputDirective, NzFlexDirective, ChatComponent, LoginComponent, NgOptimizedImage, NzSpinComponent, NzMessageModule],
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
    user: any;
    roles: string[] = [];
    isCollapsed = false;
    chatIsOpen = false;
    public users: UserModel[] = []
    currentUser$: Observable<UserModel | null>;
    loading = true;

    constructor(
        private readonly userService: UserService,
        private route: ActivatedRoute,
        private router: Router,
        public authService: AuthService,
        public apiService: ApiService
    ) {

        this.currentUser$ = this.authService.currentUser$;
    }

    async ngOnInit() {

        //Récupère l'eventuel paramètre id dans l'url
        this.route.params.subscribe(params => {
            const id = params['id']
            if (!id) {
                this.vaChercherTousLesUsers()
            } else {
                this.vaChercherUnSeulUser(id)
            }

        })

        this.authService.refreshUserProfile().subscribe();
        // this.roles = this.authService.getRoles();
        // console.log('User:', this.user);
        // console.log('Roles:', this.roles);
        this.authService.currentUser$.subscribe(user => {
            if (user) {
                this.loading = false; // Fin du chargement
            } else {
                this.loading = false; // Fin du chargement même sans utilisateur
            }
        });
    }

    async vaChercherTousLesUsers(): Promise<void> {
        this.users = await this.userService.getUserAll()
        // console.log(this.users)
    }

    async vaChercherUnSeulUser(id: string) {
        this.users = await this.userService.getUserOne(id)
        // console.log(this.users)
    }


}
