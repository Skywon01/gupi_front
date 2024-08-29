import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {UserModel} from "../../model/user.model";
import {UserService} from "../../services/user.service";
import {AuthService} from "../../services/authentification/auth.service";
import {NzNotificationService} from "ng-zorro-antd/notification";
import {NzFormControlComponent, NzFormDirective, NzFormItemComponent, NzFormLabelComponent} from "ng-zorro-antd/form";
import {NzColDirective, NzRowDirective} from "ng-zorro-antd/grid";
import {NzInputDirective, NzInputGroupComponent, NzInputGroupWhitSuffixOrPrefixDirective} from "ng-zorro-antd/input";
import {NgForOf} from "@angular/common";
import {NzIconDirective} from "ng-zorro-antd/icon";
import {NzButtonComponent} from "ng-zorro-antd/button";
import {NzInputNumberComponent} from "ng-zorro-antd/input-number";
import {NzUploadComponent, NzUploadFile} from "ng-zorro-antd/upload";

@Component({
  selector: 'app-form-profile-edit',
  standalone: true,
    imports: [
        ReactiveFormsModule,
        NzFormDirective,
        NzFormItemComponent,
        NzFormLabelComponent,
        NzFormControlComponent,
        NzColDirective,
        NzInputDirective,
        NgForOf,
        NzInputGroupWhitSuffixOrPrefixDirective,
        NzInputGroupComponent,
        NzIconDirective,
        NzRowDirective,
        NzButtonComponent,
        NzInputNumberComponent,
        NzUploadComponent
    ],
  templateUrl: './form-profile-edit.component.html',
  styleUrl: './form-profile-edit.component.css'
})
export class FormProfileEditComponent implements OnInit{
    public user: UserModel | null = null;
    public form: FormGroup;
    public passwordVisible = false;
    @Input() tuyauDeUsers!: UserModel;
    @Output() profileUpdate = new EventEmitter<UserModel>();


    constructor(
        private userService: UserService,
        private authService: AuthService,
        private notification: NzNotificationService
    ) {
        this.form = new FormGroup({
            name: new FormControl(''),
            firstName: new FormControl(''),
            email: new FormControl('', [Validators.email]),
            address: new FormControl(''),
            age: new FormControl(''),
            company: new FormControl(''),
            job: new FormControl(''),
            photo: new FormControl(''),
            password: new FormControl('', []),
            confirmPassword: new FormControl('', []),
            role_id: new FormControl('')
        });
    }

    ngOnInit() {
        const user = this.authService.getUser();
        if (user) {
            this.loadUserData(user.id);
        }
    }

    loadUserData(userId: number) {
        this.userService.retrieveUserById(userId).subscribe((user: UserModel) => {
            this.user = user;
            this.form.patchValue({
                name: user.name,
                firstName: user.firstName,
                email: user.email,
                address: user.address,
                age: user.age,
                company: user.company,
                job: user.job,
                photo: user.profile
            });
        });
    }

    onSubmit() {
        if (this.form.valid && this.user) {
            const formData = { ...this.form.value };

            if (formData.password !== formData.confirmPassword) {
                this.notification.error('Erreur', 'Les mots de passe ne correspondent pas.');
                return;
            }

            this.userService.updateUser(this.user.id, formData).subscribe(
                () => {
                    // console.log(formData)
                    this.notification.success('Succès', 'Informations mises à jour avec succès.');
                    this.profileUpdate.emit();
                },
                (error) => {
                    this.notification.error('Erreur', 'Erreur lors de la mise à jour des informations.');
                    console.error('Erreur lors de la mise à jour du profil :', error);
                }
            );
        } else {
            Object.values(this.form.controls).forEach(control => {
                if (control.invalid) {
                    control.markAsDirty();
                    control.updateValueAndValidity({ onlySelf: true });
                }
            });
        }
    }
    handleChange(info: { file: NzUploadFile }): void {
        if (info.file.status === 'done') {
            // Met à jour l'URL de la photo dans le formulaire
            this.form.patchValue({ photo: info.file.response.url });
        }
    }
}
