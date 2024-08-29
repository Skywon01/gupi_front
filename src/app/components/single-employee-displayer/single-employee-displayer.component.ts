import {Component, OnInit} from '@angular/core';
import {UserModel} from "../../model/user.model";
import {UserService} from "../../services/user.service";
import {ActivatedRoute} from "@angular/router";
import {NgIf, NgOptimizedImage} from "@angular/common";

@Component({
    selector: 'app-single-employee-displayer',
    standalone: true,
    imports: [
        NgIf,
        NgOptimizedImage
    ],
    templateUrl: './single-employee-displayer.component.html',
    styleUrl: './single-employee-displayer.component.css'
})
export class SingleEmployeeDisplayerComponent implements OnInit {
    public users: UserModel[] = []
    user_id!: number;
    user: any;

    constructor(
        private readonly userService: UserService,
        private route: ActivatedRoute) {
    }

    ngOnInit(): void {
        this.route.params.subscribe(params => {
            this.user_id = params['id'];
            this.loadUserDetails();
        });
    }

    loadUserDetails() {
        this.userService.retrieveUserById(this.user_id).subscribe(
            (data) => {
                this.user = data;
            },
            (error) => {
                console.error('Erreur de récupération:', error);
            }
        );
    }
}
